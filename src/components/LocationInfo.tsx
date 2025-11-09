import {getStarsString, type Location} from "../data/locations.ts";
import {getCountryData} from "../data/countries.ts";
import React from "react";

type Props = { location: Location | undefined };

export const LocationInfo: React.FC<Props> = ({location}) => {
    if (!location) {
        return <div/>
    }
    const starsStr = location.stars > 0 ? ` (${getStarsString(location.stars)})` : '';
    return <div style={{display: "flex"}}>
        <abbr title={getCountryData(location.country)?.name}>{getCountryData(location.country)?.flag}</abbr>&nbsp;
        {location.city}&nbsp;-&nbsp;
        {location.name}&nbsp;<span style={{marginLeft: "auto"}}>{location.type}&nbsp;{starsStr}</span>
    </div>;
}