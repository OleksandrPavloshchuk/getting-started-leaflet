import React, {useMemo, useState} from "react";
import {Combobox, TextInput, useCombobox} from "@mantine/core";
import type {Location} from "../data/locations.ts";
import {LocationInfo} from "./LocationInfo.tsx";
import {retrieveLocations} from "../services/retrieveLocations.ts";
import {useDebouncedValue} from "@mantine/hooks";
import {ExtraFilterDialog} from "./ExtraFilterDialog.tsx";
import type {Country} from "../data/countries.ts";
import {IconChevronDown, IconChevronUp} from "@tabler/icons-react";

type Props = {
    onSelect: (loc: Location | undefined) => void
}

export const LocationsDropdown: React.FC<Props> = ({onSelect}) => {
    const combobox = useCombobox();
    const [query, setQuery] = useState('');
    const [debouncedQuery] = useDebouncedValue(query, 300);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [locations, setLocations] = useState<Location[] | undefined>([]);
    const [country, setCountry] = useState<Country | undefined>(undefined);
    const [hotelTypeIds, setHotelTypeIds] = useState<string[]>([]);
    const [selected, setSelected] = useState<Location | undefined>();

    useMemo(
        () => {
            if (debouncedQuery.length >= 3) {
                retrieveLocations(
                    query,
                    country?.iso ? country?.iso : '',
                    hotelTypeIds,
                    setLoading,
                    setError,
                    setLocations);
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
        if (locations) {
            const loc = locations.find((item) => item.id === key);
            setSelected(loc);
            onSelect(loc);
            combobox.closeDropdown();
        }
    }

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p style={{color: "red"}}>Error: {error}</p>}
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
                                    placeholder="Type at least 2 letters for city, comma and at least 1 letters from hotel name — e.g. 'Lo, H'"
                                    onChange={(event) =>
                                        handleChange(event.currentTarget.value)
                                    }
                                    onFocus={() => combobox.openDropdown()}
                                    onClick={() => combobox.openDropdown()}
                                    onBlur={() => combobox.closeDropdown()}
                                    rightSection={combobox.dropdownOpened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
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
                                        locations && locations.length > 0 ?
                                            (locations.map((item) =>
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
                            argCountry={country}
                            returnCountry={setCountry}
                            argHotelTypeIds={hotelTypeIds}
                            returnHotelTypeIds={setHotelTypeIds}
                        />
                    </td>
                </tr>
                </tbody>
            </table>
        </>
    );
}