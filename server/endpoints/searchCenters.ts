import {getOrCacheWithFullKey} from "../redisConnector";
import {handleError, SEARCH_CENTERS_KEY} from "./utils";
import {SearchCentersProvider} from "../dataProviders/searchCenters";
import {SearchCenter} from "../types/SearchCenter";

export const getSearchCenters = ( res) => {
    getOrCacheWithFullKey<SearchCenter[]>(SEARCH_CENTERS_KEY, SearchCentersProvider.retrieve)
        .then((result) => {
            return res.json(result);
        })
        .catch((err) => handleError(res, err));
}
