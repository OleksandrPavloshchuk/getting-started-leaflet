delete from public.search_center;
delete from search_center_group;

insert into public.search_center_group(id, is_public, name, description)
    overriding system value
values (1, true, 'Common', 'for everyone');


insert into public.search_center(country, city, name, latitude, longitude, group_id)
values ( 'FR', 'Paris', 'Eiffel Tower', 48.8584, 2.2945, 1);

insert into public.search_center(country, city, name, latitude, longitude, group_id)
values ( 'FR', 'Paris', 'Louvre', 48.8606, 2.3376, 1);

insert into public.search_center(country, city, name, latitude, longitude, group_id)
values ( 'FR', 'Paris', 'Notr Dame de Paris', 48.8529, 2.3500, 1);

insert into public.search_center(country, city, name, latitude, longitude, group_id)
values ( 'GB', 'London', 'Big Ben', 51.5007, -0.1246, 1);

insert into public.search_center(country, city, name, latitude, longitude, group_id)
values ( 'GB','London', 'Tower Bridge', 51.5055, -0.0754, 1);

insert into public.search_center(country, city, name, latitude, longitude, group_id)
values ( 'GB','London', 'Buckingham Palace', 51.5014, -0.1419, 1);

insert into public.search_center(country, city, name, latitude, longitude, group_id)
values ( 'US','New York', 'Times Square', 40.7580, -73.9855, 1);

insert into public.search_center(country, city, name, latitude, longitude, group_id)
values ( 'US','New York', 'Central Park', 40.7829, -73.9654, 1);

insert into public.search_center(country, city, name, latitude, longitude, group_id)
values ( 'US','New York', 'Statue of Liberty', 40.6892, -74.0445, 1);

insert into public.search_center(country, city, name, latitude, longitude, group_id)
values (  'JP', 'Tokyo', 'Tokio Tower', 35.6586, 139.7454, 1);

insert into public.search_center(country, city, name, latitude, longitude, group_id)
values ( 'JP', 'Tokyo', 'Shibuya Crossing', 35.6595, 139.7005, 1);

insert into public.search_center(country, city, name, latitude, longitude, group_id)
values ( 'JP', 'Tokyo', 'Imperator Palace', 35.6852, 139.7528, 1);

insert into public.search_center(country, city, name, latitude, longitude, group_id)
values ( 'IT', 'Rome', 'Colosseum', 41.8902, 12.4922, 1);

insert into public.search_center(country, city, name, latitude, longitude, group_id)
values ( 'IT', 'Rome', 'Panteon', 41.8986, 12.4769, 1);

insert into public.search_center(country, city, name, latitude, longitude, group_id)
values ( 'IT', 'Rome', 'Fontain of Trevis', 41.9009, 12.4833, 1);

commit;