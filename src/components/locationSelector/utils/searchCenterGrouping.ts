/**
 * DBMS returns flat array of SearchCenter records.
 * This script groups them by their groups and by cities inside groups.
 */
import type {SearchCenter} from "../model/SearchCenter.ts";
import {getCountryData} from "../static/countries.ts";

const groupByCities = (src: SearchCenter[]) => {
    const key =
        (item: SearchCenter) => `${getCountryData(item.country)?.flag} ${item.city}`;

    const result = new Map<string, SearchCenter[]>();
    src.forEach((item => {
        const mapKey = key(item);
        if (!result.has(mapKey)) {
            result.set(mapKey, []);
        }
        result.get(mapKey)?.push(item);
    }));
    return result;
}

const groupForSearchGroup = (src: SearchCenter[], groupId: string) =>
    groupByCities(src.filter((item) => item.group_id === groupId));

const getGroupIdNameMap = (src: SearchCenter[]) => {
    const result = new Map<string, string>();
    src.forEach((item) => {
        result.set(item.group_id, item.group_name);
    });
    return result;
}

export const groupByGroupsAndCities = (src: SearchCenter[]) => {
    const groupMap = getGroupIdNameMap(src);
    const result = new Map<string, Map<string, SearchCenter[]>>();
    groupMap.forEach((value, key) => {
        result.set(value, groupForSearchGroup(src, key));
    });
    return result;
}