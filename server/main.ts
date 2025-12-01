import * as express from "express";
import * as cors from "cors";
import {getLocations} from "./endpoints/locations";
import {getSearchCenters} from "./endpoints/searchCenters";
import {insertSearchCenter, removeSearchCenter} from "./endpoints/updateSearchCenters";

const app = express();
const port = 4000;

const registerEndpoint = (method: string, path: string, handler: any) => {
    console.log(`[ENDPOINT] ${method.padEnd(4)} ${path}`);
    return handler;
}

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint: list of locations
app.get("/api/locations", registerEndpoint("GET", "/api/locations", async (req, res) => {
    getLocations(req, res);
}));

// Endpoint: list of search centers
app.get("/api/searchCenters", registerEndpoint("GET", "/api/searchCenters", async (req, res) => {
    getSearchCenters(res);
}));

// Endpoint: create a search center
app.post("/api/searchCenters/create", registerEndpoint("POST", "/api/searchCenters/create", async (req, res) => {
    insertSearchCenter(req, res);
}));

// Endpoint: remove a search center
app.post("/api/searchCenters/remove", registerEndpoint("POST", "/api/searchCenters/remove", async (req, res) => {
    removeSearchCenter(req, res);
}));

app.listen(port, () => {
    console.log(`✅ API server running at http://localhost:${port}`);
});
