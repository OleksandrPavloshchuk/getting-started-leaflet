import * as express from "express";
import * as cors from "cors";
import {NuiteeProvider} from "./provider/nuiteeLocations";
import {RestelProvider} from "./provider/restelLocations";
import {getOrCache} from "./redisConnector";

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

const getParamString = (src: any | undefined) => (src as string)?.trim() ?? "";
const getParamNumber = (src: any | undefined) => {
    const s = getParamString(src);
    return s.length > 0 ? Number.parseFloat(s) : 0;
}

const normalize = (s:string)=> s ? s.replace("_", " ") : "";

// Endpoints: list of connections
app.get("/api/locations", async (req, res) => {
    const q = getParamString(req.query.q);
    const country = getParamString(req.query.c);
    const typesStr = getParamString(req.query.t);
    const lng = getParamNumber(req.query.lng);
    const lat = getParamNumber(req.query.lat);
    const radius = getParamNumber(req.query.r);
    let types = typesStr.split(/,/);
    types = types[0] === '' ? [] : types;

    if (!q) {
        return res.json([]);
    }

    let [cityLike, nameLike] = q.split(/,/);
    cityLike = normalize(cityLike);
    nameLike = normalize(nameLike);

    let count = -1;
    const setCount = (n: number) => {
        count = n;
    };

    const queryParams = {cityLike, nameLike, country, radius, lat, lng, types};
    const start = performance.now();
    getOrCache('location', queryParams,
        () => Promise.all([
            NuiteeProvider.retrieve(queryParams),
            RestelProvider.retrieve(queryParams)
        ])
    ).then(([nuiteeResult, restelResult]) => gatherAndReturnResult(res, [nuiteeResult, restelResult], setCount))
        .catch((err) => handleError(res, err))
        .finally(() => finalize(start, count));
});


app.listen(port, () => {
    console.log(`✅ API server running at http://localhost:${port}`);
});
