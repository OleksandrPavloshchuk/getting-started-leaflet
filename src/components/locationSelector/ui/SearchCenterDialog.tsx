import {Accordion, ActionIcon, Box, CloseIcon, Modal, Tabs} from "@mantine/core";
import {useWidgetStateModel} from "../model/WidgetStateModel.ts";
import {retrieveSearchCenters} from "../service/RetrieveSearchCenters.ts";
import React, {useCallback, useEffect, useMemo} from "react";
import type {SearchCenter} from "../model/SearchCenter.ts";
import {useLocationFilterModel} from "../model/LocationFilterModel.ts";
import L from "leaflet";
import {useMap} from "react-leaflet";
import {getCountryData} from "../static/countries.ts";
import {updateSearchCenters} from "../service/UpdateSearchCenter.ts";
import {getDialogStyles, notifyError, notifyWarning} from "../utils/utils.ts";

export const SearchCenterDialog: React.FC = () => {

    const setCenter = useLocationFilterModel((s) => s.setCenter);
    const setRadius = useLocationFilterModel((s) => s.setRadius);
    const searchCenterDialogOpened = useWidgetStateModel((s) => s.searchCenterDialogOpened);
    const setSearchCenterDialogOpened = useWidgetStateModel((s) => s.setSearchCenterDialogOpened);
    const setSelectRadiusPopuoOpened = useWidgetStateModel((s) => s.setSelectRadiusPopupOpened);
    const setCityAndName = useLocationFilterModel((s) => s.setCityAndName);
    const setSelectedLocation = useWidgetStateModel((s) => s.setSelectedLocation);

    const retrieve = retrieveSearchCenters.useModel((s) => s.call);
    const result = retrieveSearchCenters.useModel((s) => s.result);

    useEffect(() => {
        if (searchCenterDialogOpened) {
            retrieve();
        }
    }, [searchCenterDialogOpened]);

    // TODO custom group names
    const groupByCities = (src: SearchCenter[]) => {
        const accordionKey =
            (item: SearchCenter) => `${getCountryData(item.country)?.flag} ${item.city}`;

        return src.reduce((acc, item) => {
            const key = accordionKey(item);
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(item);
            return acc;
        }, {} as Record<string, typeof result>);
    }

    const tabData = (type: string) => {
        const arr = result.filter((item: SearchCenter) => item.type == type);
        return groupByCities(arr);
    }

    const groupedResult = useMemo(() => {
        const r = {COMMON: {}, PERSONAL: {}};
        r.COMMON = tabData('COMMON');
        r.PERSONAL = tabData('PERSONAL');
        return r;
    }, [result]);

    const map = useMap();

    const openSelectLocationPopup = useCallback((item: SearchCenter) => {
        setSearchCenterDialogOpened(false);

        const center = new L.LatLng(item.latitude, item.longitude);
        setCenter(center);

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

    const createTabPanelForType = (type: string, data: Record<string, typeof result>) => (
        <Tabs.Panel value={type} pt="sm">
            <Accordion multiple={false}>
                {
                    Object.entries(data).map(([group, items]) => (
                        <Accordion.Item key={group} value={group}>
                            <Accordion.Control style={{fontSize: "10pt"}}>{group}</Accordion.Control>
                            <Accordion.Panel>
                                {items
                                    .map((item) => (
                                        <div key={item.getKey()}>
                                            <a href="#"
                                               className="search-center-link"
                                               onClick={() => openSelectLocationPopup(item)}
                                            >{item.name}</a>
                                            {item.type === 'PERSONAL' && <>
                                                &nbsp;
                                                <ActionIcon
                                                    onClick={() => onDeleteSearchCenter(item)}
                                                    variant="light"
                                                    size="xs"
                                                    title="Delete search center">
                                                    <CloseIcon/>
                                                </ActionIcon>
                                            </>
                                            }
                                        </div>
                                    ))}
                            </Accordion.Panel>
                        </Accordion.Item>
                    ))
                }
            </Accordion>
        </Tabs.Panel>
    );

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
                <Tabs defaultValue="COMMON" keepMounted={false}
                      styles={{
                          tab: {fontSize: "10pt"}
                      }}
                >
                    <Tabs.List>
                        <Tabs.Tab value="COMMON">Common</Tabs.Tab>
                        <Tabs.Tab value="PERSONAL">Personal</Tabs.Tab>
                    </Tabs.List>
                    {
                        createTabPanelForType("COMMON", groupedResult.COMMON)
                    }
                    {
                        createTabPanelForType("PERSONAL", groupedResult.PERSONAL)
                    }
                </Tabs>
            </Box>
        </Modal>
    );
}