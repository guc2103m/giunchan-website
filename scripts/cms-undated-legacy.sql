-- Permit genuinely undated, explicitly migrated articles only; never fabricate dates.
alter table public.posts drop constraint published_requires_date;
alter table public.posts add constraint published_requires_date check (status<>'published' or published_at is not null or ((published_at is null and slug in ('food-label-guide','gmk-material','what-is-gmk','human-study-and-approval') and details->'migration'->>'source'='static' and details->'migration'->>'slug'=slug and details->'migration'->>'date_unknown'='true')) is true);
alter policy posts_public_read on public.posts using (status='published' and (published_at<=now() or (published_at is null and slug in ('food-label-guide','gmk-material','what-is-gmk','human-study-and-approval') and details->'migration'->>'source'='static' and details->'migration'->>'slug'=slug and details->'migration'->>'date_unknown'='true')));
-- Preserve all existing asset-reference and bucket restrictions; change date visibility only.
do $policy$
declare p record; updated text;
begin
 for p in select schemaname,tablename,policyname,qual from pg_policies where (schemaname='public' and policyname='assets_public_read') or (schemaname='storage' and policyname='content_storage_public_read')
 loop
  updated:=replace(p.qual,'(p.published_at <= now())','(p.published_at <= now() OR (p.published_at is null and p.slug in (''food-label-guide'',''gmk-material'',''what-is-gmk'',''human-study-and-approval'') and p.details->''migration''->>''source''=''static'' and p.details->''migration''->>''slug''=p.slug and p.details->''migration''->>''date_unknown''=''true''))');
  if updated=p.qual then raise exception 'Expected date predicate missing in %',p.policyname; end if;
  execute format('alter policy %I on %I.%I using (%s)',p.policyname,p.schemaname,p.tablename,updated);
 end loop;
end $policy$;

