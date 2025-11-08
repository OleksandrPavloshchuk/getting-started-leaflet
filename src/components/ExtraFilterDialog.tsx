import {useEffect, useState} from "react";
import {Modal} from "@mantine/core";
import {CountriesDropdown} from "./CountriesDropdown.tsx";
import {type Country} from "../data/countries.ts";
import {IconCancel, IconCheck, IconFilterSearch} from "@tabler/icons-react";
import {TypesSelector} from "./TypesSelector.tsx";

type Props = {
    argCountry: Country | undefined,
    returnCountry: (country: Country | undefined) => void,
    argHotelTypeIds: string[],
    returnHotelTypeIds: (hotelTypeIds: string[]) => void
}

export const ExtraFilterDialog: React.FC<Props> = (
    {argCountry, returnCountry, argHotelTypeIds, returnHotelTypeIds}) => {
    const [opened, setOpened] = useState(false);
    const [country, setCountry] = useState<Country | undefined>(argCountry);
    const [hotelTypeIds, setHotelTypeIds] = useState<string[]>([]);

    useEffect(() => {
        setCountry(argCountry);
    }, [argCountry]);

    useEffect(() => {
        setHotelTypeIds(argHotelTypeIds);
    }, [argHotelTypeIds]);

    const handleSet = () => {
        returnCountry(country);
        returnHotelTypeIds(hotelTypeIds);
        setOpened(false);
    }

    const handleClear = () => {
        setCountry(undefined);
        returnCountry(undefined);
        returnHotelTypeIds([]);
        setOpened(false);
    }

    return (
        <>
        <span
            title="Extra filter"
            onClick={() => setOpened(true)}
            style={{
                cursor: 'pointer',
                padding: 9,
                borderRadius: 6,
                backgroundColor: country || argHotelTypeIds.length > 0 ? 'lightgrey' : 'white'
            }}
        ><IconFilterSearch size={20} color={"var(--mantine-color-blue-filled)"}/></span>
            <Modal
                title="Extra Filter"
                trapFocus={false}
                zIndex={8000}
                opened={opened}
                onClose={() => setOpened(false)}
                withinPortal={true}
                styles={{
                    root: {
                        borderRadius: 6
                    },
                    title: {
                        fontSize: "small",
                        fontWeight: 500,
                    },
                    header: {
                        paddingTop: '4px',
                        paddingBottom: '4px',
                        minHeight: 'auto',
                        backgroundColor: 'lightgrey'

                    },
                    content: {
                        top: '20%',
                        left: '-20%',
                        transform: 'translate(-50%, -50%)',
                        position: 'absolute',
                        backgroundColor: 'white'
                    }
                }}
            >
                <table width="100%">
                    <tbody>
                    <tr>
                        <td>
                            <CountriesDropdown argCountry={country} returnCountry={setCountry}/>
                        </td>
                        <td>
                            <IconCheck
                                style={{cursor: 'pointer'}}
                                title="Set extra filter"
                                onClick={handleSet}
                                size={20} color={"var(--mantine-color-blue-filled)"}/>
                        </td>
                        <td>
                            <IconCancel
                                style={{cursor: 'pointer'}}
                                title="Clear extra filter"
                                onClick={handleClear} size={20}
                                color={"var(--mantine-color-blue-filled)"}/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <TypesSelector argHotelTypeIds={hotelTypeIds} returnHotelTypeIds={setHotelTypeIds}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </Modal>
        </>
    );
}