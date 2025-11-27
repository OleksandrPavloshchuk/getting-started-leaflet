drop table if exists public.search_center;

create table public.search_center
(
    city        varchar(128) not null,
    name        varchar(255) not null,
    latitude    double precision,
    longitude   double precision,
    type        varchar(32) not null
);

