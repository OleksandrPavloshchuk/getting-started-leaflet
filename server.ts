import * as express from "express";
import * as cors from "cors";
import {Pool} from "pg";

const app = express();
const port = 4000;

// Підключення до PostgreSQL
const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "nb",
    password: "nbpass",
    database: "nb",
});

const SQL = "SELECT " +
    " id, name, longitude as lng, latitude as lat, " +
    " ext -> 'hotel' ->> 'city' city, " +
    " UPPER(ext -> 'hotel' ->> 'country') country, " +
    " ext -> 'hotel' ->> 'thumbnail' thumbnail, " +
    " ext -> 'hotel' ->> 'address' address, " +
    " ext -> 'hotel' ->> 'hotel_description' description, " +
    " ext -> 'details' ->> 'hotel_type' type, " +
    " CAST (ext -> 'hotel' ->> 'stars' as decimal) stars " +
    " FROM nuitee_hotel " +
    " WHERE " +
    " name ILIKE CONCAT('%',CAST($2 as text),'%') " +
    " AND " +
    " ext -> 'hotel' ->> 'city' ILIKE CONCAT('%',CAST($1 as text),'%') " +
    " ORDER BY country, city, name";

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint:
app.get("/api/locations", async (req, res) => {
    const q = (req.query.q as string)?.trim() ?? "";

    if (!q) {
        return res.json([]); // мінімум два символи
    }

    let [cityLike, nameLike] = q.split(/,/);
    cityLike = cityLike ? cityLike.replace("_", " ") : "";
    nameLike = nameLike ? nameLike.replace("_", " ") : "";

    let count = -1;

    const start = performance.now();
    pool.query(SQL,  [cityLike, nameLike])
        .then( (result) => {
            count = result.rows.length;
            return res.json(result.rows);
        })
        .catch((err) => {
            console.error("Database error:", err);
            res.status(500).json({error: "Database query failed"});
        })
        .finally(()=> console.log(`Executed in ${performance.now() - start} ms, Rows: ${count}`));
});

app.listen(port, () => {
    console.log(`✅ API server running at http://localhost:${port}`);
});
