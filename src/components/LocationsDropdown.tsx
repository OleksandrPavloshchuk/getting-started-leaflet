import {useMemo, useState} from "react";
import {Combobox, TextInput, useCombobox} from "@mantine/core";
import type {Location} from "../data/locations.ts";
import {LocationInfo} from "./LocationInfo.tsx";

const ENDPOINT_URI = "http://localhost:4000/api/locations";

type Props = {
    onSelect: (loc: Location | undefined) => void
}

export const LocationsDropdown: React.FC<Props> = ({onSelect}) => {
    const combobox = useCombobox();
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [locations, setLocations] = useState<Location[] | undefined>([]);

    useMemo(() => {
            const normalized = query?.toLowerCase().trim();
            if (!normalized) {
                return [];
            }
            const [city, name] = normalized.split(/,/);
            if (!city || city.trim().length < 2 || !name || name==="") {
                return [];
            }

            const controller = new AbortController(); // для можливості скасувати запит
            const fetchData = async () => {
                setLoading(true);
                setError(null);

                try {
                    const res = await fetch(
                        `${ENDPOINT_URI}?q=${encodeURIComponent(query)}`,
                        {signal: controller.signal}
                    );

                    if (!res.ok) {
                        throw `HTTP ${res.status}`;
                    }

                    const data: Location[] = await res.json();
                    setLocations(data);
                } catch (e) {
                    setError(`Retrieve error: ${e}`);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();

            // Скасувати запит, якщо query змінився швидко
            return () => controller.abort();

        },
        [query]
    );

    // Simple filter by name:
    const handleChange = (q: string) => {
        setQuery(q);
        combobox.openDropdown();
        combobox.updateSelectedOptionIndex();
    };

    const handleSelect = (key: string) => {
        if (locations) {
            const selected = locations.find((item) => item.id === key);
            onSelect(selected);
            combobox.closeDropdown();
        }
    }

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p style={{color: "red"}}>Error: {error}</p>}
            <Combobox
                withinPortal={false}
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
                    />
                </Combobox.Target>
                <Combobox.Dropdown
                    style={{
                        maxHeight: '200px',
                        overflowY: 'auto',
                    }}
                >
                    <Combobox.Options>
                        {
                            locations && locations.length > 0 ?
                                (locations.map((item) =>
                                        <Combobox.Option value={item.id} key={item.id}>
                                            <LocationInfo location={item}/>
                                        </Combobox.Option>)
                                ) : (
                                    <Combobox.Empty>Nothing is found</Combobox.Empty>
                                )
                        }
                    </Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>
        </>
    );
}