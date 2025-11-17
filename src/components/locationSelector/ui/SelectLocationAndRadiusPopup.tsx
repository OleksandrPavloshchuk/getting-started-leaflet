import {Popup} from "react-leaflet";
import React from "react";
import {useLocationStore} from "../model/LocationStore.ts";
import {getRadiusStr} from "../utils/utils.ts";

type Props = {
    setShow: (show: boolean) => void
};

export const SelectLocationAndRadiusPopup: React.FC<Props> = ({setShow}) => {
    const setSearchRadius = useLocationStore((s) => s.setSearchRadius);
    const searchCenter = useLocationStore((s) => s.searchCenter);
    const setSearchCenter = useLocationStore((s) => s.setSearchCenter);

    const radiusLink = (r: number) => {
        return (
            <div key={r}
                 className="radius-link"
                 onClick={(e) => {
                     e.stopPropagation();
                     e.preventDefault();
                     setSearchRadius(r);
                     setShow(false);
                 }}>{getRadiusStr(r)}</div>);
    };

    return (<Popup position={searchCenter} closeOnEscapeKey={true} closeButton={true}>
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
                    setSearchRadius(undefined);
                    setSearchCenter(undefined);
                    setShow(false);
                }}
            >Reset
            </div>
        </div>
    </Popup>);
}