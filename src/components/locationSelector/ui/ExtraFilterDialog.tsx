import {useState} from "react";
import {ActionIcon, Modal} from "@mantine/core";
import {CountriesDropdown} from "./CountriesDropdown.tsx";
import {IconCancel, IconCheck, IconFilterSearch} from "@tabler/icons-react";
import {TypesSelector} from "./TypesSelector.tsx";
import {useLocationStore} from "../model/LocationStore.ts";

export const ExtraFilterDialog: React.FC = () => {

    const [opened, setOpened] = useState(false);

    const country = useLocationStore((s)=>s.country);
    const setCountry = useLocationStore((s)=> s.setCountry);
    const hotelTypeIds = useLocationStore((s)=>s.hotelTypeIds);
    const setHotelTypeIds = useLocationStore((s) => s.setHotelTypeIds);

    const handleSet = () => setOpened(false);

    const handleClear = () => {
        setCountry(undefined);
        setHotelTypeIds([]);
        setOpened(false);
    }

    const isOn = () => country || hotelTypeIds.length > 0;

    return (
        <>
            <ActionIcon
                onClick={() => setOpened(true)}
                variant="white"
                size="lg"
                style={{
                    backgroundColor: isOn() ? 'lightgrey' : 'white'
                }}
                title={`Extra Filter: ${isOn() ? 'ON' : 'OFF'}`}>
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
                        <td style={{width: '100%'}}>
                            <CountriesDropdown />
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
                            <TypesSelector />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </Modal>
        </>
    );
}