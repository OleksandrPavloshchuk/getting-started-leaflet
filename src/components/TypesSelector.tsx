import {HOTEL_TYPES, type HotelType} from "../data/hotelTypes.ts";
import {Checkbox} from "@mantine/core";
import {useEffect, useState} from "react";

type Props = {
    argHotelTypeIds: string[],
    returnHotelTypeIds: (types: string[]) => void
}

function split<T>(arr: T[], chunkSize: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
    }
    return result;
}

export const TypesSelector: React.FC<Props> = ({argHotelTypeIds, returnHotelTypeIds}) => {

    const [selectedTypeIds, setSelectedTypeIds] = useState<string[]>(argHotelTypeIds);

    useEffect(() => {
        returnHotelTypeIds(selectedTypeIds);
    }, [selectedTypeIds]);

    const table = split<HotelType>(HOTEL_TYPES, 2);

    const toTd = (type: HotelType) => <td key={type.ids}>
        <Checkbox
            key={type.ids}
            value={type.ids}
            label={type.name}
            style={{padding: "3px"}}
        />
    </td>;

    return (<Checkbox.Group value={selectedTypeIds} onChange={setSelectedTypeIds}>
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