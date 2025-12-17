import {create} from "zustand";

interface EditPersonalSearchCenterGroupModel {
    name: string,
    setName: (s: string) => void,
    id: string | undefined,
    setId: (n: string | undefined) => void
}

export const useEditPersonalSearchCenterGroupModel = create<EditPersonalSearchCenterGroupModel>((set) => ({
    name: "",
    setName: (s: string) => set({name: s}),
    id: undefined,
    setId: (s: string | undefined) => set({id: s})
}));