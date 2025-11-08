import {useEffect, useState} from "react";
import {ActionIcon, Modal} from "@mantine/core";
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
            <ActionIcon
                onClick={() => setOpened(true)}
                variant="white"
                size="lg"
                style={{
                    backgroundColor: country || argHotelTypeIds.length > 0 ? 'lightgrey' : 'white'
                }}
                title="Extra Filter">
                <IconFilterSearch size={20}/>
            </ActionIcon>

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
                            <ActionIcon
                                onClick={handleSet}
                                variant="white"
                                size="lg"
                                title="Set Extra Filter">
                                <IconCheck size={20}/>
                            </ActionIcon>
                        </td>
                        <td>
                            <ActionIcon
                                onClick={handleClear}
                                variant="white"
                                size="lg"
                                title="Clear Extra Filter">
                                <IconCancel size={20}/>
                            </ActionIcon>
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