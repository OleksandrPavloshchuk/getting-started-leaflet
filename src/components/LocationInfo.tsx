import type {Location} from "../data/locations.ts";
import {getCountryData} from "../data/flags.ts";

type Props = { location: Location | undefined };

export const LocationInfo: React.FC<Props> = ({location}) => {
    return (
        <>
            <abbr title={getCountryData(location?.country)?.name}>
                {getCountryData(location?.country)?.flag}
            </abbr>&nbsp;
            {location?.city}&nbsp;-&nbsp;
            {location?.name}
        </>
    )
}