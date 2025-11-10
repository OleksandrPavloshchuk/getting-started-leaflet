import React, {useState} from "react";
import {Combobox, TextInput, useCombobox} from "@mantine/core";
import {COUNTRIES, type Country, getCountryData} from "../data/countries.ts";
import {DropdownArrow} from "./DropdownArrow.tsx";

type Props = {
    argCountry: Country | undefined,
    returnCountry: (country: Country | undefined) => void
}

export const CountriesDropdown: React.FC<Props> = ({argCountry, returnCountry}) => {
    const combobox = useCombobox();
    const [selected, setSelected] = useState<Country | undefined>(argCountry);

    const handleSelect = (key: string) => {
        combobox.resetSelectedOption();
        const country = getCountryData(key)
        setSelected(country);
        combobox.closeDropdown();
        returnCountry(country);
    }

    const handleChange = (s: string) => {
        if (!selected) {
            const idx = COUNTRIES.findIndex((v: Country) =>
                v.name.toUpperCase().startsWith(s.toUpperCase()));
            if (idx >= 0) {
                combobox.selectOption(idx);
            }
        }
        combobox.openDropdown();
        combobox.updateSelectedOptionIndex();
    };

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
                    value={selected ? `${selected.flag} ${selected.name}` : ""}
                    placeholder="Country"
                    onFocus={() => combobox.openDropdown()}
                    onClick={() => combobox.openDropdown()}
                    onBlur={() => combobox.closeDropdown()}
                    onChange={(event) =>
                        handleChange(event.currentTarget.value)
                    }
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