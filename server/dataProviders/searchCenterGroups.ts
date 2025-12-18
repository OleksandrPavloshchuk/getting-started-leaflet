import {getDatabasePool} from "../DatabasePool";

export interface SearchCenterGroup {
    id: string;
    name: string
}

export class SearchCenterGroupsProvider {
    public static retrieve(): Promise<SearchCenterGroup[]> {
        return getDatabasePool().query(sql.retrieve)
            .then( (result) => result.rows);
    }

    public static async create({name, is_public}) {
        return await getDatabasePool().query(sql.create, [name, is_public]);
    }

    public static async update({id, name}) {
        return await getDatabasePool().query(sql.update, [id, name]);
    }

    public static async remove({id}) {
        return await getDatabasePool().query(sql.remove, [id]);
    }
}

const sql = {
    retrieve: `
        SELECT 
            g.id,
            g.name
        FROM
            public.search_center_group g
        WHERE
            NOT is_public 
        ORDER BY 
            g.name;
    `,
    create: `
        INSERT INTO public.search_center_group(name, is_public)
        VALUES ($1, $2);
    `,
    update: `
        UPDATE 
            public.search_center_group
        SET
            name = $2
        WHERE
            id = $1;
    `,
    remove: `
        DELETE FROM 
            public.search_center_group
        WHERE 
            id=$1;
    `
}