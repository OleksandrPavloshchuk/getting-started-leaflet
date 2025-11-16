import {create} from "zustand";
import {type Location} from "./Location.ts";
import {retrieveByText} from "../service/retrieveByText.ts";

interface LocationState {
    error: string | undefined,
    setError: (e:string|undefined) => void,
    loading: boolean,
    setLoading: (l: boolean) => void,
    searchText: string | undefined,
    setSearchText: (text: string | undefined) => void,
    selectedLocation: Location | undefined,
    setSelectedLocation: (loc: Location | undefined) => void,
    result: Location[],
    setResult: (res: Location[]) => void,
    countryIsoCode: string | undefined,
    setCountryIsoCode: (iso: string | undefined) => void,
    hotelTypeIds: string[],
    setHotelTypeIds: (ids: string[]) => void,
    searchByText: () => void
}

export const useLocationStore = create<LocationState>((set, get) => ({
    error: undefined,
    setError: (e: string|undefined)=> set({error: e}),
    loading: false,
    setLoading: (l: boolean) => set({loading: l}),
    searchText: "",
    setSearchText: (text: string | undefined) => set({searchText: text}),
    selectedLocation: undefined,
    setSelectedLocation: (loc: Location | undefined) => set({selectedLocation: loc}),
    result: [],
    setResult: (res: Location[]) => set({result: res}),
    countryIsoCode: undefined,
    setCountryIsoCode: (iso: string | undefined) => set({countryIsoCode: iso}),
    hotelTypeIds: [],
    setHotelTypeIds: (ids: string[]) => set({hotelTypeIds: ids}),

    searchByText: () => retrieveByText(
        get().searchText,
        get().countryIsoCode,
        get().hotelTypeIds,
        (l: boolean) => set({loading: l}),
        (e: string|undefined)=> set({error: e}),
        (res: Location[]) => set({result: res})
    )
}));