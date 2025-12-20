import {Request, Response} from "express";
import {handleError} from "./utils";
import {SearchCentersProvider} from "../dataProviders/searchCenters";

export const getSearchCenters = (req: Request, res: Response) => {
    SearchCentersProvider.retrieve()
        .then((result) => res.json(result))
        .catch((err) => handleError(res, err));
}
