/**
 * Retrieve locations from backend using filter parameters
 */
import type {Country} from "../static/countries.ts";
import {createLocation, type Location} from "../model/Location.ts";

export namespace retrieveLocations {

    const ENDPOINT_URI = "http://localhost:4000/api/locations";

    export type Filters = {
        cityAndName: string | undefined,
        country: Country | undefined,
        locationTypeIds: string[],
        center: L.LatLng | undefined,
        radius: number | undefined
    }

    /**
     * The search string should contain at least 2 letter before comma and at least one letter after comma.
     * If letter after comma is a space, engine is going to select all locations in this city
     * (may consume a lot of time).
     *
     * @param f search filter
     */
    export const areFiltersValid = (f: retrieveLocations.Filters) => {
        const normalized = f.cityAndName?.toLowerCase() ?? "";
        if (!normalized || normalized.trim() === "" || !normalized.includes(",")) {
            return false;
        }
        const [city, name] = normalized.split(/,/);
        return city && city.trim().length >= 2 && name;
    }

    export const createUri = (f: retrieveLocations.Filters) => {
        const qParam = encodeURIComponent(f.cityAndName?.trim() ?? "");
        const cParam = encodeURIComponent(f.country?.iso ?? "");
        const types = f.locationTypeIds.join(",");
        const tParam = encodeURIComponent(types);
        const rParam = encodeURIComponent(f.radius ?? "");
        const latParam = encodeURIComponent(f.center?.lat ?? "");
        const lngParam = encodeURIComponent(f.center?.lng ?? "");

        return `${ENDPOINT_URI}?q=${qParam}&c=${cParam}&t=${tParam}&r=${rParam}&lat=${latParam}&lng=${lngParam}`;
    }

    /**
     * Load locations using filters
     *
     * @param filters
     * @param setLoading
     * @param setError
     * @param setResult
     */
    export const call = (
        filters: retrieveLocations.Filters,
        setLoading: (loading: boolean) => void,
        setError: (error: string | undefined) => void,
        setResult: (locations: Location[]) => void
    ) => {

        if (!retrieveLocations.areFiltersValid(filters)) {
            setResult([]);
            return;
        }

        // For request cancellation
        const controller = new AbortController();

        setError(undefined);
        setLoading(true);
        const uri = retrieveLocations.createUri(filters);
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

}