-- شغّل الكود ده مرة واحدة في Supabase SQL Editor عشان تجهز قاعدة البيانات

create table if not exists kv_store (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

alter table kv_store enable row level security;

-- سياسة بسيطة تسمح لأي حد معاه الـ anon key (يعني تطبيقك) يقرأ ويكتب
-- الجدول ده. ده مناسب لأداة داخلية للفريق، مش لتطبيق فيه بيانات حساسة
-- لعملاء خارجيين.
create policy "allow read/write for anon"
  on kv_store
  for all
  to anon
  using (true)
  with check (true);
