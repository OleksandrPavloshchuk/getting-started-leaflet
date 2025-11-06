import type {Location} from "../data/locations.ts";

const ENDPOINT_URI = "http://localhost:4000/api/locations";

export const retrieveLocations = (
    query: string,
    setLoading: (loading: boolean) => void,
    setError: (error: string | null) => void,
    setLocations: (locations: Location[]) => void
) => {
    const normalized = query?.toLowerCase().trim();
    if (!normalized) {
        return [];
    }
    const [city, name] = normalized.split(/,/);
    if (!city || city.trim().length < 2 || !name || name === "") {
        return [];
    }

    const controller = new AbortController(); // для можливості скасувати запит
    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(
                `${ENDPOINT_URI}?q=${encodeURIComponent(query)}`,
                {signal: controller.signal}
            );

            if (!res.ok) {
                throw `HTTP ${res.status}`;
            }

            const data: Location[] = await res.json();
            setLocations(data);
        } catch (e) {
            setError(`Retrieve error: ${e}`);
        } finally {
            setLoading(false);
        }
    };

    fetchData();

    // Скасувати запит, якщо query змінився швидко
    return () => controller.abort();

}