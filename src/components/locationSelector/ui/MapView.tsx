import React, {useEffect, useState} from "react";
import {MapContainer, Marker, TileLayer, useMap, useMapEvents} from "react-leaflet";
import L, {LatLng} from "leaflet";

import "../../../../public/leaflet-custom.css";
import {HotelDetailsPopup} from "./HotelDetailsPopup.tsx";
import {SelectLocationAndRadiusPopup} from "./SelectLocationAndRadiusPopup.tsx";
import {useLocationStore} from "../model/LocationStore.ts";

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

    const [circlePopupPos, setCirclePopupPos] = useState<LatLng | undefined>(undefined);
    const [showCirclePopup, setShowCirclePopup] = useState(false);

    return (
        <MapContainer
            center={defaultCenter as [number, number]}
            zoom={6}
            style={{width: 800, height: 640, borderRadius: 6}}

        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            <MapClickHandler onClickPoint={(point: LatLng) => {
                setCirclePopupPos(point);
                setShowCirclePopup(true);
            }}/>

            {showCirclePopup && circlePopupPos &&
                <>
                    <SelectLocationAndRadiusPopup
                        position={circlePopupPos} setPosition={setCirclePopupPos}
                        setShow={setShowCirclePopup}/>
                    <Recenter lat={circlePopupPos.lat} lng={circlePopupPos.lng}/>
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

        </MapContainer>
    );
};


