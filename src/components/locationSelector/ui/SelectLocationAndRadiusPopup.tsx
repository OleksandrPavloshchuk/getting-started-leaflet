import {Popup} from "react-leaflet";
import React from "react";

type Props = {
    position: L.LatLng
    setPosition: (pos: L.LatLng | undefined) => void,
    setShow: (show: boolean) => void
};

export const SelectLocationAndRadiusPopup: React.FC<Props> = ({position, setPosition, setShow}) => {
    const radiusButton = (r: number) => {
        const str = r < 1000 ? `${r} m` : `${r / 1000} km`;
        // TODO set the radius
        return (
            <div key={r}
                 className="radius-link"
                 onClick={(e) => {
                     e.stopPropagation();
                     e.preventDefault();
                     setPosition(undefined);
                     setShow(false);
                 }}>{str}</div>);
    };

    return (<Popup position={position} closeOnEscapeKey={true} closeButton={true}>
        <div style={{textAlign: 'center'}}>
            <strong>Radius of selection:</strong>
            <hr/>
            {[500, 1000, 2000, 5000, 10000].map((r: number) => radiusButton(r))}
            <hr/>
            <div
                className="radius-link"
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setPosition(undefined);
                    setShow(false);
                }}
            >Reset
            </div>
        </div>
    </Popup>);
}