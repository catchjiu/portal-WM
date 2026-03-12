insert into public.families (id, primary_user_id, display_name)
values ('7aa8f5ec-1f5f-4c3c-b437-650ba4707d0a', '00000000-0000-0000-0000-000000000001', 'Lee Family')
on conflict (id) do nothing;

insert into public.profiles (
  id,
  family_id,
  first_name,
  last_name,
  rank,
  stripes,
  mat_hours,
  monthly_goal_hours,
  yearly_goal_hours,
  membership_status,
  remaining_classes,
  line_id
)
values
  ('00000000-0000-0000-0000-000000000001', '7aa8f5ec-1f5f-4c3c-b437-650ba4707d0a', 'Alex', 'Lee', 'Blue', 3, 142.5, 16, 180, 'Active', 8, 'line-alex-lee'),
  ('00000000-0000-0000-0000-000000000002', '7aa8f5ec-1f5f-4c3c-b437-650ba4707d0a', 'Mei', 'Lee', 'White', 2, 48.75, 12, 120, 'Active', 6, 'line-mei-lee'),
  ('00000000-0000-0000-0000-000000000003', '7aa8f5ec-1f5f-4c3c-b437-650ba4707d0a', 'Marco', 'Silva', 'Black', 2, 980, 0, 0, 'Gratis', 0, null)
on conflict (id) do nothing;

insert into public.family_members (family_id, profile_id)
values
  ('7aa8f5ec-1f5f-4c3c-b437-650ba4707d0a', '00000000-0000-0000-0000-000000000001'),
  ('7aa8f5ec-1f5f-4c3c-b437-650ba4707d0a', '00000000-0000-0000-0000-000000000002')
on conflict do nothing;

insert into public.membership_packages (id, name, access_window, allowed_age_group, weekly_class_limit)
values
  ('11111111-1111-1111-1111-111111111111', 'Unlimited Weekday', 'Weekday', 'Adults', null),
  ('22222222-2222-2222-2222-222222222222', 'Family Weekend', 'Weekend', 'Any', 3)
on conflict (id) do nothing;

insert into public.profile_package_assignments (id, profile_id, package_id, starts_on, is_active)
values
  ('33333333-3333-3333-3333-333333333331', '00000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', current_date - 30, true),
  ('33333333-3333-3333-3333-333333333332', '00000000-0000-0000-0000-000000000002', '22222222-2222-2222-2222-222222222222', current_date - 30, true)
on conflict (id) do nothing;
