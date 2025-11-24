import {Popup} from "react-leaflet";
import React from "react";
import {getRadiusStr} from "../utils/utils.ts";
import {useLocationFilterModel} from "../model/LocationFilterModel.ts";

type Props = {
    setShow: (show: boolean) => void
};

export const SelectLocationAndRadiusPopup: React.FC<Props> = ({setShow}) => {
    const setRadius = useLocationFilterModel((s) => s.setRadius);
    const center = useLocationFilterModel((s) => s.center);
    const setCenter = useLocationFilterModel((s) => s.setCenter);

    const radiusLink = (r: number) => {
        return (
            <div key={r}
                 className="radius-link"
                 onClick={(e) => {
                     e.stopPropagation();
                     e.preventDefault();
                     setRadius(r);
                     setShow(false);
                 }}>{getRadiusStr(r)}</div>);
    };

    return (<Popup position={center} closeOnEscapeKey={true} closeButton={true}>
        <div style={{textAlign: 'center'}}>
            <strong>Radius of selection:</strong>
            <hr/>
            {[500, 1000, 2000, 5000, 10000].map((r: number) => radiusLink(r))}
            <hr/>
            <div
                className="radius-link"
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setRadius(undefined);
                    setCenter(undefined);
                    setShow(false);
                }}
            >Reset
            </div>
        </div>
    </Popup>);
}