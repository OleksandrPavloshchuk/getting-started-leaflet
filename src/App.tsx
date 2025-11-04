import {useState} from "react";
import {type Location, sampleLocations} from "./data/locations.ts";
import {LocationsDropdown} from "./components/LocationsDropdown.tsx";
import {MapView} from "./components/MapView.tsx";
import {Paper, Stack} from "@mantine/core";

export default function App() {
    const [selected, setSelected] = useState<Location | undefined>(undefined);

    const handleSubmit = () => {
        if (!selected) {
            console.log("No location selected");
            return;
        }
        console.log('Selected location', selected);
    };

    const handleSelect = (location: Location|undefined) => {
        setSelected(location);
    }

    return (
        <div style={{padding: 24, fontFamily: 'sans-serif'}}>
            <Paper withBorder radius="md" p="lg">
                <Stack gap="lg">
                    <LocationsDropdown locations={sampleLocations} onSelect={handleSelect}/>
                    {
                        selected &&
                        <div><strong>{selected.name}</strong></div>
                    }
                    <button onClick={handleSubmit}>Submit</button>
                    <div>
                        <MapView selected={selected} />
                    </div>
                </Stack>
            </Paper>
        </div>
    );
};