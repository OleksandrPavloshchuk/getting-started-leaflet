/**
 * Update search centers: create or delete
 */
import {type SearchCenter} from "../model/SearchCenter.ts";
import {API} from "./api.ts";

export namespace updateSearchCenters {

    export const create = (
        searchCenter: SearchCenter,
        showMessage: (s: string) => void
    ) =>
        apply(searchCenter, 'Create', API.searchCenters.create,
            `Search center "${searchCenter.name}" is created.`,
            showMessage);

    export const remove = (
        searchCenter: SearchCenter,
        showMessage: (s: string) => void
    ) =>
        apply(searchCenter, 'Delete', API.searchCenters.remove,
            `Search center "${searchCenter.name}" is deleted.`,
            showMessage);

    const apply = (
        searchCenter: SearchCenter,
        operation: string,
        uri: string,
        message: string,
        showMessage: (s: string) => void) => {
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
                showMessage(message);
                return res.json();
            })
            .catch((e: Error) => console.log(`${operation} error: ${e}`));

        // Cancel too fast request
        return () => controller.abort();

    };


}