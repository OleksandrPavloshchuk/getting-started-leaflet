import React, {useEffect} from "react";
import {Combobox, TextInput, useCombobox} from "@mantine/core";
import {DropdownArrow} from "./DropdownArrow.tsx";
import {getDropdownItemStyle} from "../utils/utils.ts";
import type {SearchCenterGroup} from "../model/SearchCenterGroup.ts";
import {retrievePersonalSearchCenterGroups} from "../service/RetrievePersonalSearchCenterGroups.ts";

type Props = {
    value: SearchCenterGroup| undefined,
    setValue: (c:SearchCenterGroup|undefined) => void
};

export const SearchCenterGroupsDropdown: React.FC<Props> = ({value, setValue}) => {
    const combobox = useCombobox();

    const retrieve = retrievePersonalSearchCenterGroups.useModel((s)=>s.call);
    const result = retrievePersonalSearchCenterGroups.useModel((s)=> s.result);

    useEffect(() => {
        retrieve();
    }, []);

    const findGroup = (key: string): SearchCenterGroup|undefined=>
        result.find((v:SearchCenterGroup) => v.id==key);

    const handleSelect = (key: string) => {
        combobox.resetSelectedOption();
        setValue(findGroup(key));
        combobox.closeDropdown();
    }

    const handleChange = (s: string) => {
        if (value) {
            const idx = result.findIndex((v: SearchCenterGroup) =>
                v.name.startsWith(s.toUpperCase()));
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
                    title={"Group"}
                    value={value ? value.name : ""}
                    placeholder="Group"
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
                        result
                            .map((item) =>
                                <Combobox.Option
                                    value={item.id}
                                    key={item.id}
                                    style={getDropdownItemStyle(() => value?.id === item.id)}
                                >{item.name}</Combobox.Option>)
                    }
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}