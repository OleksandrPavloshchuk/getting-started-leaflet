import * as express from "express";
import * as cors from "cors";
import {retrieveNuiteeHotels} from "./provider/nuitee";
import {retrieveRestelHotels} from "./provider/restel";

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Sort method:
const compareHotels = (hotel1, hotel2) => {
    if (hotel1.country < hotel2.country ) {
        return -1;
    }
    if (hotel1.country > hotel2.country ) {
        return 1;
    }
    if (hotel1.city.toLowerCase() < hotel2.city.toLowerCase() ) {
        return -1;
    }
    if (hotel1.city.toLowerCase() > hotel2.city.toLowerCase() ) {
        return 1;
    }
    if (hotel1.name.toLowerCase() < hotel2.name.toLowerCase() ) {
        return -1;
    }
    if (hotel1.name.toLowerCase() > hotel2.name.toLowerCase() ) {
        return 1;
    }
    return 0;
};

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
    const queryParams = {cityLike, nameLike, country, types};
    Promise.all([
        retrieveNuiteeHotels(queryParams),
        retrieveRestelHotels(queryParams)
    ]).then( ([nuiteeResult, restelResult]) => {
            let rows = [nuiteeResult.rows, restelResult.rows].flat();
            count = rows.length;
            rows = rows.sort( compareHotels);
            return res.json(rows);
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
