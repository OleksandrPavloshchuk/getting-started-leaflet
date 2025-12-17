import {getDatabasePool} from "../DatabasePool";

export class NuiteeProvider {
    public static async retrieve({cityLike, nameLike, country, radius, lat, lng, types}) : Promise<Location[]> {
        return await getDatabasePool()
            .query(SQL, [cityLike, nameLike, country, radius, lat, lng, types])
            .rows??[];
    }
}

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
     ($4=0 OR earth_distance(ll_to_earth($5, $6),ll_to_earth(latitude, longitude)) <= $4)
     AND
     (COALESCE(array_length($7::text[], 1), 0) = 0 OR (ext -> 'hotel' ->> 'hotel_type_id') = ANY($7))
    `;

