import {useLocationStore} from "../model/LocationStore.ts";
import {getLocationStr, getRadiusStr} from "../utils/utils.ts";
import {HOTEL_TYPES, type HotelType} from "../static/hotelTypes.ts";
import {Badge} from "@mantine/core";
import "../../../../public/leaflet-custom.css";
import {RemoveSearchParameterIcon} from "./RemoveSearchParameterIcon.tsx";

export const ExtraFiltersInfo: React.FC = () => {
    const searchRadius = useLocationStore((s) => s.searchRadius);
    const searchCenter = useLocationStore((s) => s.searchCenter);
    const country = useLocationStore((s) => s.country);
    const setCountry = useLocationStore((s) => s.setCountry);
    const setSearchCenter = useLocationStore((s) => s.setSearchCenter);
    const setSearchRadius = useLocationStore((s) => s.setSearchRadius);
    const hotelTypeIds = useLocationStore((s) => s.hotelTypeIds);
    const setHotelTypeIds = useLocationStore((s) => s.setHotelTypeIds);

    const getTypeNames = () => {

        const nameComparator = (item1: HotelType | undefined, item2: HotelType | undefined) => {
            if (!item1 || !item2) {
                return 0;
            }
            return item1.name.localeCompare(item2.name);
        };

        return <div style={{maxWidth: 600}}>{
            hotelTypeIds
                .map((key) => HOTEL_TYPES.find((item) => item.ids == key))
                .sort(nameComparator)
                .map((item) =>
                    <span key={item?.ids} style={{display: "inline-flex"}}>
                        <Badge
                            style={{margin: 2, borderRadius: 4, opacity: 0.6, marginLeft: 6}}>
                            {item?.name}
                        </Badge>
                        <RemoveSearchParameterIcon onClick={() => {
                            let prev = hotelTypeIds;
                            if (item) {
                                prev = prev.filter((v) => v != item.ids);
                            }
                            setHotelTypeIds(prev);
                        }}/>
                    </span>)}
        </div>;
    }

    return <table style={{width: "100%", fontSize: "10pt"}}>
        <tbody>
        {searchCenter && searchRadius && searchRadius > 0 &&
            <tr>
                <td className="extra-filter-info line">Center Coordinates and Radius</td>
                <td className="extra-filter-info line" width="75%">
                    {`${getLocationStr(searchCenter)}, ${getRadiusStr(searchRadius)}`}&nbsp;
                    <RemoveSearchParameterIcon onClick={() => {
                        setSearchCenter(undefined);
                        setSearchRadius(undefined);
                    }}/>
                </td>
            </tr>
        }
        {country &&
            <tr>
                <td className="extra-filter-info line">Country</td>
                <td className="extra-filter-info line">{`${country.flag} ${country.name}`}&nbsp;
                    <RemoveSearchParameterIcon onClick={() => setCountry(undefined)}/>
                </td>
            </tr>
        }
        {hotelTypeIds.length > 0 &&
            <tr>
                <td className="extra-filter-info">Location Types</td>
                <td className="extra-filter-info">{getTypeNames()}</td>
            </tr>
        }
        </tbody>
    </table>;
}