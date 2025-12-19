import {getDatabasePool} from "../DatabasePool";

export interface SearchCenter {
    country: string;
    city: string;
    name: string;
    latitude: number;
    longitude: number;
    group_id: string;
    group_name: string | undefined;
    is_public: boolean
};

export class SearchCentersProvider {
    public static async retrieve(): Promise<SearchCenter[]> {
        return getDatabasePool().query<SearchCenter>(sql.retrieve)
            .then((result) => result.rows);
    }

    public static async create({country, city, name, latitude, longitude, group_id}) {
        return await getDatabasePool().query(sql.create, [country, city, name, latitude, longitude, group_id]);
    }

    public static async remove({country, city, name, group_id}) {
        return await getDatabasePool().query(sql.remove, [country, city, name, group_id]);
    }
}

const sql = {
    retrieve: `
        SELECT c.country   country,
               c.city      city,
               c.name      name,
               c.latitude  latitude,
               c.longitude longitude,
               c.group_id  group_id,
               g.name      group_name,
               g.is_public is_public
        FROM search_center c INNER JOIN search_center_group g
        ON c.group_id=g.id
        ORDER BY g.name, c.city, c.name, c.country
    `,
    create: `
        INSERT INTO public.search_center(country, city, name, latitude, longitude, group_id)
        VALUES ($1, $2, $3, $4, $5, $6);
    `,

    remove: `
        DELETE
        FROM public.search_center
        WHERE country = $1
          AND city = $2
          AND name = $3
          AND group_id = $4;
    `
}