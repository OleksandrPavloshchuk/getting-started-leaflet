import {LocationSelector} from "./components/locationSelector/ui/LocationSelector.tsx";
import {type Location} from "./components/locationSelector/model/Location.ts";
import {Notifications} from "@mantine/notifications";

export default function App() {

    const handleSubmit = (loc: Location | undefined) => {
        console.log( loc ? `Selected location: ${JSON.stringify(loc)}` : 'No selection');
    };

    return <>
        <Notifications position="top-right" />
        <h5>getting started leaflet</h5>
        <LocationSelector onSubmit={handleSubmit} />
    </>;
}