import {getDatabasePool} from "../DatabasePool";

export class SearchCentersProvider {
    public static retrieve() {
        return getDatabasePool().query(sql.retrieve);
    }

    public static create({country, city, name, latitude, longitude, type}) {
        getDatabasePool().query(sql.create, [country, city, name, latitude, longitude, type]);
    }
}

const sql = {
    retrieve: `
        SELECT country,
               city,
               name,
               latitude,
               longitude,
               type
        FROM search_center
        ORDER BY type, city, name, country
    `,
    create: `
        INSERT INTO public.search_center(country, city, name, latitude, longitude, type)
        VALUES ($1, $2, $3, $4, $5, $6);
    `
}