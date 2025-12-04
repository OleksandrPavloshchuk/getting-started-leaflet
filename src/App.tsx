import {LocationSelector} from "./components/locationSelector/ui/LocationSelector.tsx";
import {type Location} from "./components/locationSelector/model/Location.ts";
import {Notifications} from "@mantine/notifications";
import {ApplicationLayout} from "./ApplicationLayout.tsx";

export default function App() {

    /*
    const handleSubmit = (loc: Location | undefined) => {
        console.log( loc ? `Selected location: ${JSON.stringify(loc)}` : 'No selection');
    };

    return <>
        <Notifications position="top-right" />
        <h5>getting started leaflet</h5>
        <LocationSelector onSubmit={handleSubmit} />
    </>;
     */

    return <>
        <Notifications position="top-right" />
        <ApplicationLayout/>
    </>;
}