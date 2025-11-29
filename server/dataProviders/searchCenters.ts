import {getDatabasePool} from "../DatabasePool";

export class SearchCentersProvider {
    public static retrieve() {
        return getDatabasePool().query(SQL);
    }
}

const SQL = `
    SELECT
        country, city, name, latitude, longitude, type
    FROM
        search_center
    ORDER BY
        type, city, name, country
    `;

