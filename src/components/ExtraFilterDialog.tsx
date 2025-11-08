import {useEffect, useState} from "react";
import {Modal} from "@mantine/core";
import {CountriesDropdown} from "./CountriesDropdown.tsx";
import {type Country} from "../data/flags.ts";
import {IconCancel, IconCheck, IconFilterSearch} from "@tabler/icons-react";

type Props = {
    argCountry: Country | undefined,
    returnCountry: (country: Country | undefined) => void
}

export const ExtraFilterDialog: React.FC<Props> = ({argCountry, returnCountry}) => {
    const [opened, setOpened] = useState(false);
    const [country, setCountry] = useState<Country | undefined>(argCountry);

    useEffect(() => {
        setCountry(argCountry);
    }, [argCountry]);

    const handleSet = () => {
        returnCountry(country);
        setOpened(false);
    }

    const handleClear = () => {
        setCountry(undefined);
        returnCountry(undefined);
        setOpened(false);
    }

    const handleSelectCountry = (country: Country | undefined) => {
        setCountry(country);
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
                backgroundColor: country ? 'lightgrey' : 'white'
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
                            <CountriesDropdown argSelected={country} onSelect={handleSelectCountry}/>
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
                    </tbody>
                </table>
            </Modal>
        </>
    );
}