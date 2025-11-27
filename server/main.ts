import * as express from "express";
import * as cors from "cors";
import {getLocations} from "./endpoints/locations";
import {getSearchCenters} from "./endpoints/searchCenters";

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint: list of locations
app.get("/api/locations", async (req, res) => {
    getLocations(req, res);
});

// Endpoint: list of search centers
app.get("/api/searchCenters", async (req, res) => {
    getSearchCenters(res);
});

app.listen(port, () => {
    console.log(`✅ API server running at http://localhost:${port}`);
});
