import {create} from "zustand";
import {type Location} from "./Location.ts";

interface WidgetStateModel {
    error: string | undefined,
    setError: (e: string | undefined) => void,
    loading: boolean,
    setLoading: (l: boolean) => void,
    extraFilterDialogOpened: boolean,
    setExtraFilterDialogOpened: (b: boolean) => void,
    searchCenterDialogOpened: boolean,
    setSearchCenterDialogOpened: (b: boolean) => void,
    selectedLocation: Location | undefined,
    setSelectedLocation: (loc: Location | undefined) => void,
    selectRadiusPopupOpened: boolean,
    setSelectRadiusPopupOpened: (b:boolean) => void
}

export const useWidgetStateModel = create<WidgetStateModel>((set) => ({
    error: undefined,
    setError: (e: string | undefined) => set({error: e}),
    loading: false,
    setLoading: (l: boolean) => set({loading: l}),
    selectedLocation: undefined,
    setSelectedLocation: (loc: Location | undefined) => set({selectedLocation: loc}),
    extraFilterDialogOpened: false,
    setExtraFilterDialogOpened: (b: boolean) => set({extraFilterDialogOpened: b}),
    searchCenterDialogOpened: false,
    setSearchCenterDialogOpened: (b: boolean) => set({searchCenterDialogOpened: b}),
    selectRadiusPopupOpened: false,
    setSelectRadiusPopupOpened: (b:boolean)=> set({selectRadiusPopupOpened: b})
}));