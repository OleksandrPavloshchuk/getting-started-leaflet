import {ActionIcon, Modal} from "@mantine/core";
import {CountriesDropdown} from "./CountriesDropdown.tsx";
import {IconCancel, IconCheck} from "@tabler/icons-react";
import {TypesSelector} from "./TypesSelector.tsx";
import {useLocationStore} from "../model/LocationStore.ts";

export const ExtraFilterDialog: React.FC = () => {

    const setCountry = useLocationStore((s) => s.setCountry);
    const setHotelTypeIds = useLocationStore((s) => s.setHotelTypeIds);
    const extraFilterDialogOpened = useLocationStore((s) => s.extraFilterDialogOpened);
    const setExtraFilterDialogOpened = useLocationStore((s) => s.setExtraFilterDialogOpened);

    const handleSet = () => setExtraFilterDialogOpened(false);

    const handleClear = () => {
        setCountry(undefined);
        setHotelTypeIds([]);
        setExtraFilterDialogOpened(false);
    }

    return (
        <Modal
            title="Extra Filter"
            trapFocus={false}
            zIndex={8000}
            opened={extraFilterDialogOpened}
            onClose={() => setExtraFilterDialogOpened(false)}
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
                        <CountriesDropdown/>
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
                        <TypesSelector/>
                    </td>
                </tr>
                </tbody>
            </table>
        </Modal>
    );
}