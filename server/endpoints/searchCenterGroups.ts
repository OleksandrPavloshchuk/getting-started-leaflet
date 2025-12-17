import {SearchCenterGroupsProvider} from "../dataProviders/searchCenterGroups";
import {handleError} from "./utils";
import {SearchCenterGroup} from "../types/SearchCenterGroup";

// TODO (2026/12/17) add cache here

export const getSearchCenterGroups = (res) => {
    SearchCenterGroupsProvider.retrieve()
        .then( (result) => {
            return res.json(result);
        })
        .catch((err) => handleError(res, err));
}
