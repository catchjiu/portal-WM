alter table public.families enable row level security;
alter table public.profiles enable row level security;
alter table public.family_members enable row level security;
alter table public.membership_packages enable row level security;
alter table public.profile_package_assignments enable row level security;
alter table public.classes enable row level security;
alter table public.bookings enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.payments enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce((auth.jwt() ->> 'role') = 'admin', false);
$$;

create or replace function public.member_family_ids()
returns setof uuid
language sql
stable
as $$
  select p.family_id
  from public.profiles p
  where p.id = auth.uid();
$$;

create policy "members can read linked families"
on public.families
for select
using (id in (select public.member_family_ids()));

create policy "members can read linked profiles"
on public.profiles
for select
using (family_id in (select public.member_family_ids()));

create policy "members can update own profile"
on public.profiles
for update
using (id = auth.uid())
with check (id = auth.uid());

create policy "members can read family members"
on public.family_members
for select
using (family_id in (select public.member_family_ids()));

create policy "members can read packages"
on public.membership_packages
for select
using (true);

create policy "members can read own package assignments"
on public.profile_package_assignments
for select
using (profile_id in (select p.id from public.profiles p where p.family_id in (select public.member_family_ids())));

create policy "members can read classes"
on public.classes
for select
using (true);

create policy "members can read own bookings"
on public.bookings
for select
using (user_id in (select p.id from public.profiles p where p.family_id in (select public.member_family_ids())));

create policy "members can insert own bookings"
on public.bookings
for insert
with check (user_id in (select p.id from public.profiles p where p.family_id in (select public.member_family_ids())));

create policy "members can update own bookings"
on public.bookings
for update
using (user_id in (select p.id from public.profiles p where p.family_id in (select public.member_family_ids())))
with check (user_id in (select p.id from public.profiles p where p.family_id in (select public.member_family_ids())));

create policy "members can read products"
on public.products
for select
using (true);

create policy "members can read own orders"
on public.orders
for select
using (user_id in (select p.id from public.profiles p where p.family_id in (select public.member_family_ids())));

create policy "members can insert own orders"
on public.orders
for insert
with check (user_id in (select p.id from public.profiles p where p.family_id in (select public.member_family_ids())));

create policy "members can read own payments"
on public.payments
for select
using (user_id in (select p.id from public.profiles p where p.family_id in (select public.member_family_ids())));

create policy "members can insert own payments"
on public.payments
for insert
with check (user_id in (select p.id from public.profiles p where p.family_id in (select public.member_family_ids())));

create policy "admins full access families"
on public.families
for all
using (public.is_admin())
with check (public.is_admin());

create policy "admins full access profiles"
on public.profiles
for all
using (public.is_admin())
with check (public.is_admin());

create policy "admins full access family members"
on public.family_members
for all
using (public.is_admin())
with check (public.is_admin());

create policy "admins full access packages"
on public.membership_packages
for all
using (public.is_admin())
with check (public.is_admin());

create policy "admins full access package assignments"
on public.profile_package_assignments
for all
using (public.is_admin())
with check (public.is_admin());

create policy "admins full access classes"
on public.classes
for all
using (public.is_admin())
with check (public.is_admin());

create policy "admins full access bookings"
on public.bookings
for all
using (public.is_admin())
with check (public.is_admin());

create policy "admins full access products"
on public.products
for all
using (public.is_admin())
with check (public.is_admin());

create policy "admins full access orders"
on public.orders
for all
using (public.is_admin())
with check (public.is_admin());

create policy "admins full access payments"
on public.payments
for all
using (public.is_admin())
with check (public.is_admin());
