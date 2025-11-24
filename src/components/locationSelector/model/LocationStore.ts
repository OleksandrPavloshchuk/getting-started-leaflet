import {create} from "zustand";
import {type Location} from "./Location.ts";
import type {Country} from "../static/countries.ts";
import {retrieveLocations} from "../service/RetrieveLocations.ts";

interface LocationState {
    // Widget modes:
    error: string | undefined,
    setError: (e: string | undefined) => void,
    loading: boolean,
    setLoading: (l: boolean) => void,
    extraFilterDialogOpened: boolean,
    setExtraFilterDialogOpened: (b: boolean) => void,
    // Search parameters
    searchText: string | undefined,
    setSearchText: (text: string | undefined) => void,
    country: Country | undefined,
    setCountry: (c: Country | undefined) => void,
    hotelTypeIds: string[],
    setHotelTypeIds: (ids: string[]) => void,
    searchRadius: number | undefined;
    setSearchRadius: (r: number | undefined) => void,
    searchCenter: L.LatLng | undefined,
    setSearchCenter: (l: L.LatLng | undefined) => void,
    // Selected location
    selectedLocation: Location | undefined,
    setSelectedLocation: (loc: Location | undefined) => void,
    // Get filters:
    getFilters: () => retrieveLocations.Filters,
    // Skip all the filters
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
    country: undefined,
    setCountry: (c: Country | undefined) => set({country: c}),
    hotelTypeIds: [],
    setHotelTypeIds: (ids: string[]) => set({hotelTypeIds: ids}),
    extraFilterDialogOpened: false,
    setExtraFilterDialogOpened: (b: boolean) => set({extraFilterDialogOpened: b}),
    searchRadius: undefined,
    setSearchRadius: (r: number | undefined) => set({searchRadius: r}),
    searchCenter: undefined,
    setSearchCenter: (l: L.LatLng | undefined) => set({searchCenter: l}),
    getFilters: () => {
        return {
            cityAndName: get().searchText,
            country: get().country,
            locationTypeIds: get().hotelTypeIds,
            center: get().searchCenter,
            radius: get().searchRadius
        }
    },
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