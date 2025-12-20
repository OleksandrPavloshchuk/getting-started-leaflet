import {retrievePersonalSearchCenterGroups} from "../service/RetrievePersonalSearchCenterGroups.ts";
import React, {useEffect} from "react";
import {useWidgetStateModel} from "../model/WidgetStateModel.ts";
import {useEditPersonalSearchCenterGroupModel} from "../model/EditPersonalSearchCenterGroupModel.ts";

export const SelectSearchCenterGroupTable: React.FC = () => {

    const refreshSearchCenterGroupsKey = useWidgetStateModel((s) => s.refreshSearchCenterGroupsKey);
    const setEditPersonalSearchCenterGroupOpened = useWidgetStateModel((s) => s.setEditPersonalSearchCenterGroupOpened);

    const setName = useEditPersonalSearchCenterGroupModel((s) => s.setName);

    const setId = useEditPersonalSearchCenterGroupModel((s) => s.setId);

    const retrieve = retrievePersonalSearchCenterGroups.useModel((s) => s.call);
    const result = retrievePersonalSearchCenterGroups.useModel((s) => s.result);

    useEffect(() => {
        retrieve();
    }, []);
    useEffect(() => {
        retrieve();
    }, [refreshSearchCenterGroupsKey]);

    return <table width="100%">
        <thead>
        <tr>
            <td><strong>Name</strong></td>
        </tr>
        </thead>
        <tbody>
        {
            result.map((searchCenterGroup) => (
                <tr key={searchCenterGroup.id}>
                    <td>
                        <a href="#"
                           className="search-center-link"
                           onClick={() => {
                               setName(searchCenterGroup.name);
                               setId(searchCenterGroup.id);
                               setEditPersonalSearchCenterGroupOpened(true);
                           }}
                        >{searchCenterGroup.name}</a>
                    </td>
                </tr>
            ))
        }
        </tbody>
    </table>
}