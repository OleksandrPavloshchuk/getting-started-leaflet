import {getDatabasePool} from "../DatabasePool";

export class SearchCentersProvider {
    public static retrieve() {
        return getDatabasePool().query(sql.retrieve);
    }

    public static create({country, city, name, latitude, longitude, type}) {
        getDatabasePool().query(sql.create, [country, city, name, latitude, longitude, type]);
    }

    public static remove({country, city, name, type}) {
        getDatabasePool().query(sql.remove, [country, city, name, type]);
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
    `,

    remove: `
        DELETE FROM public.search_center
        WHERE country=$1 AND city=$2 AND name=$3 AND type=$4;
    `
}