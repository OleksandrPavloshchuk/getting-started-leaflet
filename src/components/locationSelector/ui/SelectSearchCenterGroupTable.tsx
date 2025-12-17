import {retrievePersonalSearchCenterGroups} from "../service/RetrievePersonalSearchCenterGroups.ts";
import {useEffect} from "react";
import {useWidgetStateModel} from "../model/WidgetStateModel.ts";


export const SelectSearchCenterGroupTable: React.FC = () => {

    const refreshSearchCenterGroupsKey = useWidgetStateModel((s) => s.refreshSearchCenterGroupsKey);

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
            <th>Name</th>
        </tr>
        </thead>
        <tbody>
        {
            result.map( (searchCenterGroup) => (
                <tr>
                    <td>{searchCenterGroup.name}</td>
                </tr>
            ))
        }
        </tbody>
    </table>
}