import {createBrowserRouter} from "react-router-dom";
import {ApplicationLayout} from "./ApplicationLayout.tsx";
import {SelectLocationPage} from "./pages/SelectLocationPage.tsx";
import {PersonalSearchCenterGroupsPage} from "./pages/PersonalSearchCenterGroupsPage.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ApplicationLayout/>,
        children: [
            {index: true, element: <SelectLocationPage/>},
            {path: "/select-location", element: <SelectLocationPage/>},
            {path: "/personal-search-center-groups", element: <PersonalSearchCenterGroupsPage/>}
        ]
    }
]);