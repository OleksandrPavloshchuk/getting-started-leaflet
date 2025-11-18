import React, {useEffect} from "react";
import {Combobox, TextInput, useCombobox} from "@mantine/core";
import {LocationInfo} from "./LocationInfo.tsx";
import {useDebouncedValue} from "@mantine/hooks";
import {ExtraFilterDialog} from "./ExtraFilterDialog.tsx";
import {DropdownArrow} from "./DropdownArrow.tsx";
import {useLocationStore} from "../model/LocationStore.ts";
import {getDropdownItemStyle} from "../utils/utils.ts";

export const LocationsDropdown: React.FC = () => {
    const combobox = useCombobox();
    const error = useLocationStore((s) => s.error);
    const loading = useLocationStore((s) => s.loading);
    const result = useLocationStore((s) => s.result);
    const searchByText = useLocationStore((s) => s.searchByText);
    const query = useLocationStore((s) => s.searchText);
    const setQuery = useLocationStore((s) => s.setSearchText);
    const country = useLocationStore((s) => s.country);
    const hotelTypeIds = useLocationStore((s) => s.hotelTypeIds);
    const selected = useLocationStore((s) => s.selectedLocation);
    const setSelected = useLocationStore((s) => s.setSelectedLocation);
    const extraFilterOpened = useLocationStore((s) => s.extraFilterOpened);
    const radius = useLocationStore((s) => s.searchRadius);
    const center = useLocationStore((s) => s.searchCenter);

    const [debouncedQuery] = useDebouncedValue(query, 300);

    useEffect(
        () => {
            if (debouncedQuery && debouncedQuery.length >= 3) {
                searchByText();
            }
        },
        [query, country, hotelTypeIds, extraFilterOpened, radius, center]
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
            {loading && <p>Loading...</p>}
            {!loading &&
                <table style={{width: "100%"}}>
                    <tbody>
                    <tr>
                        <td style={{width: "100%"}}>
                            <Combobox
                                withinPortal={true}
                                zIndex={8000}
                                store={combobox}
                                onOptionSubmit={(v) => handleSelect(v)}
                            >
                                <Combobox.Target>
                                    <TextInput
                                        value={query}
                                        placeholder="Type at least 2 letters for city, comma and at least 1 letters from hotel name — e.g. 'Lo, H'"
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
                        </td>
                        <td>
                            <ExtraFilterDialog/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            }
        </>
    );
}