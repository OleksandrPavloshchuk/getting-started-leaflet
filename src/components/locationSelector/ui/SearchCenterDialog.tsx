import {Box, Modal, Tabs} from "@mantine/core";
import {useWidgetStateModel} from "../model/WidgetStateModel.ts";

export const SearchCenterDialog: React.FC = () => {

    const searchCenterDialogOpened = useWidgetStateModel((s) => s.searchCenterDialogOpened);
    const setSearchCenterDialogOpened = useWidgetStateModel((s) => s.setSearchCenterDialogOpened);

    return (
        <Modal
            title="Search Center"
            trapFocus={false}
            zIndex={8000}
            opened={searchCenterDialogOpened}
            onClose={() => setSearchCenterDialogOpened(false)}
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
            <Box maw={720} mx="auto" mt="md">
                <Tabs defaultValue="COMMON" keepMounted={false}>
                    <Tabs.List>
                        <Tabs.Tab value="COMMON">Common</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="COMMON" pt="sm">
                        <a href="#">one</a><br/>
                        <a href="#">one</a><br/>
                        <a href="#">one</a><br/>
                    </Tabs.Panel>
                </Tabs>
            </Box>
        </Modal>
    );
}