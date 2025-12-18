import {create} from "zustand";

interface EditPersonalSearchCenterGroupModel {
    name: string,
    setName: (s: string) => void,
    id: string,
    setId: (s: string) => void
}

export const useEditPersonalSearchCenterGroupModel = create<EditPersonalSearchCenterGroupModel>((set) => ({
    name: "",
    setName: (s: string) => set({name: s}),
    id: "",
    setId: (s: string) => set({id: s})
}));