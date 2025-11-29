import {getDatabasePool} from "../DatabasePool";

export class SearchCenterRepository {
    public static create({country, city, name, latitude, longitude, type}) {
        getDatabasePool().query(SQL, [country, city, name, latitude, longitude, type]);
    }
}

const SQL = `
    INSERT INTO public.search_center(country, city, name, latitude, longitude, type)
    VALUES ( $1,$2, $3, $4, $5, $6);
`;