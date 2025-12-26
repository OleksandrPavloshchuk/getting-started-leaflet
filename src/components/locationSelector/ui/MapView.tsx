import React, {useEffect} from "react";
import {MapContainer, Marker, TileLayer, Circle, useMap, useMapEvents, ScaleControl} from "react-leaflet";
import L, {LatLng} from "leaflet";

import "../../../../public/leaflet-custom.css";
import {HotelDetailsPopup} from "./HotelDetailsPopup.tsx";
import {SelectRadiusPopup} from "./SelectRadiusPopup.tsx";
import {useWidgetStateModel} from "../model/WidgetStateModel.ts";
import {MapHint} from "./MapHint.tsx";
import {useLocationFilterModel} from "../model/LocationFilterModel.ts";
import {SearchCenterDialog} from "./SearchCenterDialog.tsx";
import {CreatePersonalSearchCenterDialog} from "./CreatePersonalSearchCenterDialog.tsx";
import {SEARCH_CENTER_COLOR} from "../utils/utils.ts";
import {SearchCenterDetailsPopup} from "./SearchCenterDetailsPopup.tsx";

// Markers
const markerSelected = new L.Icon({
    iconUrl: '../../../../public/marker-selected.svg',
    shadowUrl: '../../../../public/shadow.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
const markerSearchCenter = new L.Icon({
    iconUrl: '../../../../public/marker-search-center.svg',
    shadowUrl: '../../../../public/shadow.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

// Listener to clicking on the map
const MapClickHandler: React.FC<{ onClickPoint: (pos: LatLng) => void }> = ({onClickPoint}) => {

    useMapEvents(
        {
            click(e) {
                onClickPoint(e.latlng);
            }
        }
    );

    return null;
}

/**
 * Component for showing of the map, pointer, search circle and helper dialog
 *
 * @constructor
 */
export const MapView: React.FC = () => {
    const defaultCenter = [49.0, 31.0];

    const selectedLocation = useWidgetStateModel((s) => s.selectedLocation);

    const radius = useLocationFilterModel((s) => s.radius);
    const center = useLocationFilterModel((s) => s.center);
    const setCenter = useLocationFilterModel((s) => s.setCenter);
    const setSelectedLocation = useWidgetStateModel((s) => s.setSelectedLocation);
    const setCenterName = useLocationFilterModel((s) => s.setCenterName);
    const selectRadiusPopupOpened = useWidgetStateModel((s) => s.selectRadiusPopupOpened);
    const setSelectRadiusPopupOpened = useWidgetStateModel((s) => s.setSelectRadiusPopupOpened);

    // Helper component for map recentering
    const Recenter: React.FC<{ lat: number, lng: number }> = ({lat, lng}) => {
        const map = useMap();
        useEffect(() => {
            map.setView([lat, lng], 13);
        }, [lat, lng, map]);
        return null;
    };

    return (
        <MapContainer
            center={defaultCenter as [number, number]}
            zoom={6}
            style={{width: 900, height: 720, borderRadius: 6}}

        >
            <ScaleControl/>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"

            />
            <MapClickHandler onClickPoint={(point: LatLng) => {
                setCenter(point);
                setCenterName(undefined);
                setSelectedLocation(undefined);
                setSelectRadiusPopupOpened(true);
            }}/>

            {selectRadiusPopupOpened && center &&
                <>
                    <SelectRadiusPopup/>
                    <Recenter lat={center.lat} lng={center.lng}/>
                </>
            }

            {center && radius && radius > 0 &&
                <>
                    <Circle
                        center={[center.lat, center.lng]}
                        radius={radius}
                        pathOptions={{
                            color: SEARCH_CENTER_COLOR,
                            weight: 1,
                            fillColor: SEARCH_CENTER_COLOR,
                            fillOpacity: 0.15,
                        }}
                    />
                    <Marker position={[center.lat, center.lng]} icon={markerSearchCenter}>
                        <SearchCenterDetailsPopup/>
                    </Marker>
                </>
            }

            {selectedLocation &&
                <>
                    <Marker position={[selectedLocation.lat, selectedLocation.lng]} icon={markerSelected}>
                        <HotelDetailsPopup/>
                    </Marker>
                    <Recenter lat={selectedLocation.lat} lng={selectedLocation.lng}/>
                </>
            }
            <MapHint timeout={5000} text="Left-click the map to set search center"/>
            <SearchCenterDialog/>
            <CreatePersonalSearchCenterDialog/>
        </MapContainer>
    );
};


