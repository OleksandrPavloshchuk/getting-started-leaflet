const BASE = "http://localhost:4000/api/";
const SEARCH_CENTERS_BASE = `${BASE}searchCenters/`;
const LOCATIONS_BASE = `${BASE}locations/`;

export const API = {
    searchCenters: {
        retrieve: SEARCH_CENTERS_BASE,
        create: `${SEARCH_CENTERS_BASE}create`,
        remove: `${SEARCH_CENTERS_BASE}remove`
    },
    locations: {
        retrieve: LOCATIONS_BASE
    }
};