import {Request, Response} from "express";

import {SearchCenterGroupsProvider} from "../dataProviders/searchCenterGroups";
import {handleError} from "./utils";

export const getSearchCenterGroups = (req: Request, res: Response) => {
    SearchCenterGroupsProvider.retrieve()
        .then((result) => res.json(result))
        .catch((err) => handleError(res, err));
}
