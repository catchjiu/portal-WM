create extension if not exists "pgcrypto";

create table if not exists public.families (
  id uuid primary key default gen_random_uuid(),
  primary_user_id uuid not null,
  display_name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key,
  family_id uuid not null references public.families (id) on delete cascade,
  first_name text not null,
  last_name text not null,
  rank text not null default 'White',
  stripes integer not null default 0 check (stripes between 0 and 4),
  mat_hours numeric(8,2) not null default 0,
  monthly_goal_hours numeric(8,2) not null default 16,
  yearly_goal_hours numeric(8,2) not null default 180,
  membership_status text not null default 'Pending',
  remaining_classes integer not null default 0,
  avatar_url text,
  line_id text unique,
  created_at timestamptz not null default now()
);

create table if not exists public.family_members (
  family_id uuid not null references public.families (id) on delete cascade,
  profile_id uuid not null references public.profiles (id) on delete cascade,
  primary key (family_id, profile_id)
);

create table if not exists public.membership_packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  access_window text not null default 'Any',
  allowed_age_group text not null default 'Any',
  weekly_class_limit integer,
  created_at timestamptz not null default now()
);

create table if not exists public.profile_package_assignments (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  package_id uuid not null references public.membership_packages (id) on delete cascade,
  starts_on date not null,
  ends_on date,
  is_active boolean not null default true
);

create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  instructor_id uuid not null references public.profiles (id),
  instructor_name text not null,
  start_time timestamptz not null,
  duration integer not null default 60,
  age_group text not null default 'Adults',
  is_cancelled boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  class_id uuid not null references public.classes (id) on delete cascade,
  status text not null default 'Booked',
  created_at timestamptz not null default now(),
  unique (user_id, class_id)
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name_en text not null,
  name_zh text not null,
  price_twd integer not null,
  is_preorder boolean not null default false,
  stock_quantity integer not null default 0,
  category text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete restrict,
  quantity integer not null default 1,
  subtotal_twd integer not null,
  is_preorder boolean not null default false,
  status text not null default 'PendingPayment',
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  order_id uuid not null references public.orders (id) on delete cascade,
  amount integer not null,
  status text not null default 'Pending',
  proof_url text,
  created_at timestamptz not null default now()
);
