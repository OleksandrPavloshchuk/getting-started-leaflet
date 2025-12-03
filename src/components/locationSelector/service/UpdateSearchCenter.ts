/**
 * Update search centers: create or delete
 */
import {type SearchCenter} from "../model/SearchCenter.ts";
import {API} from "./api.ts";

export namespace updateSearchCenters {

    export const create = (
        searchCenter: SearchCenter,
        showSuccess: (s: string) => void,
        showError: (s: string) => void
    ) =>
        apply(searchCenter, 'Create', API.searchCenters.create,
            `Search center "${searchCenter.name}" is created.`,
            showSuccess, showError);

    export const remove = (
        searchCenter: SearchCenter,
        showSuccess: (s: string) => void,
        showError: (s: string) => void
    ) =>
        apply(searchCenter, 'Delete', API.searchCenters.remove,
            `Search center "${searchCenter.name}" is deleted.`,
            showSuccess, showError);

    const apply = (
        searchCenter: SearchCenter,
        operation: string,
        uri: string,
        message: string,
        showSuccess: (s: string) => void,
        showError: (s:string) => void) => {
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
                showSuccess(message);
                return res.json();
            })
            .catch((e: Error) => {
                const str = `${operation} error: ${e}`;
                console.log(str);
                showError(str);
            });

        // Cancel too fast request
        return () => controller.abort();

    };


}