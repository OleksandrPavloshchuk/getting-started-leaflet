drop table if exists public.search_center;

create table public.search_center
(
    country     varchar(4) not null,
    city        varchar(128) not null,
    name        varchar(255) not null,
    latitude    double precision,
    longitude   double precision,
    type        varchar(32) not null
);

create index idx_search_center on public.search_center(country, city, name, type);