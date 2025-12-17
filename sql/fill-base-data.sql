delete from public.search_center;
delete from search_center_group;

insert into public.search_center_group(is_public, name, description)
    overriding system value
values (true, 'Common', 'for everyone');


insert into public.search_center(country, city, name, latitude, longitude, group_id)
select
    'FR', 'Paris', 'Eiffel Tower', 48.8584, 2.2945, id
from
    search_center_group
where
    is_public;

insert into public.search_center(country, city, name, latitude, longitude, group_id)
select
    'FR', 'Paris', 'Louvre', 48.8606, 2.3376, id
from
    search_center_group
where
    is_public;

insert into public.search_center(country, city, name, latitude, longitude, group_id)
select
    'FR', 'Paris', 'Notr Dame de Paris', 48.8529, 2.3500, id
from
    search_center_group
where
    is_public;

insert into public.search_center(country, city, name, latitude, longitude, group_id)
select
    'GB', 'London', 'Big Ben', 51.5007, -0.1246, id
from
    search_center_group
where
    is_public;

insert into public.search_center(country, city, name, latitude, longitude, group_id)
select
    'GB','London', 'Tower Bridge', 51.5055, -0.0754, id
from
    search_center_group
where
    is_public;

insert into public.search_center(country, city, name, latitude, longitude, group_id)
select
    'GB','London', 'Buckingham Palace', 51.5014, -0.1419, id
from
    search_center_group
where
    is_public;

insert into public.search_center(country, city, name, latitude, longitude, group_id)
select
    'US','New York', 'Times Square', 40.7580, -73.9855, id
from
    search_center_group
where
    is_public;

insert into public.search_center(country, city, name, latitude, longitude, group_id)
select
    'US','New York', 'Central Park', 40.7829, -73.9654, id
from
    search_center_group
where
    is_public;

insert into public.search_center(country, city, name, latitude, longitude, group_id)
select
    'US','New York', 'Statue of Liberty', 40.6892, -74.0445, id
from
    search_center_group
where
    is_public;

insert into public.search_center(country, city, name, latitude, longitude, group_id)
select
    'JP', 'Tokyo', 'Tokio Tower', 35.6586, 139.7454, id
from
    search_center_group
where
    is_public;

insert into public.search_center(country, city, name, latitude, longitude, group_id)
select
    'JP', 'Tokyo', 'Shibuya Crossing', 35.6595, 139.7005, id
from
    search_center_group
where
    is_public;

insert into public.search_center(country, city, name, latitude, longitude, group_id)
select
    'JP', 'Tokyo', 'Imperator Palace', 35.6852, 139.7528, id
from
    search_center_group
where
    is_public;

insert into public.search_center(country, city, name, latitude, longitude, group_id)
select
    'IT', 'Rome', 'Colosseum', 41.8902, 12.4922, id
from
    search_center_group
where
    is_public;

insert into public.search_center(country, city, name, latitude, longitude, group_id)
select
    'IT', 'Rome', 'Panteon', 41.8986, 12.4769, id
from
    search_center_group
where
    is_public;

insert into public.search_center(country, city, name, latitude, longitude, group_id)
select
    'IT', 'Rome', 'Fontain of Trevis', 41.9009, 12.4833, id
from
    search_center_group
where
    is_public;

commit;