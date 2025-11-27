import {getOrCache} from "../redisConnector";
import {handleError} from "./utils";
import {SearchCentersProvider} from "../dataProviders/searchCenters";

export const getSearchCenters = ( res) => {
    getOrCache('searchCenter', '', SearchCentersProvider.retrieve)
        .then((result) => {
            return res.json(result.rows);
        })
        .catch((err) => handleError(res, err));
}
