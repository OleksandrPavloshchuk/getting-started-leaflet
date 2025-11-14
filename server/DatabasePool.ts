import {Pool} from "pg";

export const getDatabasePool: Pool = () => new Pool({
    host: "localhost",
    port: 5432,
    user: "nb",
    password: "nbpass",
    database: "nb",
});