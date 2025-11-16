import {LocationSelector} from "./components/locationSelector/ui/LocationSelector.tsx";
import {type Location} from "./components/locationSelector/model/Location.ts";

export default function App() {

    const handleSubmit = (loc: Location | undefined) => {
        console.log( loc ? `Selected location: ${JSON.stringify(loc)}` : 'No selection');
    };

    return <>
        <h5>getting started leaflet</h5>
        <LocationSelector onSubmit={handleSubmit} />
    </>;
}