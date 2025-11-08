import React, {useState} from "react";
import {Combobox, TextInput, useCombobox} from "@mantine/core";
import {FLAGS, type Country, getCountryData} from "../data/flags.ts";
import {IconChevronDown, IconChevronUp} from "@tabler/icons-react";

type Props = {
    argSelected: Country | undefined,
    onSelect: (country: Country | undefined) => void
}

export const CountriesDropdown: React.FC<Props> = ({argSelected, onSelect}) => {
    const combobox = useCombobox();
    const [selected, setSelected] = useState<Country | undefined>(argSelected);

    const handleSelect = (key: string) => {
        const country = getCountryData(key)
        setSelected(country);
        combobox.closeDropdown();
        onSelect(country);
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
                    maxHeight: '200px',
                    overflowY: 'auto',
                }}
            >
                <Combobox.Options>
                    {
                        FLAGS
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