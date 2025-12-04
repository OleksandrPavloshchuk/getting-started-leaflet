import {LocationSelector} from "../components/locationSelector/ui/LocationSelector.tsx";
import {type Location} from "../components/locationSelector/model/Location.ts";

export const SelectLocationPage = () => {

    const handleSubmit = (loc: Location | undefined) => {
        console.log( loc ? `Selected location: ${JSON.stringify(loc)}` : 'No selection');
    };

    return <LocationSelector onSubmit={handleSubmit} />;
}