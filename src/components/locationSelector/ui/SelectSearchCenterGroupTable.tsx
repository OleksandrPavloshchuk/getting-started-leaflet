import {retrievePersonalSearchCenterGroups} from "../service/RetrievePersonalSearchCenterGroups.ts";
import React, {useEffect} from "react";
import {useWidgetStateModel} from "../model/WidgetStateModel.ts";
import {useEditPersonalSearchCenterGroupModel} from "../model/EditPersonalSearchCenterGroupModel.ts";
import {Table} from "@mantine/core";

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

    return (<Table>
        <Table.Thead>
            <Table.Tr>
                <Table.Td>
                    <strong>Name</strong>
                </Table.Td>
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
        {
            result.map((searchCenterGroup) => (
                <Table.Tr key={searchCenterGroup.id}>
                    <Table.Td>
                        <a href="#"
                           className="search-center-link"
                           onClick={() => {
                               setName(searchCenterGroup.name);
                               setId(searchCenterGroup.id);
                               setEditPersonalSearchCenterGroupOpened(true);
                           }}
                        >{searchCenterGroup.name}</a>
                    </Table.Td>
                </Table.Tr>
            ))
        }
        </Table.Tbody>
    </Table>);
}