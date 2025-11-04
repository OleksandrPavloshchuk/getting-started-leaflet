import {useMemo, useState} from "react";
import {Combobox, useCombobox} from "@mantine/core";
import type {Location} from "../data/locations.ts";

type Props = {
    locations: Location[],
    onSelect: (loc: Location | undefined) => void
}

export const LocationsDropdown: React.FC<Props> = ({locations, onSelect}) => {
    const combobox = useCombobox();
    const [query, setQuery] = useState('');
    const filtered = useMemo(() => {
            const normalized = query?.toLowerCase().trim();
            if (!normalized) {
                return locations;
            }
            return locations.filter((loc)=> loc.name.toLowerCase().includes(normalized));
        },
        [query, locations]
    );

    // Simple filter by name:
    const handleChange = (q: string) => {
        setQuery(q);
        combobox.openDropdown();
        combobox.updateSelectedOptionIndex();
    };

    const handleSelect = (key: string) => {
        const selected = locations.find((item) => item.id === key);
        onSelect(selected);
        combobox.closeDropdown();
        setQuery(selected?.name ?? "");
    }

    return (
        <Combobox
            withinPortal={false}
            zIndex={9999}
            store={combobox}
            onOptionSubmit={(v) => handleSelect(v)}
        >
            <Combobox.Target>
                <input
                    type="text"
                    placeholder="Select location"
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
            <Combobox.Dropdown>
                <Combobox.Options>
                    {
                        filtered && filtered.length > 0 ?
                            (filtered
                            .map((item) => (
                                <Combobox.Option value={item.id} key={item.id}>
                                    {item.name}
                                </Combobox.Option>
                            ))
                            ) : (
                                <Combobox.Empty>Nothing is found</Combobox.Empty>
                            )
                    }
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}