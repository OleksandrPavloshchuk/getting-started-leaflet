import {type Location} from "../model/Location.ts";
import {Button, Flex, Paper, Stack} from "@mantine/core";
import {LocationsDropdown} from "./LocationsDropdown.tsx";
import {MapView} from "./MapView.tsx";
import {LocationInfo} from "./LocationInfo.tsx";
import {useLocationStore} from "../model/LocationStore.ts";
import {getLocationStr, getRadiusStr} from "../utils/utils.ts";

type Props = {
    onSubmit: (loc: Location | undefined) => void
};

export const LocationSelector: React.FC<Props> = ({onSubmit}) => {
    const selectedLocation = useLocationStore((s) => s.selectedLocation);
    const setSelectedLocation = useLocationStore((s) => s.setSelectedLocation);
    const searchRadius = useLocationStore((s)=>s.searchRadius);
    const searchCenter = useLocationStore((s)=>s.searchCenter);

    return (
        <div style={{padding: 24, fontFamily: 'sans-serif'}}>
            <Paper withBorder radius="md" p="lg">
                <Stack gap="sm">
                    {searchRadius && searchCenter &&
                        <div style={{fontSize:'10pt'}}>
                            {`${getLocationStr(searchCenter)}, radius = ${getRadiusStr(searchRadius)}`}
                        </div>
                    }
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
                                disabled={!selectedLocation}>Submit</Button>
                        <Button style={{flex: 1}}
                                onClick={() => {
                                    setSelectedLocation(undefined);
                                }}
                                disabled={!selectedLocation}>Reset</Button>
                    </Flex>
                    <div>
                        <MapView/>
                    </div>
                </Stack>
            </Paper>
        </div>
    );
}