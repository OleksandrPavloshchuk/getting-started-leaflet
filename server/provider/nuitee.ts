import {getDatabasePool} from "../DatabasePool";

export const retrieveNuiteeHotels = ({cityLike, nameLike, country, types}) =>
    getDatabasePool().query(SQL,  [cityLike, nameLike, country, types]);

const SQL = `
    SELECT
     id, name, longitude as lng, latitude as lat, 
     ext -> 'hotel' ->> 'city' city, 
     UPPER(ext -> 'hotel' ->> 'country') country, 
     ext -> 'hotel' ->> 'thumbnail' thumbnail, 
     ext -> 'hotel' ->> 'address' address, 
     ext -> 'hotel' ->> 'hotel_description' description, 
     ext -> 'details' ->> 'hotel_type' type, 
     CAST (ext -> 'hotel' ->> 'stars' as decimal) stars,
     ext -> 'details' ->> 'hotel_important_information' importantinfo,
     'Nuitee' provider
     FROM nuitee_hotel 
     WHERE 
     name ILIKE CONCAT('%',CAST($2 as text),'%') 
     AND 
     ext -> 'hotel' ->> 'city' ILIKE CONCAT('%',CAST($1 as text),'%') 
     AND 
     ($3='' OR UPPER(ext -> 'hotel' ->> 'country') = UPPER($3)) 
     AND
     (COALESCE(array_length($4::text[], 1), 0) = 0 OR (ext -> 'hotel' ->> 'hotel_type_id') = ANY($4))
     ORDER BY country, city, name
    `;

