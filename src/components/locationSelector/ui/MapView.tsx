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

// Simple marker
const markerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
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
            style={{width: 800, height: 640, borderRadius: 6}}

        >
            <ScaleControl/>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"

            />
            <MapClickHandler onClickPoint={(point: LatLng) => {
                setCenter(point);
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
                            color: 'var(--mantine-color-blue-filled)',
                            weight: 1,
                            fillColor: 'var(--mantine-color-blue-filled)',
                            fillOpacity: 0.15,
                        }}
                    />
                    <Circle
                        center={[center.lat, center.lng]}
                        radius={50}
                        pathOptions={{
                            color: 'var(--mantine-color-blue-filled)',
                            weight: 1,
                            fillColor: 'var(--mantine-color-blue-filled)',
                            fillOpacity: 0.8,
                        }}
                    />
                </>
            }

            {selectedLocation &&
                <>
                    <Marker position={[selectedLocation.lat, selectedLocation.lng]} icon={markerIcon}>
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


