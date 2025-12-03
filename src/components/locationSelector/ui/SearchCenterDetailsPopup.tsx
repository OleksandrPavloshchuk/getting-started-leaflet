import React from "react";
import {Popup} from "react-leaflet";
import {useLocationFilterModel} from "../model/LocationFilterModel.ts";
import {getLocationStr} from "../utils/utils.ts";
import {useWidgetStateModel} from "../model/WidgetStateModel.ts";
import {getCountryData} from "../static/countries.ts";

/**
 * Show search center details in popup dialog on the map.
 *
 * @constructor
 */
export const SearchCenterDetailsPopup: React.FC = () => {
    const center = useLocationFilterModel((s) => s.center);
    const selectedSearchCenterDetails = useWidgetStateModel((s) => s.selectedSearchCenterDetails);

    if (!center) {
        return null;
    }

    return (<Popup closeOnEscapeKey={true}>
        <p style={{textAlign: 'center'}}>
            {selectedSearchCenterDetails && <>
                <strong>{`${selectedSearchCenterDetails.type}: ${selectedSearchCenterDetails.name}`}</strong><br/>
                <span>{`${getCountryData(selectedSearchCenterDetails.country)?.flag} ${selectedSearchCenterDetails.city}`}</span>
                <br/>
            </>}
            <span>{getLocationStr(center)}</span>
        </p>
    </Popup>);
};

