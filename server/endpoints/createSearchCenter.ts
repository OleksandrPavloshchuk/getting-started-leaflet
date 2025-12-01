import {evictWithFullKey} from "../redisConnector";
import {handleError, SEARCH_CENTERS_KEY} from "./utils";
import {SearchCentersProvider} from "../dataProviders/searchCenters";

export const insertSearchCenter = (req, res) => {
    evictWithFullKey(SEARCH_CENTERS_KEY)
        .then(() => {
            SearchCentersProvider.create(req.body);
            res.status(201).json({ok: true});
        })
        .catch((err) => handleError(res, err));
}
