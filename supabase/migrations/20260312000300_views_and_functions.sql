create or replace view public.family_dashboard as
select
  f.id as family_id,
  f.display_name as family_name,
  count(p.id)::int as profile_count
from public.families f
left join public.profiles p on p.family_id = f.id
group by f.id, f.display_name;

create or replace view public.admin_financial_summary as
select
  count(*) filter (where status = 'Pending')::int as pending_payments,
  coalesce(sum(amount) filter (where status = 'Approved'), 0)::int as approved_revenue_twd
from public.payments;

create or replace function public.booking_eligibility(
  target_profile_id uuid,
  target_class_id uuid
)
returns table (
  allowed boolean,
  reasons text[]
)
language plpgsql
stable
as $$
declare
  profile_record public.profiles%rowtype;
  class_record public.classes%rowtype;
  package_record public.membership_packages%rowtype;
  reason_list text[] := array[]::text[];
begin
  select * into profile_record from public.profiles where id = target_profile_id;
  select * into class_record from public.classes where id = target_class_id;
  select mp.*
  into package_record
  from public.profile_package_assignments ppa
  join public.membership_packages mp on mp.id = ppa.package_id
  where ppa.profile_id = target_profile_id
    and ppa.is_active = true
  order by ppa.starts_on desc
  limit 1;

  if profile_record.membership_status <> 'Active' then
    reason_list := array_append(reason_list, 'Membership is not active.');
  end if;

  if profile_record.remaining_classes <= 0 then
    reason_list := array_append(reason_list, 'No remaining classes available.');
  end if;

  if package_record.access_window = 'Weekday' and extract(isodow from class_record.start_time) in (6, 7) then
    reason_list := array_append(reason_list, 'Current package does not allow weekend bookings.');
  end if;

  if package_record.access_window = 'Weekend' and extract(isodow from class_record.start_time) between 1 and 5 then
    reason_list := array_append(reason_list, 'Current package only allows weekend bookings.');
  end if;

  if package_record.allowed_age_group <> 'Any' and package_record.allowed_age_group <> class_record.age_group then
    reason_list := array_append(reason_list, 'Class age group is not included in this package.');
  end if;

  return query select array_length(reason_list, 1) is null, coalesce(reason_list, array[]::text[]);
end;
$$;

create or replace function public.process_kiosk_scan(
  target_profile_id uuid
)
returns table (
  success boolean,
  checked_in_bookings integer
)
language plpgsql
security definer
as $$
declare
  affected_count integer := 0;
begin
  update public.bookings b
  set status = 'Checked-in'
  from public.classes c
  where b.class_id = c.id
    and b.user_id = target_profile_id
    and b.status = 'Booked'
    and c.start_time::date = timezone('Asia/Taipei', now())::date;

  get diagnostics affected_count = row_count;

  return query select true, affected_count;
end;
$$;
