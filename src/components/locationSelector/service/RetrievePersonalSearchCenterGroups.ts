/**
 * Retrieve search center groups
 */
import {create} from "zustand";
import {API} from "./api.ts";
import {createSearchCenterGroupFromRaw, type SearchCenterGroup} from "../model/SearchCenterGroup.ts";

export namespace retrievePersonalSearchCenterGroups {

    interface Model {
        result: SearchCenterGroup[],
        call: () => void
    }

    export const useModel = create<Model>((set) => ({
        result: [],
        /**
         * Load search centers
         *
         * @param setLoading
         * @param setError
         */
        call: () => {

            // For request cancellation
            const controller = new AbortController();

            fetch( API.searchCenterGroups.retrieve,
                {signal: controller.signal})
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP ${res.status}`);
                    }
                    return res.json();
                })
                .then((searchCentersRaw: SearchCenterGroup[]) => {
                    set({result: searchCentersRaw.map((raw) => createSearchCenterGroupFromRaw(raw))});
                })
                .catch((e: Error) => console.log(`Retrieve error: ${e}`));

            // Cancel too fast request
            return () => controller.abort();

        }
    }))

}