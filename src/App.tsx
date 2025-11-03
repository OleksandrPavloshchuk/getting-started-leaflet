import {useState} from "react";
import {type Location, sampleLocations} from "./data/locations.ts";
import {LocationsDropdown} from "./components/LocationsDropdown.tsx";
import {MapView} from "./components/MapView.tsx";

export default function App() {
    const [selected, setSelected] = useState<Location | null>(null);

    const handleSubmit = () => {
        if (!selected) {
            console.log("No location selected");
            return;
        }
        console.log('Selected location', selected);
    };

    return (
        <div style={{padding: 24, fontFamily: 'sans-serif'}}>
            <h2>Test location picker</h2>
            <div style={{display: 'flex', gap: 20}}>
                <LocationsDropdown locations={sampleLocations} onSelect={setSelected}/>
                <button onClick={handleSubmit}>Submit</button>
                <div>
                    <MapView selected={selected} />
                </div>
            </div>
        </div>
    );
};