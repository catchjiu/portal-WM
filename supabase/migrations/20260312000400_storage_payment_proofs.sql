insert into storage.buckets (id, name, public)
values ('payment-proofs', 'payment-proofs', false)
on conflict (id) do nothing;

drop policy if exists "members upload own payment proofs" on storage.objects;
drop policy if exists "members read own payment proofs" on storage.objects;
drop policy if exists "members update own payment proofs" on storage.objects;
drop policy if exists "members delete own payment proofs" on storage.objects;
drop policy if exists "admins read all payment proofs" on storage.objects;
drop policy if exists "admins update all payment proofs" on storage.objects;
drop policy if exists "admins delete all payment proofs" on storage.objects;

create policy "members upload own payment proofs"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'payment-proofs'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "members read own payment proofs"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'payment-proofs'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "members update own payment proofs"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'payment-proofs'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'payment-proofs'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "members delete own payment proofs"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'payment-proofs'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "admins read all payment proofs"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'payment-proofs'
  and public.is_admin()
);

create policy "admins update all payment proofs"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'payment-proofs'
  and public.is_admin()
)
with check (
  bucket_id = 'payment-proofs'
  and public.is_admin()
);

create policy "admins delete all payment proofs"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'payment-proofs'
  and public.is_admin()
);
