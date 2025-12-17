/**
 * Update search centers groupds: create, update (TODO) or delete (TODO)
 */
import {API} from "./api.ts";
import type {SearchCenterGroup} from "../model/SearchCenterGroup.ts";

export namespace updateSearchCenterGroups {

    export const create = (
        searchCenterGroup: SearchCenterGroup,
        showSuccess: (s: string) => void,
        showError: (s: string) => void
    ) => apply(searchCenterGroup, 'Create', API.searchCenterGroups.create,
            `Search center group "${searchCenterGroup.name}" is created.`,
            showSuccess, showError);

    export const update = (
        searchCenterGroup: SearchCenterGroup,
        showSuccess: (s: string) => void,
        showError: (s: string) => void
    ) =>
        apply(searchCenterGroup, 'Update', API.searchCenterGroups.create,
            `Search center group "${searchCenterGroup.name}" is updated.`,
            showSuccess, showError);

    export const remove = (
        searchCenterGroup: SearchCenterGroup,
        showSuccess: (s: string) => void,
        showError: (s: string) => void
    ) =>
        apply(searchCenterGroup, 'Delete', API.searchCenterGroups.remove,
            `Search center group "${searchCenterGroup.name}" is deleted.`,
            showSuccess, showError);

    const apply = (
        searchCenterGroup: SearchCenterGroup,
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
                body: JSON.stringify(searchCenterGroup)
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