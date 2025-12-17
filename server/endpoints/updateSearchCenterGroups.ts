import {SearchCenterGroupsProvider} from "../dataProviders/searchCenterGroups";

// TODO (2025/12/17) add cache support here

export const insertSearchCenterGroup = (req, res) => {
    SearchCenterGroupsProvider.create(req.body);
    res.status(201).json({ok: true});
}

export const updateSearchCenterGroup = (req, res) => {
    SearchCenterGroupsProvider.update(req.body);
    res.status(200).json({ok: true});
}


export const removeSearchCenterGroup = (req, res) => {
    SearchCenterGroupsProvider.remove(req.body);
    res.status(200).json({ok: true});
}


