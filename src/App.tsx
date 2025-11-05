import {useState} from "react";
import {type Location} from "./data/locations.ts";
import {LocationsDropdown} from "./components/LocationsDropdown.tsx";
import {MapView} from "./components/MapView.tsx";
import {Button, Paper, Stack} from "@mantine/core";
import {LocationInfo} from "./components/LocationInfo.tsx";

export default function App() {
    const [selected, setSelected] = useState<Location | undefined>(undefined);

    const handleSubmit = () => {
        if (!selected) {
            console.log("No location selected");
            return;
        }
        console.log('Selected location', selected);
    };

    const handleSelect = (location: Location | undefined) => {
        setSelected(location);
    }

    const getLocationText = (loc: Location) =>
        <strong>
            <LocationInfo location={loc}/>
        </strong>

    return (
        <div style={{padding: 24, fontFamily: 'sans-serif'}}>
            <Paper withBorder radius="md" p="lg">
                <Stack gap="lg">
                    <LocationsDropdown onSelect={handleSelect}/>
                    {
                        selected &&
                        <div><strong>{getLocationText(selected)}</strong></div>
                    }
                    <Button onClick={handleSubmit}>Submit</Button>
                    <div>
                        <MapView selected={selected}/>
                    </div>
                </Stack>
            </Paper>
        </div>
    );
};