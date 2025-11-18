import {create} from "zustand";
import {type Location} from "./Location.ts";
import {retrieveByText} from "../service/retrieveByText.ts";
import type {Country} from "../static/countries.ts";

interface LocationState {
    error: string | undefined,
    setError: (e: string | undefined) => void,
    loading: boolean,
    setLoading: (l: boolean) => void,
    searchText: string | undefined,
    setSearchText: (text: string | undefined) => void,
    selectedLocation: Location | undefined,
    setSelectedLocation: (loc: Location | undefined) => void,
    result: Location[],
    setResult: (res: Location[]) => void,
    country: Country | undefined,
    setCountry: (c: Country | undefined) => void,
    hotelTypeIds: string[],
    setHotelTypeIds: (ids: string[]) => void,
    extraFilterOpened: boolean,
    setExtraFilterOpened: (b: boolean) => void,
    searchRadius: number | undefined;
    setSearchRadius: (r: number | undefined) => void,
    searchCenter: L.LatLng | undefined,
    setSearchCenter: (l: L.LatLng | undefined) => void,
    retrieve: () => void,
    clearFilters: () => void
}

export const useLocationStore = create<LocationState>((set, get) => ({
    error: undefined,
    setError: (e: string | undefined) => set({error: e}),
    loading: false,
    setLoading: (l: boolean) => set({loading: l}),
    searchText: "",
    setSearchText: (text: string | undefined) => set({searchText: text}),
    selectedLocation: undefined,
    setSelectedLocation: (loc: Location | undefined) => set({selectedLocation: loc}),
    result: [],
    setResult: (res: Location[]) => set({result: res}),
    country: undefined,
    setCountry: (c: Country | undefined) => set({country: c}),
    hotelTypeIds: [],
    setHotelTypeIds: (ids: string[]) => set({hotelTypeIds: ids}),
    extraFilterOpened: false,
    setExtraFilterOpened: (b: boolean) => set({extraFilterOpened: b}),
    searchRadius: undefined,
    setSearchRadius: (r: number | undefined) => set({searchRadius: r}),
    searchCenter: undefined,
    setSearchCenter: (l: L.LatLng | undefined) => set({searchCenter: l}),
    retrieve: () => retrieveByText(
        get().searchText,
        get().country?.iso,
        get().hotelTypeIds,
        get().searchRadius,
        get().searchCenter?.lat,
        get().searchCenter?.lng,
        (l: boolean) => set({loading: l}),
        (e: string | undefined) => set({error: e}),
        (res: Location[]) => set({result: res})
    ),
    clearFilters: () => {
        set({
            searchText: "",
            searchCenter: undefined,
            searchRadius: undefined,
            country: undefined,
            hotelTypeIds: []
        });
    }
}));