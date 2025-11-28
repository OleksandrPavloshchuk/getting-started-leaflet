import {Box, Modal} from "@mantine/core";
import {useWidgetStateModel} from "../model/WidgetStateModel.ts";

export const CreatePersonalSearchCenterDialog: React.FC = () => {

    const createPersonalSearchCenterOpened = useWidgetStateModel((s) => s.createPersonalSearchCenterOpened);
    const setCreatePersonalSearchCenterOpened = useWidgetStateModel((s) => s.setCreatePersonalSearchCenterOpened);

    return (
        <Modal
            title="Create Personal Search Center"
            trapFocus={false}
            zIndex={8000}
            opened={createPersonalSearchCenterOpened}
            onClose={() => setCreatePersonalSearchCenterOpened(false)}
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
                TODO create this
            </Box>
        </Modal>
    );
}