# Creating the simplest test application for Leaflet

## Purpose
To understand, how does Leaflet widget works.

## Requirements
Use Node version ^22.12. Install command:
```shell

nvm install 22.12.0 
```

## Steps
Create frontend project template using Reat + Vite: 
```shell

npm create vite@latest getting-started-google-maps -- --template react-ts
```

Run frontend application:
```shell

npm run dev
```

Run backend application:
```shell

npx ts-node server/endpoint.ts
```

## Additional indexes on table NUITEE_HOTEL

```sql
grant create on database nb to nb;
CREATE EXTENSION IF NOT EXISTS pg_trgm with schema public;
       
create index idx_nuitee_hotel_city
    on public.nuitee_hotel (((ext -> 'hotel'::text) ->> 'city'::text));
create index idx_nuitee_hotel_city_trgm
    on public.nuitee_hotel using gin (((ext -> 'hotel'::text) ->> 'city'::text) gin_trgm_ops);
create index idx_nuitee_hotel_name_trgm
    on public.nuitee_hotel using gin (name gin_trgm_ops);
```