import {Popup} from "react-leaflet";
import React from "react";
import {getRadiusStr} from "../utils/utils.ts";
import {useLocationFilterModel} from "../model/LocationFilterModel.ts";
import {useWidgetStateModel} from "../model/WidgetStateModel.ts";

export const SelectRadiusPopup: React.FC = () => {
    const setRadius = useLocationFilterModel((s) => s.setRadius);
    const center = useLocationFilterModel((s) => s.center);
    const setCenter = useLocationFilterModel((s) => s.setCenter);
    const setSelectRadiusPopupOpened = useWidgetStateModel((s) => s.setSelectRadiusPopupOpened);
    const setCreatePersonalSearchCenterOpened = useWidgetStateModel((s)=>s.setCreatePersonalSearchCenterOpened);

    const radiusLink = (r: number) => {
        return (
            <div key={r}
                 className="radius-link"
                 onClick={(e) => {
                     e.stopPropagation();
                     e.preventDefault();
                     setRadius(r);
                     setSelectRadiusPopupOpened(false);
                 }}>{getRadiusStr(r)}</div>);
    };

    return (<Popup position={center} closeOnEscapeKey={true} closeButton={true}>
        <div style={{textAlign: 'center'}}>
            <div
                className="radius-link"
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();

                    // TODO save personal search center to database


                    setCreatePersonalSearchCenterOpened(true);
                }}
            >Create a personal search center
            </div>
            <hr/>
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
                    setSelectRadiusPopupOpened(false);
                }}
            >Reset
            </div>
        </div>
    </Popup>);
}