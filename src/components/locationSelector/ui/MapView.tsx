import React, {useEffect, useState} from "react";
import {MapContainer, Marker, TileLayer, Circle, useMap, useMapEvents, ScaleControl} from "react-leaflet";
import L, {LatLng} from "leaflet";

import "../../../../public/leaflet-custom.css";
import {HotelDetailsPopup} from "./HotelDetailsPopup.tsx";
import {SelectLocationAndRadiusPopup} from "./SelectLocationAndRadiusPopup.tsx";
import {useLocationStore} from "../model/LocationStore.ts";
import {MapHint} from "./MapHint.tsx";

// Simple marker
const markerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

// Helper component for map recentering
const Recenter: React.FC<{ lat: number, lng: number }> = ({lat, lng}) => {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lng], 13);
    }, [lat, lng, map]);
    return null;
};

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

export const MapView: React.FC = () => {
    const defaultCenter = [49.0, 31.0];

    const selectedLocation = useLocationStore((s)=>s.selectedLocation);
    const searchRadius = useLocationStore((s) => s.searchRadius);
    const searchCenter = useLocationStore((s) => s.searchCenter);
    const setSearchCenter = useLocationStore((s) => s.setSearchCenter);
    const [showCirclePopup, setShowCirclePopup] = useState(false);

    return (
        <MapContainer
            center={defaultCenter as [number, number]}
            zoom={6}
            style={{width: 800, height: 640, borderRadius: 6}}

        >
            <ScaleControl />
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"

            />
            <MapClickHandler onClickPoint={(point: LatLng) => {
                setSearchCenter(point);
                setShowCirclePopup(true);
            }}/>

            {showCirclePopup && searchCenter &&
                <>
                    <SelectLocationAndRadiusPopup
                        setShow={setShowCirclePopup}/>
                    <Recenter lat={searchCenter.lat} lng={searchCenter.lng}/>
                </>
            }

            {searchCenter && searchRadius && searchRadius > 0 &&
            <Circle
                center={[searchCenter.lat, searchCenter.lng]}
                radius={searchRadius}
                pathOptions={{
                    color: 'var(--mantine-color-blue-filled)',
                    weight: 1,
                    fillColor: 'var(--mantine-color-blue-filled)',
                    fillOpacity: 0.15,
                }}
            />
            }

            {selectedLocation &&
                <>
                    <Marker position={[selectedLocation.lat, selectedLocation.lng]} icon={markerIcon}>
                        <HotelDetailsPopup/>
                    </Marker>
                    <Recenter lat={selectedLocation.lat} lng={selectedLocation.lng}/>
                </>
            }

            <MapHint timeout={5000} text="Left-click the map to set search center" />

        </MapContainer>
    );
};


