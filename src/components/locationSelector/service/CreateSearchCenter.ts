/**
 * Create a new search center
 */
import {type SearchCenter} from "../model/SearchCenter.ts";

export namespace updateSearchCenters {

    const ENDPOINT_URI = "http://localhost:4000/api/searchCenters/create";

    export const create = (searchCenter: SearchCenter)=> {
        // For request cancellation
        const controller = new AbortController();

        fetch(ENDPOINT_URI,
            {
                signal: controller.signal,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(searchCenter)
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}`);
                }
                return res.json();
            })
            .catch((e: Error) => console.log(`Retrieve error: ${e}`));

        // Cancel too fast request
        return () => controller.abort();

    };


}