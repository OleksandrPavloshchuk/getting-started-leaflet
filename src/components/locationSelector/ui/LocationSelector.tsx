import React, {useState} from "react";
import {type Location} from "../model/Location.ts";
import {Button, Flex, Paper, Stack} from "@mantine/core";
import {LocationsDropdown} from "./LocationsDropdown.tsx";
import {MapView} from "./MapView.tsx";
import {LocationInfo} from "./LocationInfo.tsx";

type Props = {
    onSubmit: (loc: Location | undefined) => void
};

export const LocationSelector: React.FC<Props> = ({onSubmit}) => {
    const [selected, setSelected] = useState<Location | undefined>(undefined);

    const handleSubmit = () => {
        onSubmit(selected);
    };

    const handleSelect = (location: Location | undefined) => {
        setSelected(location);
    }

    return (
        <div style={{padding: 24, fontFamily: 'sans-serif'}}>
            <Paper withBorder radius="md" p="lg">
                <Stack gap="lg">
                    <LocationsDropdown onSelect={handleSelect}/>
                    <div>
                    {
                        selected
                        ? (<strong><LocationInfo location={selected}/></strong>)
                            : (<span>(Nothing selected)</span>)
                    }
                    </div>
                    <Flex w="100%" gap="sm">
                        <Button style={{flex: 1}} onClick={handleSubmit} disabled={!selected}>Submit</Button>
                        <Button style={{flex: 1}} onClick={() => {setSelected(undefined);}}>Reset</Button>
                    </Flex>
                    <div>
                        <MapView selected={selected}/>
                    </div>
                </Stack>
            </Paper>
        </div>
    );
}