import {create} from "zustand";
import type {Country} from "../static/countries.ts";
import type {SearchCenterGroup} from "./SearchCenterGroup.ts";

interface CreatePersonalSearchCenterModel {
    country: Country | undefined,
    setCountry: (c: Country | undefined) => void,
    city: string,
    setCity: (s: string) => void,
    name: string,
    setName: (s: string) => void,
    group: SearchCenterGroup|undefined,
    setGroup: (s: SearchCenterGroup|undefined) => void
}

export const useCreatePersonalSearchCenterModel = create<CreatePersonalSearchCenterModel>((set) => ({
    country: undefined,
    setCountry: (c: Country | undefined) => set({country: c}),
    city: "",
    setCity: (s: string) => set({city: s}),
    name: "",
    setName: (s: string) => set({name: s}),
    group: undefined,
    setGroup: (s: SearchCenterGroup|undefined)=> set({group: s})
}));