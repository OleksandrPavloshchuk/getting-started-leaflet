import React, {useEffect} from "react";
import {Combobox, TextInput, Tooltip, useCombobox} from "@mantine/core";
import {LocationInfo} from "./LocationInfo.tsx";
import {useDebouncedValue} from "@mantine/hooks";
import {DropdownArrow} from "./DropdownArrow.tsx";
import {useWidgetStateModel} from "../model/WidgetStateModel.ts";
import {getDropdownItemStyle} from "../utils/utils.ts";
import {IconHelp} from "@tabler/icons-react";
import {retrieveLocations} from "../service/RetrieveLocations.ts";
import {useLocationFilterModel} from "../model/LocationFilterModel.ts";

/**
 * This dropdown applies filters, primarily from the input line, requests locations data from service
 * and fills the dropdown list.
 *
 * @constructor
 */
export const LocationsDropdown: React.FC = () => {
    const combobox = useCombobox();

    const error = useWidgetStateModel((s) => s.error);
    const setError = useWidgetStateModel((s) => s.setError);
    const loading = useWidgetStateModel((s) => s.loading);
    const setLoading = useWidgetStateModel((s) => s.setLoading);
    const selected = useWidgetStateModel((s) => s.selectedLocation);
    const setSelected = useWidgetStateModel((s) => s.setSelectedLocation);

    const cityAndName = useLocationFilterModel((s) => s.cityAndName);
    const setCityAndName = useLocationFilterModel((s) => s.setCityAndName);
    const country = useLocationFilterModel((s) => s.country);
    const locationTypeIds = useLocationFilterModel((s) => s.locationTypeIds);
    const radius = useLocationFilterModel((s) => s.radius);
    const center = useLocationFilterModel((s) => s.center);
    const getFilters = useLocationFilterModel((s) => s.getFilters);

    const retrieve = retrieveLocations.useModel((s)=>s.call);
    const result = retrieveLocations.useModel((s) => s.result);

    // Debounce used to prevent the redundant requests to service
    const [debouncedQuery] = useDebouncedValue(cityAndName, 300);

    // Listen to filter parameters changes and retrieve data from service
    useEffect(
        () => {
            if (debouncedQuery && debouncedQuery.length >= 3) {
                retrieve(getFilters(), setLoading, setError);
                combobox.focusSearchInput();
            }
        },
        [cityAndName, country, locationTypeIds, radius, center]
    );

    // Listen to changes of input line
    const handleChange = (val: string) => {
        setCityAndName(val);
        combobox.openDropdown();
        combobox.updateSelectedOptionIndex();
    };

    // Listen to selection of position in the list
    const handleSelect = (key: string) => {
        if (result.length > 0) {
            const loc = result.find((item) => item.id === key);
            setSelected(loc);
            combobox.closeDropdown();
        }
    }

    return (
        <>
            {error && <p style={{color: "red"}}>Error: {error}</p>}
            <table style={{width: "100%"}}>
                <tbody>
                {loading &&
                    <tr>
                        <td
                            style={{verticalAlign: "center", textAlign: "center", height: 80}}
                        ><img src="public/loading.gif" width={200} height={50} alt="loading..." /></td>
                    </tr>
                }
                {!loading &&
                    <tr>
                        <td style={{width: "100%", height: 80}}>
                            <fieldset style={{fontSize: '8pt', height: "55pt"}}>
                                <legend>{`Found: ${result.length}`}</legend>
                                <Combobox
                                    withinPortal={true}
                                    zIndex={8000}
                                    store={combobox}
                                    onOptionSubmit={(v) => handleSelect(v)}
                                >
                                    <Combobox.Target>
                                        <TextInput
                                            value={cityAndName}
                                            placeholder="Type at least 2 letters for city, comma and space for all hotels or at least 1 letters from hotel name"
                                            onChange={(event) =>
                                                handleChange(event.currentTarget.value)
                                            }
                                            onFocus={() => combobox.openDropdown()}
                                            onClick={() => combobox.openDropdown()}
                                            onBlur={() => combobox.closeDropdown()}
                                            rightSection={<DropdownArrow target={combobox}/>}
                                        />
                                    </Combobox.Target>
                                    <Combobox.Dropdown
                                        style={{
                                            maxHeight: '300px',
                                            overflowY: 'auto',
                                        }}
                                    >
                                        <Combobox.Options>
                                            {
                                                result && result.length > 0 ?
                                                    (result.map((item) =>
                                                            <Combobox.Option
                                                                value={item.id} key={item.id}
                                                                style={getDropdownItemStyle(() => selected?.id === item.id)}
                                                            >
                                                                <LocationInfo location={item}/>
                                                            </Combobox.Option>)
                                                    ) : (
                                                        <Combobox.Empty>Nothing is found</Combobox.Empty>
                                                    )
                                            }
                                        </Combobox.Options>
                                    </Combobox.Dropdown>
                                </Combobox>
                            </fieldset>
                        </td>
                        <td>
                            <Tooltip
                                label={helpText}
                                position="left-start"
                                style={{maxWidth: 480}}
                                multiline
                            >
                                <IconHelp size={18} style={{marginLeft: 6, cursor: 'pointer', color: 'grey'}}/>
                            </Tooltip>
                        </td>
                    </tr>
                }
                </tbody>
            </table>
        </>
    );
}

const helpText = `Enter at least two letters of the city name, then a comma and a space if you want to search for all locations in that city, 
or at least one letter of the location name if you want to narrow it down.

Note: some cities have a very large number of locations, so searches may occasionally take longer.`