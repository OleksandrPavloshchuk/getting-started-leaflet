const BASE = "http://localhost:4000/api/";
const SEARCH_CENTER_GROUPS_BASE = `${BASE}searchCenterGroups/`;
const SEARCH_CENTERS_BASE = `${BASE}searchCenters/`;
const LOCATIONS_BASE = `${BASE}locations/`;

export const API = {
    searchCenters: {
        retrieve: SEARCH_CENTERS_BASE,
        create: `${SEARCH_CENTERS_BASE}create`,
        remove: `${SEARCH_CENTERS_BASE}remove`
    },
    searchCenterGroups: {
        retrieve: SEARCH_CENTER_GROUPS_BASE,
        create: `${SEARCH_CENTER_GROUPS_BASE}create`,
        update: `${SEARCH_CENTER_GROUPS_BASE}update`,
        remove: `${SEARCH_CENTER_GROUPS_BASE}remove`
    },
    locations: {
        retrieve: LOCATIONS_BASE
    }
};