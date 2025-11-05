import React, {useEffect} from "react";
import {MapContainer, TileLayer, Marker, Popup, useMap} from "react-leaflet";
import type {Location} from "../data/locations.ts";
import L from "leaflet";

import {DescriptionDialog} from "./DescriptionDialog.tsx";
import {Image} from "@mantine/core";

// Simple marker
const markerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

type Props = { selected: Location | undefined };

// Helper component for map recentering
const Recenter: React.FC<{ lat: number, lng: number }> = ({lat, lng}) => {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lng], 13);
    }, [lat, lng, map]);
    return null;
};

const getStarsString= (val:number) => {
    switch (Math.ceil(val)) {
        case 0:
            return "";
        case 1:
            return "⭐️";
        case 2:
            return "⭐️⭐️";
        case 3:
            return "⭐️⭐️⭐️";
        case 4:
            return "⭐️⭐️⭐️⭐️";
        case 5:
            return "⭐️⭐️⭐️⭐️⭐️";
        default:
            return "⭐️⭐️⭐️⭐️⭐️+";
    }
}

export const MapView: React.FC<Props> = ({selected}) => {
    const defaultCenter = [49.0, 31.0];

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
            {selected &&
                <>
                    <Marker position={[selected.lat, selected.lng]} icon={markerIcon}>
                        <Popup>
                            <p style={{textAlign: 'center'}}>
                                <strong>{selected.name}</strong><br/>
                                {selected.thumbnail &&
                                    <>
                                        <Image src={selected.thumbnail}
                                             width={200} height={150} radius="md" />
                                        <br/>
                                    </>
                                }
                                {selected.address &&
                                    <>{selected.address}<br/></>
                                }
                                {getStarsString(selected.stars)}<br/>
                                {selected.description &&
                                    <DescriptionDialog location={selected} />
                                }
                            </p>
                        </Popup>
                    </Marker>
                    <Recenter lat={selected.lat} lng={selected.lng}/>
                </>
            }

        </MapContainer>
    );
};


