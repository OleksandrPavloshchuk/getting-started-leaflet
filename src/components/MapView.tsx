import React, {useEffect, useState} from "react";
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import {type Location} from "../data/locations.ts";
import L, {LatLng} from "leaflet";

import "../../public/leaflet-custom.css";
import {HotelDetailsPopup} from "./HotelDetailsPopup.tsx";

// Simple marker
const markerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

type Props = {
    selected: Location | undefined
};

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

export const MapView: React.FC<Props> = ({selected}) => {
    const defaultCenter = [49.0, 31.0];
    const [circlePopupPos, setCirclePopupPos] = useState<LatLng | undefined>(undefined);
    const [showCirclePopup, setShowCirclePopup] = useState(false);

    const radiusButton = (r: number) => {

        const str = r < 1000 ? `${r} m` : `${r / 1000} km`;
        // TODO calculate km


        return (<>
            <div
                className="radius-link"
                onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setCirclePopupPos(undefined);
                setShowCirclePopup(false);
            }}>{str}</div>
        </>);
    }

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

            {showCirclePopup && circlePopupPos && (
                <Popup position={circlePopupPos}
                       closeOnEscapeKey={true}
                       closeButton={true}>
                    <div style={{margin: "6px", textAlign: "center", padding: "em"}}>
                        <strong>Radius of selection:</strong>
                        <hr/>
                        {[500, 1000, 2000, 5000, 10000].map((r: number) => radiusButton(r))}
                        <hr/>
                        <div
                            className="radius-link"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setCirclePopupPos(undefined);
                                setShowCirclePopup(false);
                            }}
                        >Reset</div>
                    </div>

                </Popup>
            )}

            {selected &&
                <>
                    <Marker position={[selected.lat, selected.lng]} icon={markerIcon}>
                        <HotelDetailsPopup location={selected}/>
                    </Marker>
                    <Recenter lat={selected.lat} lng={selected.lng}/>
                </>
            }

        </MapContainer>
    );
};


