/**
 * Retrieve search centers
 */
import {create} from "zustand";
import {createSearchCenterFromRaw, type SearchCenter} from "../model/SearchCenter.ts";
import {API} from "./api.ts";

export namespace retrieveSearchCenters {

    interface Model {
        result: SearchCenter[],
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

            fetch( API.searchCenters.retrieve,
                {signal: controller.signal})
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP ${res.status}`);
                    }
                    return res.json();
                })
                .then((searchCentersRaw: SearchCenter[]) => {
                    set({result: searchCentersRaw.map((raw) => createSearchCenterFromRaw(raw))});
                })
                .catch((e: Error) => console.log(`Retrieve error: ${e}`));

            // Cancel too fast request
            return () => controller.abort();

        }
    }))

}