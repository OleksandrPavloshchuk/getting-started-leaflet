drop table if exists public.search_center;
drop table if exists public.search_center_group;

create table public.search_center_group
(
    id          integer generated always as identity primary key,
    is_public   boolean not null default false,
    name        varchar(64) not null,
    description varchar(256) null
);

create index idx_search_center_group on public.search_center_group(is_public, name);

create table public.search_center
(
    country     varchar(4) not null,
    city        varchar(128) not null,
    name        varchar(255) not null,
    latitude    double precision,
    longitude   double precision,
    group_id    integer not null,
    foreign key (group_id) references public.search_center_group(id)
);

create index idx_search_center on public.search_center(country, city, name, group_id);