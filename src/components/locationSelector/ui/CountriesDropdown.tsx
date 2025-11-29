import React from "react";
import {Combobox, TextInput, useCombobox} from "@mantine/core";
import {COUNTRIES, type Country, getCountryData} from "../static/countries.ts";
import {DropdownArrow} from "./DropdownArrow.tsx";
import {getDropdownItemStyle} from "../utils/utils.ts";

type Props = {
    value: Country| undefined,
    setValue: (c:Country|undefined) => void
};

export const CountriesDropdown: React.FC<Props> = ({value, setValue}) => {
    const combobox = useCombobox();

    const handleSelect = (key: string) => {
        combobox.resetSelectedOption();
        setValue(getCountryData(key));
        combobox.closeDropdown();
    }

    const handleChange = (s: string) => {
        if (value) {
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
                    value={value ? `${value.flag} ${value.name}` : ""}
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
                                    style={getDropdownItemStyle(() => value?.iso === item.iso)}
                                >{item.flag}&nbsp;{item.name}</Combobox.Option>)
                    }
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}