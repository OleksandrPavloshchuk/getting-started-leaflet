import {useLocationStore} from "../model/LocationStore.ts";
import {getRadiusStr} from "../utils/utils.ts";
import {HOTEL_TYPES} from "../static/hotelTypes.ts";
import {Badge} from "@mantine/core";
import "../../../../public/leaflet-custom.css";

export const ExtraFiltersInfo: React.FC = () => {
    const searchRadius = useLocationStore((s) => s.searchRadius);
    const searchCenter = useLocationStore((s) => s.searchCenter);
    const country = useLocationStore((s) => s.country);
    const hotelTypeIds = useLocationStore((s) => s.hotelTypeIds);

    const getTypeNames = () => {
        return <div style={{maxWidth: 600}}>{
            hotelTypeIds
            .map( (key) => HOTEL_TYPES.find((item)=>item.ids==key)?.name)
            .map((name) =>
                <Badge key={name} style={{margin: 2, borderRadius: 2}}>{name}</Badge>)}
        </div>;
    }

    return <table style={{width: "100%", fontSize: "10pt"}}>
        <tbody>
        {searchCenter &&
            <>
                <tr>
                    <td className="extra-filter-info line">Center Latitude</td>
                    <td className="extra-filter-info line" width="75%">{searchCenter.lat.toFixed(4)}</td>
                </tr>
                <tr>
                    <td className="extra-filter-info line">Center Longitude</td>
                    <td className="extra-filter-info line">{searchCenter.lng.toFixed(4)}</td>
                </tr>
            </>
        }
        {searchRadius && searchRadius > 0 &&
            <tr>
                <td className="extra-filter-info line">Radius</td>
                <td className="extra-filter-info line">{getRadiusStr(searchRadius)}</td>
            </tr>
        }
        {country &&
            <tr>
                <td className="extra-filter-info line">Country</td>
                <td className="extra-filter-info line">{`${country.flag} ${country.name}`}</td>
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