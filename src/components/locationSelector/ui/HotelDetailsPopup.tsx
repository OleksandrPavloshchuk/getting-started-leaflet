import React from "react";
import {Image} from "@mantine/core";
import {DescriptionDialog} from "./DescriptionDialog.tsx";
import {Popup} from "react-leaflet";
import {useLocationStore} from "../model/LocationStore.ts";

export const HotelDetailsPopup: React.FC = () => {
    const selectedLocation = useLocationStore((s) => s.selectedLocation);
    if (!selectedLocation) {
        return null;
    }

    return (<Popup closeOnEscapeKey={true}>
        <p style={{textAlign: 'center'}}>
            <strong>{selectedLocation.name}</strong><br/>
            {selectedLocation.thumbnail &&
                <>
                    <Image src={selectedLocation.thumbnail}
                           style={{boxShadow: "0 2px 2px rgba(0, 0, 0, 0.4)"}}
                           width={200} height={150} radius="md"/>
                    <br/>
                </>
            }
            {selectedLocation.address && <>{selectedLocation.address}<br/></>}
            {selectedLocation.isShowStars() && <>{selectedLocation.getStarsString()}<br/></>}
            {selectedLocation.description && <DescriptionDialog/> }
        </p>
    </Popup>);
};

