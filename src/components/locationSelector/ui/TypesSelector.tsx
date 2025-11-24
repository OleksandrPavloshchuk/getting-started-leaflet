import {HOTEL_TYPES, type HotelType} from "../static/hotelTypes.ts";
import {Checkbox} from "@mantine/core";
import {useLocationFilterModel} from "../model/LocationFilterModel.ts";

// Helper method: split array to array of arrays of fixed length
function split<T>(arr: T[], chunkSize: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
    }
    return result;
}

/**
 * Widget for selection of location types via checkboxes
 *
 * @constructor
 */
export const TypesSelector: React.FC = () => {

    const locationTypeIds = useLocationFilterModel((s) => s.locationTypeIds);
    const setLocationTypeIds = useLocationFilterModel((s) => s.setLocationTypeIds);

    const table = split<HotelType>(HOTEL_TYPES, 2);

    const toTd = (type: HotelType) => <td key={type.ids}>
        <Checkbox
            key={type.ids}
            value={type.ids}
            label={type.name}
            style={{padding: "3px"}}
        />
    </td>;

    return (<Checkbox.Group value={locationTypeIds} onChange={setLocationTypeIds}>
        <table>
            <tbody>
            {
                table.map((types: HotelType[], i: number) => <tr key={i}>
                    {types.map((type: HotelType) => toTd(type))}
                </tr>)
            }
            </tbody>
        </table>
    </Checkbox.Group>);
}