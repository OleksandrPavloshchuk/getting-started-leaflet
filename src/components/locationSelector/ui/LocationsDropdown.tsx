import React, {useEffect} from "react";
import {Combobox, TextInput, Tooltip, useCombobox} from "@mantine/core";
import {LocationInfo} from "./LocationInfo.tsx";
import {useDebouncedValue} from "@mantine/hooks";
import {DropdownArrow} from "./DropdownArrow.tsx";
import {useLocationStore} from "../model/LocationStore.ts";
import {getDropdownItemStyle} from "../utils/utils.ts";
import {IconHelp} from "@tabler/icons-react";

export const LocationsDropdown: React.FC = () => {
    const combobox = useCombobox();
    const error = useLocationStore((s) => s.error);
    const loading = useLocationStore((s) => s.loading);
    const result = useLocationStore((s) => s.result);
    const retrieve = useLocationStore((s) => s.retrieve);
    const query = useLocationStore((s) => s.searchText);
    const setQuery = useLocationStore((s) => s.setSearchText);
    const country = useLocationStore((s) => s.country);
    const hotelTypeIds = useLocationStore((s) => s.hotelTypeIds);
    const selected = useLocationStore((s) => s.selectedLocation);
    const setSelected = useLocationStore((s) => s.setSelectedLocation);
    const radius = useLocationStore((s) => s.searchRadius);
    const center = useLocationStore((s) => s.searchCenter);

    const [debouncedQuery] = useDebouncedValue(query, 300);

    useEffect(
        () => {
            if (debouncedQuery && debouncedQuery.length >= 3) {
                retrieve();
                combobox.focusSearchInput();
            }
        },
        [query, country, hotelTypeIds, radius, center]
    );

    // Simple filter by name:
    const handleChange = (q: string) => {
        setQuery(q);
        combobox.openDropdown();
        combobox.updateSelectedOptionIndex();
    };

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
                                            value={query}
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