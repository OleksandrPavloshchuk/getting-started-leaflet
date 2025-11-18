import {type Location, createLocation} from "../model/Location.ts";

const ENDPOINT_URI = "http://localhost:4000/api/locations";

export const retrieveByText = (
    query: string | undefined,
    countryIsoCode: string | undefined,
    hotelTypesIds: string[],
    radius: number | undefined,
    lat: number | undefined,
    lng: number | undefined,
    setLoading: (loading: boolean) => void,
    setError: (error: string | undefined) => void,
    setResult: (locations: Location[]) => void
) => {

    const normalized = query?.toLowerCase().trim() ?? "";
    if (!normalized) {
        setResult([]);
        return;
    }
    const [city, name] = normalized.split(/,/);
    if (!city || city.trim().length < 2 || !name || name === "") {
        setResult([]);
        return;
    }

    // For request cancellation
    const controller = new AbortController();

    setError(undefined);
    setLoading(true);
    const types = hotelTypesIds.join(",");
    const qParam = encodeURIComponent(query ?? "");
    const cParam = encodeURIComponent(countryIsoCode ?? "");
    const tParam = encodeURIComponent(types);
    const rParam = encodeURIComponent(radius ?? "");
    const latParam = encodeURIComponent(lat ?? "");
    const lngParam = encodeURIComponent(lng ?? "");

    const uri = `${ENDPOINT_URI}?q=${qParam}&c=${cParam}&t=${tParam}&r=${rParam}&lat=${latParam}&lng=${lngParam}`;
    fetch(uri,
        {signal: controller.signal})
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }
            return res.json();
        })
        .then((locationsRaw: Location[]) => {
            setResult(locationsRaw.map((raw) => createLocation(raw)));
        })
        .catch((e: Error) => setError(`Retrieve error: ${e}`))
        .finally(() => setLoading(false));

    // Cancel too fast request
    return () => controller.abort();

}