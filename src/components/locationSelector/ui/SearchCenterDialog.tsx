import {Box, Modal, Tabs} from "@mantine/core";
import {useWidgetStateModel} from "../model/WidgetStateModel.ts";
import {retrieveSearchCenters} from "../service/RetrieveSearchCenters.ts";
import {useEffect} from "react";

export const SearchCenterDialog: React.FC = () => {

    const searchCenterDialogOpened = useWidgetStateModel((s) => s.searchCenterDialogOpened);
    const setSearchCenterDialogOpened = useWidgetStateModel((s) => s.setSearchCenterDialogOpened);

    const retrieve = retrieveSearchCenters.useModel((s) => s.call);
    const result = retrieveSearchCenters.useModel((s) => s.result);

    useEffect(() => {
        if (searchCenterDialogOpened) {
            retrieve();
        }
    }, [searchCenterDialogOpened]);

    return (
        <Modal
            title="Search Centers"
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
                    fontSize: "10pt",
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
                        <Box>
                            {
                                result.filter((item) => item.type=='COMMON')
                                    .map((item) => (
                                        <div key={`${item.city}+${item.name}`}>
                                            <a href="#">{`${item.city} - ${item.name}`}</a>
                                        </div>
                                    ))
                            }
                        </Box>
                    </Tabs.Panel>
                </Tabs>
            </Box>
        </Modal>
    );
}