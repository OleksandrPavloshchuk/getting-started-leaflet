import React, {useState} from "react";
import {Combobox, TextInput, useCombobox} from "@mantine/core";
import {COUNTRIES, type Country, getCountryData} from "../data/countries.ts";
import {IconChevronDown, IconChevronUp} from "@tabler/icons-react";

type Props = {
    argCountry: Country | undefined,
    returnCountry: (country: Country | undefined) => void
}

export const CountriesDropdown: React.FC<Props> = ({argCountry, returnCountry}) => {
    const combobox = useCombobox();
    const [selected, setSelected] = useState<Country | undefined>(argCountry);

    const handleSelect = (key: string) => {
        const country = getCountryData(key)
        setSelected(country);
        combobox.closeDropdown();
        returnCountry(country);
    }

    return (
        <Combobox
            withinPortal={true}
            zIndex={8000}
            store={combobox}
            onOptionSubmit={(v) => handleSelect(v)}
        >
            <Combobox.Target>
                <TextInput
                    title={"Country"}
                    readOnly
                    value={selected ? `${selected.flag} ${selected.name}` : ""}
                    placeholder="Country"
                    onFocus={() => combobox.openDropdown()}
                    onClick={() => combobox.openDropdown()}
                    onBlur={() => combobox.closeDropdown()}
                    rightSection={combobox.dropdownOpened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
                    rightSectionPointerEvents="none"
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
                        COUNTRIES
                            .sort((item1: Country, item2: Country) => item1.name.localeCompare(item2.name))
                            .map((item) =>
                                <Combobox.Option
                                    value={item.iso}
                                    key={item.iso}
                                    style={{
                                        color: selected?.iso === item.iso ? 'white' : undefined,
                                        backgroundColor: selected?.iso === item.iso ? 'var(--mantine-color-blue-filled)' : undefined,
                                    }}>
                                    {item.flag}&nbsp;{item.name}
                                </Combobox.Option>)
                    }
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}