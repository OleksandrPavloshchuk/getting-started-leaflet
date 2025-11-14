import {getDatabasePool} from "../DatabasePool";

export const retrieveRestelHotels = ({cityLike, nameLike, country}) =>
    getDatabasePool().query(SQL,  [cityLike, nameLike, country]);

const SQL = `
    SELECT
     id, name, longitude as lng, latitude as lat, 
     ext -> 'hotel' ->> 'city' city, 
     country, 
     ext -> 'hotel' ->> 'main_photo' thumbnail, 
     ext -> 'hotel' ->> 'address' address, 
     ext -> 'hotel' ->> 'description' description, 
     null type,
     CAST(ext -> 'hotel' ->> 'category' as integer) stars,
     null importantinfo,
     'Restel' provider
     FROM restel_hotel 
     WHERE 
     name ILIKE CONCAT('%',CAST($2 as text),'%') 
     AND 
     ext -> 'hotel' ->> 'city' ILIKE CONCAT('%',CAST($1 as text),'%') 
     AND 
     ($3='' OR UPPER(country) = UPPER($3))
     ORDER BY country, city, name
    `;

