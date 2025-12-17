import {SearchCenterGroupsProvider} from "../dataProviders/searchCenterGroups";
import {handleError} from "./utils";

// TODO (2025/12/17) add cache support here

export const insertSearchCenterGroup = (req, res) => {
    SearchCenterGroupsProvider.create(req.body)
        .then(()=> res.status(201).json({ok: true}))
        .catch((err) => handleError(res, err));
}

export const updateSearchCenterGroup = (req, res) => {
    SearchCenterGroupsProvider.update(req.body)
        .then(()=> res.status(200).json({ok: true}))
        .catch((err) => handleError(res, err));
}


export const removeSearchCenterGroup = (req, res) => {
    SearchCenterGroupsProvider.remove(req.body)
        .then(()=> res.status(200).json({ok: true}))
        .catch((err) => handleError(res, err));
}


