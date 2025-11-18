import {useLocationStore} from "../model/LocationStore.ts";
import {getRadiusStr} from "../utils/utils.ts";

export const ExtraFiltersInfo: React.FC = () => {
    const searchRadius = useLocationStore((s) => s.searchRadius);
    const searchCenter = useLocationStore((s) => s.searchCenter);
    const country = useLocationStore((s) => s.country);
    // TODO use full types here for getting of names
    const hotelTypes = useLocationStore((s) => s.hotelTypeIds);

    return <table style={{width: "100%", fontSize: "sm"}}>
        <tbody>
        {searchCenter &&
            <>
                <tr>
                    <td>Latitude</td>
                    <td>{searchCenter.lat.toFixed(4)}</td>
                </tr>
                <tr>
                    <td>Longitude</td>
                    <td>{searchCenter.lng.toFixed(4)}</td>
                </tr>
            </>
        }
        {searchRadius && searchRadius > 0 &&
            <tr>
                <td>Radius</td>
                <td>{getRadiusStr(searchRadius)}</td>
            </tr>
        }
        {country &&
            <tr>
                <td>Country</td>
                <td>{`${country.flag} ${country.name}`}</td>
            </tr>
        }
        {hotelTypes.length > 0 &&
            <tr>
                <td>Location Types</td>
                <td>{hotelTypes.join(", ")}</td>
            </tr>
        }
        </tbody>
    </table>;
}