import {Accordion, ActionIcon, Box, CloseIcon, Modal, Tabs} from "@mantine/core";
import {useWidgetStateModel} from "../model/WidgetStateModel.ts";
import {retrieveSearchCenters} from "../service/RetrieveSearchCenters.ts";
import React, {useCallback, useEffect, useMemo} from "react";
import type {SearchCenter} from "../model/SearchCenter.ts";
import {useLocationFilterModel} from "../model/LocationFilterModel.ts";
import L from "leaflet";
import {useMap} from "react-leaflet";
import {updateSearchCenters} from "../service/UpdateSearchCenter.ts";
import {getDialogStyles, notifyError, notifyWarning} from "../utils/utils.ts";
import {groupByGroupsAndCities} from "../utils/searchCenterGrouping.ts";

export const SearchCenterDialog: React.FC = () => {

    const setCenter = useLocationFilterModel((s) => s.setCenter);
    const setCenterName = useLocationFilterModel((s) => s.setCenterName);
    const setRadius = useLocationFilterModel((s) => s.setRadius);
    const searchCenterDialogOpened = useWidgetStateModel((s) => s.searchCenterDialogOpened);
    const setSearchCenterDialogOpened = useWidgetStateModel((s) => s.setSearchCenterDialogOpened);
    const setSelectRadiusPopuoOpened = useWidgetStateModel((s) => s.setSelectRadiusPopupOpened);
    const setCityAndName = useLocationFilterModel((s) => s.setCityAndName);
    const setSelectedLocation = useWidgetStateModel((s) => s.setSelectedLocation);
    const setSelectedSearchCenterDetails = useWidgetStateModel((s) => s.setSelectedSearchCenterDetails);

    const retrieve = retrieveSearchCenters.useModel((s) => s.call);
    const result = retrieveSearchCenters.useModel((s) => s.result);

    useEffect(() => {
        if (searchCenterDialogOpened) {
            retrieve();
        }
    }, [searchCenterDialogOpened]);

    const groupedResult = useMemo(
        () => groupByGroupsAndCities(result),
        [result]);

    const map = useMap();

    const openSelectLocationPopup = useCallback((item: SearchCenter) => {
        setSelectedSearchCenterDetails(item);
        setSearchCenterDialogOpened(false);

        setCenter(new L.LatLng(item.latitude, item.longitude));
        setCenterName(item.name);

        setRadius(undefined);
        map.setView([item.latitude, item.longitude], 13);

        setCityAndName(`${item.city},`);
        setSelectedLocation(undefined);
        setSelectRadiusPopuoOpened(true);
    }, [
        map,
        setCenter,
        setRadius,
        setSearchCenterDialogOpened,
        setCityAndName,
        setSelectedLocation,
        setSelectRadiusPopuoOpened
    ]);

    const showWarning = (s: string) => notifyWarning("Search Centers", s);
    const showError = (s: string) => notifyError("Search Centers", s);

    const onDeleteSearchCenter = (item: SearchCenter) => {
        updateSearchCenters.remove(item, showWarning, showError);
        setSearchCenterDialogOpened(false);
    };

    const toSearchCenterControl = (c: SearchCenter) => <div key={c.getKey()}>
        <a href="#"
           className="search-center-link"
           onClick={() => openSelectLocationPopup(c)}
        >{c.name}</a>
        {!c.is_public && <>
            &nbsp;
            <ActionIcon
                onClick={() => onDeleteSearchCenter(c)}
                variant="light"
                size="xs"
                title="Delete search center">
                <CloseIcon/>
            </ActionIcon>
        </>
        }
    </div>;

    const createTabPanelForGroup = (group_name: string, data: Map<string, SearchCenter[]>) => (
        <Tabs.Panel key={group_name} value={group_name} pt="sm">
            <Accordion multiple={false}>
                {
                    Array.from(data).map(([group, items]) => (
                        <Accordion.Item key={group} value={group}>
                            <Accordion.Control style={{fontSize: "10pt"}}>{`${group} (${items.length})`}</Accordion.Control>
                            <Accordion.Panel>
                                {items.map((item) => toSearchCenterControl(item))}
                            </Accordion.Panel>
                        </Accordion.Item>
                    ))
                }
            </Accordion>
        </Tabs.Panel>
    );

    const getSize = (name: string) => {
        return result.filter( (item) => item.group_name==name).length;
    }

    return (
        <Modal
            title="Search Centers"
            trapFocus={false}
            zIndex={8000}
            opened={searchCenterDialogOpened}
            onClose={() => setSearchCenterDialogOpened(false)}
            withinPortal={true}
            styles={getDialogStyles()}
        >
            <Box maw={720} mx="auto" mt="md">
                <Tabs defaultValue="Common" keepMounted={false}
                      styles={{
                          tab: {fontSize: "10pt"}
                      }}
                >
                    <Tabs.List>
                        {
                            Array.from(groupedResult).map(([name]) =>
                                <Tabs.Tab key={name} value={name}>{name} ({getSize(name)})</Tabs.Tab>)
                        }
                    </Tabs.List>
                    {
                        Array.from(groupedResult).map(([name, value]) =>
                            createTabPanelForGroup(name, value)
                        )
                    }
                </Tabs>
            </Box>
        </Modal>
    );
}