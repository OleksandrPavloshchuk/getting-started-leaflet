import React from "react";
import {Combobox, TextInput, useCombobox} from "@mantine/core";
import {COUNTRIES, type Country, getCountryData} from "../static/countries.ts";
import {DropdownArrow} from "./DropdownArrow.tsx";
import {getDropdownItemStyle} from "../utils/utils.ts";
import {useLocationFilterModel} from "../model/LocationFilterModel.ts";

export const CountriesDropdown: React.FC = () => {
    const combobox = useCombobox();

    const country = useLocationFilterModel((s) => s.country);
    const setCountry = useLocationFilterModel((s) => s.setCountry);

    const handleSelect = (key: string) => {
        combobox.resetSelectedOption();
        setCountry(getCountryData(key));
        combobox.closeDropdown();
    }

    const handleChange = (s: string) => {
        if (country) {
            const idx = COUNTRIES.findIndex((v: Country) =>
                v.name.toUpperCase().startsWith(s.toUpperCase()));
            if (idx >= 0) {
                combobox.selectOption(idx);
            }
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
        }
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
                    value={country ? `${country.flag} ${country.name}` : ""}
                    placeholder="Country"
                    onFocus={() => combobox.openDropdown()}
                    onClick={() => combobox.openDropdown()}
                    onBlur={() => combobox.closeDropdown()}
                    rightSection={<DropdownArrow target={combobox}/>}
                    onChange={(event) =>
                        handleChange(event.currentTarget.value)
                    }
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
                                    style={getDropdownItemStyle(() => country?.iso === item.iso)}
                                >{item.flag}&nbsp;{item.name}</Combobox.Option>)
                    }
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}