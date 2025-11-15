import React from "react";
import {Image} from "@mantine/core";
import {getStarsString, type Location} from "../data/locations.ts";
import {DescriptionDialog} from "./DescriptionDialog.tsx";
import {Popup} from "react-leaflet";

type Props = {
    location: Location
}

export const HotelDetailsPopup: React.FC<Props> = ({location}) => <Popup closeOnEscapeKey={true} >
    <p style={{textAlign: 'center'}}>
        <strong>{location.name}</strong><br/>
        {location.thumbnail &&
            <>
                <Image src={location.thumbnail}
                       style={{boxShadow: "0 2px 2px rgba(0, 0, 0, 0.4)"}}
                       width={200} height={150} radius="md"/>
                <br/>
            </>
        }
        {location.address &&
            <>{location.address}<br/></>
        }
        {location.stars >= 1 && <>{getStarsString(location.stars)}<br/></>}
        {location.description &&
            <DescriptionDialog location={location}/>
        }
    </p>
</Popup>;

