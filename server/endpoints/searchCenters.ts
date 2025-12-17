import {handleError} from "./utils";
import {SearchCentersProvider} from "../dataProviders/searchCenters";

export const getSearchCenters = (res) => {
    SearchCentersProvider.retrieve()
        .then((result) => {
            return res.json(result);
        })
        .catch((err) => handleError(res, err));
}
