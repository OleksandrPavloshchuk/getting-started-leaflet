import * as express from "express";
import * as cors from "cors";
import {getLocations} from "./endpoints/locations";
import {getSearchCenters} from "./endpoints/searchCenters";
import {insertSearchCenter, removeSearchCenter} from "./endpoints/updateSearchCenters";
import {getSearchCenterGroups} from "./endpoints/searchCenterGroups";
import {
    insertSearchCenterGroup,
    removeSearchCenterGroup,
    updateSearchCenterGroup
} from "./endpoints/updateSearchCenterGroups";
import {EndpointHandler} from "./endpoints/Handler";

const app = express();
const port = 4000;

const registerEndpoint = (
    method: "get"|"post"|"put"|"delete",
    path: string,
    endpointHandler: EndpointHandler)=>
{
    console.log(`[ENDPOINT] ${method.toUpperCase().padEnd(6)} ${path}`);
    app[method](path, endpointHandler);
}

// Middleware
app.use(cors());
app.use(express.json());

registerEndpoint("get", "/api/locations", getLocations);
registerEndpoint("get", "/api/searchCenters", getSearchCenters);
registerEndpoint("post", "/api/searchCenters/create", insertSearchCenter);
registerEndpoint("post", "/api/searchCenters/remove", removeSearchCenter);
registerEndpoint("get", "/api/searchCenterGroups", getSearchCenterGroups);
registerEndpoint("post", "/api/searchCenterGroups/create", insertSearchCenterGroup);
registerEndpoint("post", "/api/searchCenterGroups/update", updateSearchCenterGroup);
registerEndpoint("post", "/api/searchCenterGroups/remove", removeSearchCenterGroup);

app.listen(port, () => {
    console.log(`✅ API server running at http://localhost:${port}`);
});
