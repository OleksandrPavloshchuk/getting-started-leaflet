import {getOrCacheWithFullKey} from "../redisConnector";
import {handleError, SEARCH_CENTERS_KEY} from "./utils";
import {SearchCentersProvider} from "../dataProviders/searchCenters";

export const getSearchCenters = ( res) => {
    getOrCacheWithFullKey(SEARCH_CENTERS_KEY, SearchCentersProvider.retrieve)
        .then((result) => {
            return res.json(result.rows);
        })
        .catch((err) => handleError(res, err));
}
