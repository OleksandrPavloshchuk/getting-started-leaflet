import {type Location} from "../model/Location.ts";
import {Button, Flex, Paper, Stack} from "@mantine/core";
import {LocationsDropdown} from "./LocationsDropdown.tsx";
import {MapView} from "./MapView.tsx";
import {LocationInfo} from "./LocationInfo.tsx";
import {useWidgetStateModel} from "../model/WidgetStateModel.ts";
import {IconDeselect, IconFilterCancel, IconFilterSearch, IconSelect, IconTarget} from "@tabler/icons-react";
import {ExtraFiltersInfo} from "./ExtraFiltersInfo.tsx";
import {ExtraFilterDialog} from "./ExtraFilterDialog.tsx";
import React from "react";
import {useLocationFilterModel} from "../model/LocationFilterModel.ts";

type Props = {
    onSubmit: (loc: Location | undefined) => void
};

/**
 * Root component of widget.
 * It searches location in database using backend, shows it on the map and applies filters.
 *
 * @param onSubmit consumer of the selected location
 * @constructor
 */
export const LocationSelector: React.FC<Props> = ({onSubmit}) => {
    const selectedLocation = useWidgetStateModel((s) => s.selectedLocation);
    const setSelectedLocation = useWidgetStateModel((s) => s.setSelectedLocation);
    const setExtraFilterDialogOpened = useWidgetStateModel((s) => s.setExtraFilterDialogOpened);
    const setSearchCenterDialogOpened = useWidgetStateModel((s) => s.setSearchCenterDialogOpened);
    const loading = useWidgetStateModel((s) => s.loading);

    const clearAllFilters = useLocationFilterModel((s) => s.clearFilters);
    const radius = useLocationFilterModel((s) => s.radius);
    const country = useLocationFilterModel((s) => s.country);
    const locationTypeIds = useLocationFilterModel((s) => s.locationTypeIds);
    const cityAndName = useLocationFilterModel((s) => s.cityAndName);

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
                                onClick={() => {
                                    setSearchCenterDialogOpened(true);
                                }}
                                disabled={loading}><IconTarget/>&nbsp;Search Center</Button>
                        <Button style={{flex: 1}}
                                onClick={() => onSubmit(selectedLocation)}
                                disabled={loading || !selectedLocation}><IconSelect/>&nbsp;Submit</Button>
                        <Button style={{flex: 1}}
                                onClick={() => setExtraFilterDialogOpened(true)}
                                disabled={loading}
                        ><IconFilterSearch/>&nbsp;Set Extra Filters</Button>
                        <Button style={{flex: 1}}
                                onClick={clearAllFilters}
                                disabled={loading || (!country && !radius && locationTypeIds.length === 0 && !cityAndName)}
                        ><IconFilterCancel/>&nbsp;Clear All Filters</Button>
                        <Button style={{flex: 1}}
                                onClick={() => {
                                    setSelectedLocation(undefined);
                                }}
                                disabled={loading || !selectedLocation}><IconDeselect/>&nbsp;Reset</Button>
                    </Flex>
                    <MapView/>
                </Stack>
                <ExtraFilterDialog/>
            </Paper>
        </div>
    );
}