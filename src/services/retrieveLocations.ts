import type {Location} from "../data/locations.ts";

const ENDPOINT_URI = "http://localhost:4000/api/locations";

export const retrieveLocations = (
    query: string,
    countryIsoCode: string | undefined,
    hotelTypesIds: string[],
    setLoading: (loading: boolean) => void,
    setError: (error: string | null) => void,
    setLocations: (locations: Location[]) => void
) => {
    const normalized = query?.toLowerCase().trim();
    if (!normalized) {
        setLocations([]);
        return;
    }
    const [city, name] = normalized.split(/,/);
    if (!city || city.trim().length < 2 || !name || name === "") {
        setLocations([]);
        return;
    }

    // For request cancellation
    const controller = new AbortController();

    setError(null);
    setLoading(true);
    const types = hotelTypesIds.join(",");
    const uri = `${ENDPOINT_URI}?q=${encodeURIComponent(query)}&c=${countryIsoCode}&t=${encodeURIComponent(types)}`;
    fetch(uri,
        {signal: controller.signal})
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }
            return res.json();
        })
        .then((locations: Location[]) => setLocations(locations))
        .catch((e: Error) => setError(`Retrieve error: ${e}`))
        .finally(() => setLoading(false));

    // Cancel too fast request
    return () => controller.abort();

}