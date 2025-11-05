import type {Location} from "../data/locations.ts";
import {getCountryData} from "../data/flags.ts";

type Props = { location: Location | undefined };

export const LocationInfo: React.FC<Props> = ({location}) => {
    return (
        <>
            <span style={{margin: 6}}>
                <abbr title={getCountryData(location?.country)?.name}>
                    {getCountryData(location?.country)?.flag}
                </abbr>
            </span>
            <span style={{width: 300, margin: 6}}>{location?.city}</span>-
            <span style={{margin: 6}}>{location?.name}</span>
        </>
    )
}