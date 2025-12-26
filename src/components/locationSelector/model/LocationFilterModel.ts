/**
 * LocationRow filter parameters and base methods
 */
import type {Country} from "../static/countries.ts";
import {retrieveLocations} from "../service/RetrieveLocations.ts";
import {create} from "zustand";

interface LocationFilterModel {
    cityAndName: string,
    setCityAndName: (s: string) => void,
    country: Country | undefined,
    setCountry: (c: Country | undefined) => void,
    locationTypeIds: string[],
    setLocationTypeIds: (t: string[]) => void,
    radius: number | undefined;
    setRadius: (r: number | undefined) => void,
    center: L.LatLng | undefined,
    setCenter: (l: L.LatLng | undefined) => void,
    centerName: string | undefined,
    setCenterName: (s: string|undefined) => void,
    getFilters: () => retrieveLocations.Filters,
    clearFilters: () => void
}

export const useLocationFilterModel = create<LocationFilterModel>((set, get) => ({
    cityAndName: "",
    setCityAndName: (s: string) => set({cityAndName: s}),
    country: undefined,
    setCountry: (c: Country | undefined) => set({country: c}),
    locationTypeIds: [],
    setLocationTypeIds: (t: string[]) => set({locationTypeIds: t}),
    radius: undefined,
    setRadius: (r: number | undefined) => set({radius: r}),
    center: undefined,
    setCenter: (c: L.LatLng | undefined) => set({center: c}),
    centerName: undefined,
    setCenterName: (s:string|undefined)=> set({centerName: s}),
    getFilters: () => {
        return {
            cityAndName: get().cityAndName,
            country: get().country,
            locationTypeIds: get().locationTypeIds,
            center: get().center,
            radius: get().radius
        }
    },
    clearFilters: () => {
        set({
            cityAndName: "",
            center: undefined,
            radius: undefined,
            country: undefined,
            locationTypeIds: []
        });
    }
}));