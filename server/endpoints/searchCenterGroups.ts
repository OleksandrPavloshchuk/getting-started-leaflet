import {SearchCenterGroupsProvider} from "../dataProviders/searchCenterGroups";
import {handleError} from "./utils";

export const getSearchCenterGroups = (res) => {
    SearchCenterGroupsProvider.retrieve()
        .then( (result) => {
            return res.json(result);
        })
        .catch((err) => handleError(res, err));
}
