import {Button} from "@mantine/core";
import {useWidgetStateModel} from "../components/locationSelector/model/WidgetStateModel.ts";
import {
    EditPersonalSearchCenterGroupDialog
} from "../components/locationSelector/ui/EditPersonalSearchCenterGroupDialog.tsx";

export const PersonalSearchCenterGroupsPage = () => {

    const setEditPersonalSearchCenterGroupOpened = useWidgetStateModel((s) => s.setEditPersonalSearchCenterGroupOpened);

    return <>
        <Button
            onClick={() => setEditPersonalSearchCenterGroupOpened(true)}
        >New Personal Search Center Group</Button>

        <div style={{backgroundColor: 'lightblue'}}>
            TODO select personal search center groups page
        </div>
        <EditPersonalSearchCenterGroupDialog/>
    </>;
}