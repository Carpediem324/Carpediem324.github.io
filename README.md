# Carpediem324.github.io
Carpediem324's Pages

## Supabase 설정 (프로젝트 관리)
`projects.html`의 프로젝트 추가/삭제는 Supabase DB를 사용합니다.

1. `assets/js/config.js`에서 `SUPABASE_URL`, `SUPABASE_ANON_KEY`를 입력
2. Supabase SQL Editor에서 아래 실행

```sql
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  description text not null,
  image1 text,
  image2 text,
  image3 text,
  image4 text
);

alter table public.projects enable row level security;

create policy "Allow read" on public.projects for select using (true);
create policy "Allow insert" on public.projects for insert with check (true);
create policy "Allow delete" on public.projects for delete using (true);
```
