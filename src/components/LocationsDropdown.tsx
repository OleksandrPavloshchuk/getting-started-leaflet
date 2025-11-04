import {useMemo, useState} from "react";
import {Combobox, useCombobox} from "@mantine/core";
import type {Location} from "../data/locations.ts";
import {getCountryData} from "../data/flags.ts";

const ENDPOINT_URI = "http://localhost:4000/api/locations";

type Props = {
    onSelect: (loc: Location | undefined) => void
}

export const LocationsDropdown: React.FC<Props> = ({onSelect}) => {
    const combobox = useCombobox();
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [locations, setLocations] = useState<Location[]|undefined>([]);

    useMemo(() => {
            const normalized = query?.toLowerCase().trim();
            if (!normalized || !normalized.includes(",")) {
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
            setQuery(selected ? selected.city + ", " + selected.name : "");
        }
    }

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p style={{color: "red"}}>Error: {error}</p>}
            <Combobox
                withinPortal={false}
                zIndex={9999}
                store={combobox}
                onOptionSubmit={(v) => handleSelect(v)}
            >
                <Combobox.Target>
                    <input
                        type="text"
                        placeholder="Type city, hotel name — e.g. 'London, Hilton'. You may skip hotel name. Comma is mandatory."
                        value={query ?? ''}
                        onChange={(event) =>
                            handleChange(event.currentTarget.value)
                        }
                        style={{
                            padding: '6px',
                            borderRadius: '6px',
                            border: '1px solid #ccc',
                        }}
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
                                (locations
                                        .map((item) => (
                                            <Combobox.Option value={item.id} key={item.id}>
                                                <span style={{margin: 6}}>{getCountryData(item.country)?.flag}</span>
                                                <span style={{width: 300, margin: 6}}>{item.city}</span>-
                                                <span style={{margin: 6}}>{item.name}</span>
                                            </Combobox.Option>
                                        ))
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