/**
 * Update search centers: create or delete
 */
import {type SearchCenter} from "../model/SearchCenter.ts";
import {API} from "./api.ts";

export namespace updateSearchCenters {

    export const create = (searchCenter: SearchCenter) =>
        apply(searchCenter, 'Create', API.searchCenters.create);

    export const remove = (searchCenter: SearchCenter) =>
        apply(searchCenter, 'Delete', API.searchCenters.remove);

    const apply = (searchCenter: SearchCenter, operation: string, uri: string,) => {
        // For request cancellation
        const controller = new AbortController();

        fetch(uri,
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
            .catch((e: Error) => console.log(`${operation} error: ${e}`));

        // Cancel too fast request
        return () => controller.abort();

    };


}