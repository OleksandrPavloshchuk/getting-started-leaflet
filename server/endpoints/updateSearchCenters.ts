import {Request, Response} from "express";

import {handleError} from "./utils";
import {SearchCentersProvider} from "../dataProviders/searchCenters";

export const insertSearchCenter = (req: Request, res: Response) => {
    SearchCentersProvider.create(req.body)
        .then(() => res.status(201).json({ok: true}))
        .catch((err) => handleError(res, err));
}

export const removeSearchCenter = (req: Request, res: Response) => {
    SearchCentersProvider.remove(req.body)
        .then(() => res.status(200).json({ok: true}))
        .catch((err) => handleError(res, err));
}


