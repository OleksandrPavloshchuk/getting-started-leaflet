import React, {useEffect} from "react";
import {MapContainer, TileLayer, Marker, Popup, useMap} from "react-leaflet";
import type {Location} from "../data/locations.ts";
import L from "leaflet";

// Simple marker
const markerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

type Props = {selected : Location | undefined};

// Helper component for map recentering
const Recenter : React.FC<{lat: number, lng:number}> = ({lat, lng}) => {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lng], 13);
    }, [lat, lng, map]);
    return null;
};

export const MapView : React.FC<Props> = ({selected}) => {
    const defaultCenter = [49.0, 31.0];

    return (
        <MapContainer
            center = {defaultCenter as [number, number]}
            zoom = {6}
            style={{ width: 800, height: 640, borderRadius: 6 }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            {selected &&
                <>
                    <Marker position={[selected.lat, selected.lng]} icon={markerIcon}>
                        <Popup>{selected.name}</Popup>
                    </Marker>
                    <Recenter lat={selected.lat} lng={selected.lng} />
                </>
            }

        </MapContainer>
    );
};


