import {type Location} from "../model/Location.ts";
import {getCountryData} from "../static/countries.ts";
import React from "react";
import {HOTEL_TYPES} from "../static/hotelTypes.ts";

type Props = { location: Location | undefined };

export const LocationInfo: React.FC<Props> = ({location}) => {
    if (!location) {
        return <div/>
    }
    const starsStr = location.isShowStars() ? ` (${location.getStarsString()})` : '';
    const hotelType = HOTEL_TYPES.find( (item) => location.type === item.name);
    const typeStr = hotelType ? hotelType.nameNormal : '';
    
    return <div style={{display: "flex"}}>
        <abbr title={getCountryData(location.country)?.name}>{getCountryData(location.country)?.flag}</abbr>&nbsp;
        {location.city}&nbsp;-&nbsp;
        {location.name}&nbsp;<span style={{marginLeft: "auto"}}>{typeStr}&nbsp;{starsStr}</span>
    </div>;
}