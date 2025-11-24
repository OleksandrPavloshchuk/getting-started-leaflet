import {create} from "zustand";
import {type Location} from "./Location.ts";

interface WidgenStateModel {
    error: string | undefined,
    setError: (e: string | undefined) => void,
    loading: boolean,
    setLoading: (l: boolean) => void,
    extraFilterDialogOpened: boolean,
    setExtraFilterDialogOpened: (b: boolean) => void,
    selectedLocation: Location | undefined,
    setSelectedLocation: (loc: Location | undefined) => void,
}

export const useWidgetStateModel = create<WidgenStateModel>((set) => ({
    error: undefined,
    setError: (e: string | undefined) => set({error: e}),
    loading: false,
    setLoading: (l: boolean) => set({loading: l}),
    selectedLocation: undefined,
    setSelectedLocation: (loc: Location | undefined) => set({selectedLocation: loc}),
    extraFilterDialogOpened: false,
    setExtraFilterDialogOpened: (b: boolean) => set({extraFilterDialogOpened: b})
}));