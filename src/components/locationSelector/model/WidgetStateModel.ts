import {create} from "zustand";
import {type Location} from "./Location.ts";
import type {SearchCenter} from "./SearchCenter.ts";

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
    setSelectRadiusPopupOpened: (b:boolean) => void,
    createPersonalSearchCenterOpened: boolean,
    setCreatePersonalSearchCenterOpened: (b:boolean) => void,
    editPersonalSearchCenterGroupOpened: boolean,
    setEditPersonalSearchCenterGroupOpened: (b:boolean) => void,
    selectedSearchCenterDetails: SearchCenter|undefined,
    setSelectedSearchCenterDetails: (c: SearchCenter|undefined) => void,
    refreshSearchCenterGroupsKey: number,
    setRefreshSearchCenterGroupsKey: (n:number) => void
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
    setSelectRadiusPopupOpened: (b:boolean)=> set({selectRadiusPopupOpened: b}),
    createPersonalSearchCenterOpened: false,
    setCreatePersonalSearchCenterOpened: (b:boolean)=> set({createPersonalSearchCenterOpened: b}),
    editPersonalSearchCenterGroupOpened: false,
    setEditPersonalSearchCenterGroupOpened: (b:boolean) => set({editPersonalSearchCenterGroupOpened: b}),
    selectedSearchCenterDetails: undefined,
    setSelectedSearchCenterDetails: (c: SearchCenter|undefined) => set({selectedSearchCenterDetails: c}),
    refreshSearchCenterGroupsKey: 0,
    setRefreshSearchCenterGroupsKey: (n: number)=> set({refreshSearchCenterGroupsKey: n})
}));