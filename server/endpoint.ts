import * as express from "express";
import * as cors from "cors";
import {NuiteeText} from "./provider/text/nuitee";
import {RestelText} from "./provider/text/restel";

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Sort method:
const compareHotels = (hotel1, hotel2) => {
    if (hotel1.country < hotel2.country) {
        return -1;
    }
    if (hotel1.country > hotel2.country) {
        return 1;
    }
    if (hotel1.city.toLowerCase() < hotel2.city.toLowerCase()) {
        return -1;
    }
    if (hotel1.city.toLowerCase() > hotel2.city.toLowerCase()) {
        return 1;
    }
    if (hotel1.name.toLowerCase() < hotel2.name.toLowerCase()) {
        return -1;
    }
    if (hotel1.name.toLowerCase() > hotel2.name.toLowerCase()) {
        return 1;
    }
    return 0;
};

const handleError = (res, err) => {
    console.error("Database error:", err);
    res.status(500).json({error: "Database query failed"});
};

const finalize = (startTs: number, count: number) => {
    const timeStr = ((performance.now() - startTs).toFixed(3)).toString();
    console.log(`Executed in ${timeStr.padStart(12)} ms, Rows: ${count.toString().padStart(6)}`);
};

const gatherAndReturnResult = (
    res,
    [nuiteeResult, restelResult],
    setCount: (n: number) => void) => {
    let rows = [nuiteeResult.rows, restelResult.rows].flat();
    setCount(rows.length);
    rows = rows.sort(compareHotels);
    return res.json(rows);
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
    const setCount = (n: number) => {
        count = n;
    };

    const start = performance.now();
    const queryParams = {cityLike, nameLike, country, types};
    Promise.all([
        NuiteeText.retrieve(queryParams),
        RestelText.retrieve(queryParams)
    ]).then(([nuiteeResult, restelResult]) => gatherAndReturnResult(res, [nuiteeResult, restelResult], setCount))
        .catch((err) => handleError(res, err))
        .finally(() => finalize(start, count));
});


app.listen(port, () => {
    console.log(`✅ API server running at http://localhost:${port}`);
});
