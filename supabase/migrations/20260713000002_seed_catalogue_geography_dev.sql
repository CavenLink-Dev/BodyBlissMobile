-- Seed the service catalogue, indicative pricing and Adelaide service area.
-- Prices are INDICATIVE development values (clearly labelled as such in the UI)
-- until the owner sets final pricing. Idempotent: safe to re-run.

insert into public.services (code, name, description, active, sort_order) values
  ('relaxation', 'Relaxation Massage', 'Gentle, flowing massage to calm the nervous system and unwind.', true, 1),
  ('deep_tissue', 'Deep Tissue Massage', 'Firmer, focused pressure for deeper muscle tension and knots.', true, 2),
  ('pregnancy', 'Pregnancy Massage', 'Adapted for each trimester, with suitably experienced therapists.', true, 3),
  ('couples', 'Couples Massage', 'Two therapists, side by side, in the comfort of your own space.', true, 4),
  ('hotel', 'Hotel Massage', 'In-room massage for hotel guests staying in Adelaide.', true, 5),
  ('corporate', 'Corporate Chair Massage', 'Seated, fully-clothed massage for workplaces and events.', true, 6)
on conflict (code) do update
  set name = excluded.name,
      description = excluded.description,
      active = excluded.active,
      sort_order = excluded.sort_order;

insert into public.service_variants (service_id, duration_minutes, active)
select s.id, v.duration, true
from (values
  ('relaxation', 60), ('relaxation', 90), ('relaxation', 120),
  ('deep_tissue', 60), ('deep_tissue', 90),
  ('pregnancy', 60), ('pregnancy', 90),
  ('couples', 60), ('couples', 90),
  ('hotel', 60), ('hotel', 90),
  ('corporate', 30), ('corporate', 60)
) as v(code, duration)
join public.services s on s.code = v.code
on conflict (service_id, duration_minutes) do update set active = excluded.active;

insert into public.base_prices (service_variant_id, price_cents, currency, effective_from)
select sv.id, p.price_cents, 'AUD', current_date
from (values
  ('relaxation', 60, 11900), ('relaxation', 90, 16900), ('relaxation', 120, 21900),
  ('deep_tissue', 60, 12900), ('deep_tissue', 90, 17900),
  ('pregnancy', 60, 12900), ('pregnancy', 90, 17900),
  ('couples', 60, 23800), ('couples', 90, 33800),
  ('hotel', 60, 11900), ('hotel', 90, 16900),
  ('corporate', 30, 5900), ('corporate', 60, 11500)
) as p(code, duration, price_cents)
join public.services s on s.code = p.code
join public.service_variants sv on sv.service_id = s.id and sv.duration_minutes = p.duration
where not exists (
  select 1 from public.base_prices bp where bp.service_variant_id = sv.id
);

insert into public.service_location_types (service_id, location_type)
select s.id, lt.loc::public.location_type
from (values
  ('relaxation', 'home'), ('relaxation', 'hotel'),
  ('deep_tissue', 'home'), ('deep_tissue', 'hotel'),
  ('pregnancy', 'home'), ('pregnancy', 'hotel'),
  ('couples', 'home'), ('couples', 'hotel'),
  ('hotel', 'hotel'),
  ('corporate', 'workplace')
) as lt(code, loc)
join public.services s on s.code = lt.code
on conflict do nothing;

insert into public.suburbs (name, postcode, active) values
  ('Adelaide', '5000', true),
  ('North Adelaide', '5006', true),
  ('Norwood', '5067', true),
  ('Kensington', '5068', true),
  ('Prospect', '5082', true),
  ('Unley', '5061', true),
  ('Glenelg', '5045', true),
  ('Burnside', '5066', true),
  ('Walkerville', '5081', true),
  ('Henley Beach', '5022', true),
  ('Mile End', '5031', true),
  ('Marion', '5043', true)
on conflict (name, postcode) do update set active = excluded.active;

insert into public.travel_zones (name, notes)
values ('Adelaide Metro', 'Core Adelaide metropolitan service area.')
on conflict (name) do nothing;

insert into public.travel_surcharges (travel_zone_id, surcharge_cents, explanation, effective_from)
select tz.id, 0, 'No travel surcharge within the Adelaide metro service area.', current_date
from public.travel_zones tz
where tz.name = 'Adelaide Metro'
  and not exists (
    select 1 from public.travel_surcharges ts where ts.travel_zone_id = tz.id
  );

insert into public.suburb_zones (suburb_id, travel_zone_id)
select su.id, tz.id
from public.suburbs su
cross join public.travel_zones tz
where tz.name = 'Adelaide Metro'
on conflict do nothing;
