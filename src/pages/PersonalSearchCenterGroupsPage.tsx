import {Button} from "@mantine/core";
import {useWidgetStateModel} from "../components/locationSelector/model/WidgetStateModel.ts";
import {
    EditPersonalSearchCenterGroupDialog
} from "../components/locationSelector/ui/EditPersonalSearchCenterGroupDialog.tsx";
import {SelectSearchCenterGroupTable} from "../components/locationSelector/ui/SelectSearchCenterGroupTable.tsx";

export const PersonalSearchCenterGroupsPage = () => {

    const refreshSearchCenterGroupsKey = useWidgetStateModel((s) => s.refreshSearchCenterGroupsKey);
    const setRefreshSearchCenterGroupsKey = useWidgetStateModel((s) => s.setRefreshSearchCenterGroupsKey);

    const setEditPersonalSearchCenterGroupOpened = useWidgetStateModel((s) => s.setEditPersonalSearchCenterGroupOpened);

    return <>
        <Button
            onClick={() => setEditPersonalSearchCenterGroupOpened(true)}
        >New Personal Search Center Group</Button>

        <Button
            onClick={() => setRefreshSearchCenterGroupsKey(refreshSearchCenterGroupsKey + 1)}
        >Refresh</Button>

        <SelectSearchCenterGroupTable/>
        <EditPersonalSearchCenterGroupDialog/>
    </>;
}