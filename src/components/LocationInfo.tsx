import type {Location} from "../data/locations.ts";
import {getCountryData} from "../data/flags.ts";
import {Grid} from "@mantine/core";

type Props = { location: Location | undefined };

export const LocationInfo: React.FC<Props> = ({location}) => {
    return (
        <>
            <Grid align="center" gutter="xs">
                <Grid.Col span="content">
                    <abbr title={getCountryData(location?.country)?.name}>
                        {getCountryData(location?.country)?.flag}
                    </abbr>
                </Grid.Col>
                <Grid.Col span="auto">
                    {location?.city}
                </Grid.Col>
                <Grid.Col span="auto">
                    {location?.name}
                </Grid.Col>
            </Grid>
        </>
    )
}