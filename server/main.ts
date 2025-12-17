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

const app = express();
const port = 4000;

const registerEndpoint = (method: "get"|"post"|"put"|"delete", path: string, handler: any) => {
    console.log(`[ENDPOINT] ${method.toUpperCase().padEnd(6)} ${path}`);
    app[method](path, handler);
}

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint: list of locations
registerEndpoint("get", "/api/locations", async (req, res) => {
    getLocations(req, res);
});

// Endpoint: list of search centers
registerEndpoint("get", "/api/searchCenters", async (req, res) => {
    getSearchCenters(res);
});

// Endpoint: create a search center
registerEndpoint("post", "/api/searchCenters/create", async (req, res) => {
    insertSearchCenter(req, res);
});

// Endpoint: remove a search center
registerEndpoint("post", "/api/searchCenters/remove", async (req, res) => {
    removeSearchCenter(req, res);
});

// Endpoint: list of personal search center groups
registerEndpoint("get", "/api/searchCenterGroups", async (req, res) => {
    getSearchCenterGroups(res);
});

// Endpoint: create a personal search center group
registerEndpoint("post", "/api/searchCenterGroups/create", async (req, res) => {
    insertSearchCenterGroup(req, res);
});

// Endpoint: update a personal search center group
registerEndpoint("post", "/api/searchCenterGroups/update", async (req, res) => {
    updateSearchCenterGroup(req, res);
});

// Endpoint: remove a personal search center group
registerEndpoint("post", "/api/searchCenterGroups/remove", async (req, res) => {
    removeSearchCenterGroup(req, res);
});



app.listen(port, () => {
    console.log(`✅ API server running at http://localhost:${port}`);
});
