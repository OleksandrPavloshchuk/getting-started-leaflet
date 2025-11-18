import {type Location} from "../model/Location.ts";
import {Button, Flex, Paper, Stack} from "@mantine/core";
import {LocationsDropdown} from "./LocationsDropdown.tsx";
import {MapView} from "./MapView.tsx";
import {LocationInfo} from "./LocationInfo.tsx";
import {useLocationStore} from "../model/LocationStore.ts";
import {IconDeselect, IconFilterCancel, IconSelect} from "@tabler/icons-react";
import {ExtraFiltersInfo} from "./ExtraFiltersInfo.tsx";

type Props = {
    onSubmit: (loc: Location | undefined) => void
};

export const LocationSelector: React.FC<Props> = ({onSubmit}) => {
    const selectedLocation = useLocationStore((s) => s.selectedLocation);
    const setSelectedLocation = useLocationStore((s) => s.setSelectedLocation);
    const filtersEnabled = useLocationStore((s) => s.filtersEnabled);
    const clearAllFilters = useLocationStore((s) => s.clearFilters);

    return (
        <div style={{padding: 24, fontFamily: 'sans-serif'}}>
            <Paper withBorder radius="md" p="lg">
                <Stack gap="sm">
                    <ExtraFiltersInfo/>
                    <LocationsDropdown/>
                    <div>
                        {
                            selectedLocation
                                ? (<strong><LocationInfo location={selectedLocation}/></strong>)
                                : (<span>(Nothing selected)</span>)
                        }
                    </div>
                    <Flex w="100%" gap="sm">
                        <Button style={{flex: 1}}
                                onClick={() => onSubmit(selectedLocation)}
                                disabled={!selectedLocation}><IconSelect/>&nbsp;Submit</Button>
                        <Button style={{flex: 1}}
                                onClick={clearAllFilters}
                                disabled={!filtersEnabled}><IconFilterCancel/>&nbsp;Clear All Filters</Button>
                        <Button style={{flex: 1}}
                                onClick={() => {
                                    setSelectedLocation(undefined);
                                }}
                                disabled={!selectedLocation}><IconDeselect/>&nbsp;Reset</Button>
                    </Flex>
                    <div>
                        <MapView/>
                    </div>
                </Stack>
            </Paper>
        </div>
    );
}