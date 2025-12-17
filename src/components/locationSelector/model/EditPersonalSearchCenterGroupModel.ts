import {create} from "zustand";

interface EditPersonalSearchCenterGroupModel {
    name: string,
    setName: (s: string) => void,
    id: number | undefined,
    setId: (n:number) => void
}

export const useEditPersonalSearchCenterGroupModel = create<EditPersonalSearchCenterGroupModel>((set) => ({
    name: "",
    setName: (s: string) => set({name: s}),
    id: undefined,
    setId: (n: number)=> set({id: n})
}));