import {Box, Button, Flex, Modal, TextInput} from "@mantine/core";
import {useWidgetStateModel} from "../model/WidgetStateModel.ts";
import {useState} from "react";
import {getDialogStyles} from "../utils/utils.ts";
import {useEditPersonalSearchCenterGroupModel} from "../model/EditPersonalSearchCenterGroupModel.ts";
import {SearchCenterGroup} from "../model/SearchCenterGroup.ts";

export const EditPersonalSearchCenterGroupDialog: React.FC = () => {

    const editPersonalSearchCenterGroupOpened = useWidgetStateModel((s) => s.editPersonalSearchCenterGroupOpened);
    const setEditPersonalSearchCenterGroupOpened = useWidgetStateModel((s) => s.setEditPersonalSearchCenterGroupOpened);

    const name = useEditPersonalSearchCenterGroupModel((s) => s.name);
    const setName = useEditPersonalSearchCenterGroupModel((s) => s.setName);

    const [submitted, setSubmitted] = useState(false);

    const nameValid = () => name.trim().length>0;

    //const showSuccess  = (s: string)=> notifySuccess("Search Center Group", s);
    //const showError = (s:string)=> notifyError("Search Center Group", s);

    const onSave = () => {
        setSubmitted(true);
        if (nameValid()) {
            const newSearchCenterGroup = new SearchCenterGroup();
            newSearchCenterGroup.name = name;

            // TODO write the save
            // updateSearchCenters.create(newSearchCenter, showSuccess, showError);
            setName("");
            setSubmitted(false);
        }
    };

    return (
        <Modal
            title="Create Personal Search Center"
            trapFocus={false}
            zIndex={8000}
            opened={editPersonalSearchCenterGroupOpened}
            onClose={() => setEditPersonalSearchCenterGroupOpened(false)}
            withinPortal={true}
            styles={getDialogStyles('20%')}
        >
            <Box maw={720} mx="auto" mt="md">
                <table width="100%">
                    <tbody>
                    <tr>
                        <td>Name:</td>
                        <td>
                            <TextInput
                                value={name}
                                onChange={(e) => setName(e.currentTarget.value)}
                                error={submitted && !nameValid() ? 'Name is not defined' : null}
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
                <Flex w="100%" gap="sm">
                    <Button onClick={onSave}>Save</Button>
                </Flex>
            </Box>
        </Modal>
    );
}