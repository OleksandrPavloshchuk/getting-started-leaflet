import {NuiteeProvider} from "../dataProviders/nuiteeLocations";
import {RestelProvider} from "../dataProviders/restelLocations";
import {handleError} from "./utils";
import {LocationRow} from "../dataProviders/LocationRow";

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

const finalize = (startTs: number, count: number) => {
    const timeStr = ((performance.now() - startTs).toFixed(3)).toString();
    console.log(`Select location: executed in ${timeStr.padStart(12)} ms, Rows: ${count.toString().padStart(6)}`);
};

const gatherAndReturnResult = (
    res,
    [nuiteeResult, restelResult]: [LocationRow[], LocationRow[]],
    setCount: (n: number) => void) => {

    let rows = [nuiteeResult, restelResult].flat();
    setCount(rows.length);
    rows = rows.sort(compareHotels);
    return res.json(rows);
};

const getParamString = (src: any | undefined) => (src as string)?.trim() ?? "";
const getParamNumber = (src: any | undefined) => {
    const s = getParamString(src);
    return s.length > 0 ? Number.parseFloat(s) : 0;
}

const normalize = (s: string) => s ? s.replace("_", " ") : "";

export const getLocations = (req, res) => {
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
    Promise.all([
            NuiteeProvider.retrieve(queryParams),
            RestelProvider.retrieve(queryParams)
        ]
    ).then(([nuiteeResult, restelResult]) => gatherAndReturnResult(res, [nuiteeResult, restelResult], setCount))
        .catch((err) => handleError(res, err))
        .finally(() => finalize(start, count));
}
