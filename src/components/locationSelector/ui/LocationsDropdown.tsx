import React, {useEffect, useState} from "react";
import {Combobox, TextInput, useCombobox} from "@mantine/core";
import type {Location} from "../model/Location.ts";
import {LocationInfo} from "./LocationInfo.tsx";
import {useDebouncedValue} from "@mantine/hooks";
import {ExtraFilterDialog} from "./ExtraFilterDialog.tsx";
import {getCountryData} from "../static/countries.ts";
import {DropdownArrow} from "./DropdownArrow.tsx";
import {useLocationStore} from "../model/LocationStore.ts";

type Props = {
    onSelect: (loc: Location | undefined) => void
}

export const LocationsDropdown: React.FC<Props> = ({onSelect}) => {
    const combobox = useCombobox();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const result = useLocationStore((s)=> s.result);
    const searchByText = useLocationStore((s) => s.searchByText);
    const query = useLocationStore((s) => s.searchText);
    const setQuery = useLocationStore((s) => s.setSearchText);
    const country = useLocationStore((s) => s.countryIsoCode);
    const setCountry = useLocationStore((s) => s.setCountryIsoCode);
    const hotelTypeIds = useLocationStore((s) => s.hotelTypeIds);
    const setHotelTypeIds = useLocationStore((s) => s.setHotelTypeIds);
    const selected = useLocationStore((s) => s.selectedLocation);
    const setSelected = useLocationStore((s) => s.setSelectedLocation);

    const [debouncedQuery] = useDebouncedValue(query, 300);

    useEffect(
        () => {
            if (debouncedQuery && debouncedQuery.length >= 3) {
                searchByText( setLoading, setError);
            }
        },
        [query, country, hotelTypeIds]
    );

    // Simple filter by name:
    const handleChange = (q: string) => {
        setQuery(q);
        combobox.openDropdown();
        combobox.updateSelectedOptionIndex();
    };

    const handleSelect = (key: string) => {
        if (result) {
            const loc = result.find((item) => item.id === key);
            setSelected(loc);
            onSelect(loc);
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
                                    rightSection={<DropdownArrow target={combobox} />}
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
                                                        style={{
                                                            color: selected?.id === item.id ? 'white' : undefined,
                                                            backgroundColor: selected?.id === item.id ? 'var(--mantine-color-blue-filled)' : undefined,
                                                        }}
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
                        <ExtraFilterDialog
                            argCountry={getCountryData(country)}
                            returnCountry={c => setCountry(c?.iso)}
                            argHotelTypeIds={hotelTypeIds}
                            returnHotelTypeIds={setHotelTypeIds}
                        />
                    </td>
                </tr>
                </tbody>
            </table>
            }
        </>
    );
}