import {create} from "zustand";
import {type Location} from "./Location.ts";
import {retrieveByText} from "../service/retrieveByText.ts";

interface LocationState {
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
    searchByText: (setLoading: (l: boolean) => void, setError: (e: string | null) => void) => void
}

export const useLocationStore = create<LocationState>((set, get) => ({
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

    searchByText: (setLoading: (l: boolean) => void, setError: (e: string | null) => void) => retrieveByText(
        get().searchText,
        get().countryIsoCode,
        get().hotelTypeIds,
        setLoading,
        setError,
        (res: Location[]) => set({result: res})
    )
}));