/**
 * Retrieve search centers
 */
import {create} from "zustand";
import {createSearchCenterFromRaw, type SearchCenter} from "../model/SearchCenter.ts";

export namespace retrieveSearchCenters {

    const ENDPOINT_URI = "http://localhost:4000/api/searchCenters";

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

            fetch(ENDPOINT_URI,
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