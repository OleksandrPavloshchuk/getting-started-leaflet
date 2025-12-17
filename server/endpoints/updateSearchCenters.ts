import {evictWithFullKey} from "../redisConnector";
import {handleError, SEARCH_CENTERS_KEY} from "./utils";
import {SearchCentersProvider} from "../dataProviders/searchCenters";

export const insertSearchCenter = (req, res) => {
    evictWithFullKey(SEARCH_CENTERS_KEY)
        .then(() => SearchCentersProvider.create(req.body))
        .then(() => res.status(201).json({ok: true}))
        .catch((err) => handleError(res, err));
}

export const removeSearchCenter = (req, res) => {
    evictWithFullKey(SEARCH_CENTERS_KEY)
        .then(() => SearchCentersProvider.remove(req.body))
        .then( () => res.status(200).json({ok: true}))
        .catch((err) => handleError(res, err));
}


