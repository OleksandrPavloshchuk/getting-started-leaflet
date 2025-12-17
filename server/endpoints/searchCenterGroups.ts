import {SearchCenterGroupsProvider} from "../dataProviders/searchCenterGroups";

// TODO (2026/12/17) add cache here

export const getSearchCenterGroups = (res) => {
    const result = SearchCenterGroupsProvider.retrieve();
    return res.json(result.rows);
}
