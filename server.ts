import * as express from "express";
import * as cors from "cors";
import {Pool} from "pg";

const app = express();
const port = 4000;

// PostgreSQL connection
const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "nb",
    password: "nbpass",
    database: "nb",
});

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
     ext -> 'details' ->> 'hotel_important_information' importantInfo
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

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint:
app.get("/api/locations", async (req, res) => {
    const q = (req.query.q as string)?.trim() ?? "";
    const country = (req.query.c as string)?.trim() ?? "";
    const typesStr = (req.query.t as string)?.trim() ?? "";
    let types = typesStr.split(/,/);
    types = types[0] === '' ? [] : types;

    if (!q) {
        return res.json([]);
    }

    let [cityLike, nameLike] = q.split(/,/);
    cityLike = cityLike ? cityLike.replace("_", " ") : "";
    nameLike = nameLike ? nameLike.replace("_", " ") : "";

    let count = -1;

    const start = performance.now();
    pool.query(SQL,  [cityLike, nameLike, country, types])
        .then( (result) => {
            count = result.rows.length;
            return res.json(result.rows);
        })
        .catch((err) => {
            console.error("Database error:", err);
            res.status(500).json({error: "Database query failed"});
        })
        .finally(()=> {
            const timeStr =((performance.now() - start).toFixed(3)).toString();
            console.log(`Executed in ${timeStr.padStart(12)} ms, Rows: ${count.toString().padStart(6)}`);
        })
});

app.listen(port, () => {
    console.log(`✅ API server running at http://localhost:${port}`);
});
