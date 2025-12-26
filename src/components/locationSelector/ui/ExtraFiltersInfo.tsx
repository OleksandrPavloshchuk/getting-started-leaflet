import {getLocationStr, getRadiusStr} from "../utils/utils.ts";
import {HOTEL_TYPES, type HotelType} from "../static/hotelTypes.ts";
import {Badge} from "@mantine/core";
import "../../../../public/leaflet-custom.css";
import {RemoveSearchParameterIcon} from "./RemoveSearchParameterIcon.tsx";
import {useLocationFilterModel} from "../model/LocationFilterModel.ts";

/**
 * Panel for showing and removing search parameters:
 * - center
 * - radius
 * - country
 * - location types
 *
 * @constructor
 */
export const ExtraFiltersInfo: React.FC = () => {
    const radius = useLocationFilterModel((s) => s.radius);
    const setRadius = useLocationFilterModel((s) => s.setRadius);
    const center = useLocationFilterModel((s) => s.center);
    const setCenter = useLocationFilterModel((s) => s.setCenter);
    const centerName = useLocationFilterModel((s) => s.centerName);
    const setCenterName = useLocationFilterModel((s) => s.setCenterName);
    const country = useLocationFilterModel((s) => s.country);
    const setCountry = useLocationFilterModel((s) => s.setCountry);
    const locationTypeIds = useLocationFilterModel((s) => s.locationTypeIds);
    const setLocationTypeIds = useLocationFilterModel((s) => s.setLocationTypeIds);

    const getTypeBadges = () => {

        const nameComparator = (item1: HotelType | undefined, item2: HotelType | undefined) => {
            if (!item1 || !item2) {
                return 0;
            }
            return item1.name.localeCompare(item2.name);
        };

        return <div style={{maxWidth: 600}}>{
            locationTypeIds
                .map((key) => HOTEL_TYPES.find((item) => item.ids == key))
                .sort(nameComparator)
                .map((item) =>
                    <span key={item?.ids} style={{display: "inline-flex"}}>
                        <Badge
                            style={{margin: 2, borderRadius: 4, opacity: 0.6, marginLeft: 6}}>
                            {item?.name}
                        </Badge>
                        <RemoveSearchParameterIcon onClick={() => {
                            let prev = locationTypeIds;
                            if (item) {
                                prev = prev.filter((v) => v != item.ids);
                            }
                            setLocationTypeIds(prev);
                        }}/>
                    </span>)}
        </div>;
    }

    const getCenterStr = () => {
        if (center && radius) {
            const name = centerName ? centerName + ' ' : '';
            return `${name}${getLocationStr(center)}, ${getRadiusStr(radius)}`;
        } else {
            return undefined;
        }
    };

    return <table style={{width: "100%", fontSize: "10pt"}}>
        <tbody>
        {center && radius && radius > 0 &&
            <tr>
                <td className="extra-filter-info line">Center Coordinates and Radius</td>
                <td className="extra-filter-info line" width="75%">{getCenterStr()}&nbsp;
                    <RemoveSearchParameterIcon onClick={() => {
                        setCenter(undefined);
                        setCenterName(undefined);
                        setRadius(undefined);
                    }}/>
                </td>
            </tr>
        }
        {country &&
            <tr>
                <td className="extra-filter-info line">Country</td>
                <td className="extra-filter-info line">
                    <span style={{marginLeft: 6}}>{`${country.flag} ${country.name}`}</span>&nbsp;
                    <RemoveSearchParameterIcon onClick={() => setCountry(undefined)}/>
                </td>
            </tr>
        }
        {locationTypeIds.length > 0 &&
            <tr>
                <td className="extra-filter-info">Location Types</td>
                <td className="extra-filter-info">{getTypeBadges()}</td>
            </tr>
        }
        </tbody>
    </table>;
}