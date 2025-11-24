import React from "react";
import {Image} from "@mantine/core";
import {DescriptionDialog} from "./DescriptionDialog.tsx";
import {Popup} from "react-leaflet";
import {useWidgetStateModel} from "../model/WidgetStateModel.ts";

export const HotelDetailsPopup: React.FC = () => {
    const selectedLocation = useWidgetStateModel((s) => s.selectedLocation);
    if (!selectedLocation) {
        return null;
    }

    return (<Popup closeOnEscapeKey={true}>
        <p style={{textAlign: 'center'}}>
            <strong>{selectedLocation.name}</strong><br/>
            {selectedLocation.thumbnail &&
                <>
                    <a target="_blank" href={selectedLocation.thumbnail}>
                        <Image src={selectedLocation.thumbnail}
                               style={{boxShadow: "0 2px 2px rgba(0, 0, 0, 0.4)", border: 0}}
                               width={200} height={150} radius="md"/>
                    </a>
                    <br/>
                </>
            }
            {selectedLocation.address && <>{selectedLocation.address}<br/></>}
            {selectedLocation.isShowStars() && <>{selectedLocation.getStarsString()}<br/></>}
            {selectedLocation.description && <DescriptionDialog/>}
        </p>
    </Popup>);
};

