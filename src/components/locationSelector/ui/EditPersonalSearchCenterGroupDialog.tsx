import {Box, Button, Flex, Modal, TextInput} from "@mantine/core";
import {useWidgetStateModel} from "../model/WidgetStateModel.ts";
import {useState} from "react";
import {getDialogStyles, notifyError, notifySuccess} from "../utils/utils.ts";
import {useEditPersonalSearchCenterGroupModel} from "../model/EditPersonalSearchCenterGroupModel.ts";
import {SearchCenterGroup} from "../model/SearchCenterGroup.ts";
import {updateSearchCenterGroups} from "../service/UpdateSearchCenterGroup.ts";

export const EditPersonalSearchCenterGroupDialog: React.FC = () => {

    const editPersonalSearchCenterGroupOpened = useWidgetStateModel((s) => s.editPersonalSearchCenterGroupOpened);
    const setEditPersonalSearchCenterGroupOpened = useWidgetStateModel((s) => s.setEditPersonalSearchCenterGroupOpened);

    const refreshSearchCenterGroupsKey = useWidgetStateModel((s) => s.refreshSearchCenterGroupsKey);
    const setRefreshSearchCenterGroupsKey = useWidgetStateModel((s) => s.setRefreshSearchCenterGroupsKey);

    const name = useEditPersonalSearchCenterGroupModel((s) => s.name);
    const setName = useEditPersonalSearchCenterGroupModel((s) => s.setName);
    const id = useEditPersonalSearchCenterGroupModel((s) => s.id);

    const [submitted, setSubmitted] = useState(false);

    const nameValid = () => name.trim().length > 0;

    const showSuccess = (s: string) => notifySuccess("Search Center Group", s);
    const showError = (s: string) => notifyError("Search Center Group", s);

    const onSave = () => {
        setSubmitted(true);
        if (nameValid()) {
            const newSearchCenterGroup = new SearchCenterGroup();
            newSearchCenterGroup.name = name;

            if (id) {
                newSearchCenterGroup.id = id;
                updateSearchCenterGroups.update(newSearchCenterGroup, showSuccess, showError);
            } else {
                updateSearchCenterGroups.create(newSearchCenterGroup, showSuccess, showError);
            }
            setName("");
            setSubmitted(false);
            setEditPersonalSearchCenterGroupOpened(false);
            // Refresh:
            setRefreshSearchCenterGroupsKey(refreshSearchCenterGroupsKey + 1);
        }
    };

    const onDelete = () => {
        const newSearchCenterGroup = new SearchCenterGroup();
        newSearchCenterGroup.id = id;
        newSearchCenterGroup.name = name;
        updateSearchCenterGroups.remove(newSearchCenterGroup, showSuccess, showError);
        setName("");
        setSubmitted(false);
        setEditPersonalSearchCenterGroupOpened(false);
        // Refresh:
        setRefreshSearchCenterGroupsKey(refreshSearchCenterGroupsKey + 1);
    }

    return (
        <Modal
            title="Personal Search Center Group"
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
                    {id &&
                        <Button onClick={onDelete}>Delete</Button>
                    }
                </Flex>
            </Box>
        </Modal>
    );
}