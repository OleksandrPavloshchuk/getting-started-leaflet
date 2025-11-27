import {Accordion, Box, Modal, Tabs} from "@mantine/core";
import {useWidgetStateModel} from "../model/WidgetStateModel.ts";
import {retrieveSearchCenters} from "../service/RetrieveSearchCenters.ts";
import {useEffect, useMemo} from "react";
import type {SearchCenter} from "../model/SearchCenter.ts";
import {useLocationFilterModel} from "../model/LocationFilterModel.ts";
import L from "leaflet";
import {useMap} from "react-leaflet";

export const SearchCenterDialog: React.FC = () => {

    const setCenter = useLocationFilterModel((s)=>s.setCenter);
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

    const centersByCities = useMemo(() => {
        return result.reduce((acc, item) => {
            if (!acc[item.city]) {
                acc[item.city] = [];
            }
            acc[item.city].push(item);
            return acc;
        }, {} as Record<string, typeof result>);
    }, [result]);

    const map = useMap();

    const openSelectLocationPopup = (item: SearchCenter)=> {
        setSearchCenterDialogOpened(false);
        let center = new L.LatLng(item.latitude, item.longitude);
        setCenter(center);
        setRadius(undefined);
        map.setView([item.latitude, item.longitude], 13);
        setCityAndName(`${item.city},`);
        setSelectedLocation(undefined);
        setSelectRadiusPopuoOpened(true);
    };

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
                        <Accordion multiple={false}>
                            {
                                Object.entries(centersByCities).map(([city, items]) => (
                                    <Accordion.Item key={city} value={city}>
                                        <Accordion.Control style={{fontSize: "10pt"}}>{city}</Accordion.Control>
                                        <Accordion.Panel>
                                            {items
                                                .filter((item) => item.type=='COMMON')
                                                .map((item) => (
                                                <div key={`${item.city}+${item.name}`}>
                                                    <a href="#"
                                                       className="search-center-link"
                                                       onClick={()=>openSelectLocationPopup(item)}
                                                    >{item.name}</a>
                                                </div>
                                            ))}
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                ))
                            }
                        </Accordion>
                    </Tabs.Panel>
                </Tabs>
            </Box>
        </Modal>
    );
}