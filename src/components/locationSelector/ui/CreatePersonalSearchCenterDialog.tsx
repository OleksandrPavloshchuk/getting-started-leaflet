import {Box, Button, Modal, Paper, Stack, TextInput} from "@mantine/core";
import {useWidgetStateModel} from "../model/WidgetStateModel.ts";
import {useCreatePersonalSearchCenterModel} from "../model/CreatePersonalSearchCenterModel.ts";
import {CountriesDropdown} from "./CountriesDropdown.tsx";
import {useState} from "react";
import {SearchCenter} from "../model/SearchCenter.ts";
import {useLocationFilterModel} from "../model/LocationFilterModel.ts";
import {updateSearchCenters} from "../service/UpdateSearchCenter.ts";
import {getDialogStyles, notifyError, notifySuccess} from "../utils/utils.ts";
import {SearchCenterGroupsDropdown} from "./SearchCenterGroupsDropdown.tsx";

export const CreatePersonalSearchCenterDialog: React.FC = () => {

    const createPersonalSearchCenterOpened = useWidgetStateModel((s) => s.createPersonalSearchCenterOpened);
    const setCreatePersonalSearchCenterOpened = useWidgetStateModel((s) => s.setCreatePersonalSearchCenterOpened);

    const center = useLocationFilterModel((s) => s.center);

    const country = useCreatePersonalSearchCenterModel((s) => s.country);
    const setCountry = useCreatePersonalSearchCenterModel((s) => s.setCountry);
    const city = useCreatePersonalSearchCenterModel((s) => s.city);
    const setCity = useCreatePersonalSearchCenterModel((s) => s.setCity);
    const name = useCreatePersonalSearchCenterModel((s) => s.name);
    const setName = useCreatePersonalSearchCenterModel((s) => s.setName);
    const group = useCreatePersonalSearchCenterModel((s) => s.group);
    const setGroup = useCreatePersonalSearchCenterModel((s) => s.setGroup);

    const [submitted, setSubmitted] = useState(false);

    const cityValid = () => city.trim().length > 0;
    const nameValid = () => name.trim().length > 0;

    const showSuccess = (s: string) => notifySuccess("Search Centers", s);
    const showError = (s: string) => notifyError("Search Centers", s);

    const onSave = () => {
        setSubmitted(true);
        if (group && group.id && center && country && cityValid() && nameValid()) {

            const newSearchCenter = new SearchCenter();
            newSearchCenter.group_id = group.id;
            newSearchCenter.city = city;
            newSearchCenter.country = country.iso;
            newSearchCenter.name = name;
            newSearchCenter.longitude = center.lng;
            newSearchCenter.latitude = center.lat;

            updateSearchCenters.create(newSearchCenter, showSuccess, showError);

            setCreatePersonalSearchCenterOpened(false);
            setCountry(undefined);
            setCity("");
            setName("");
            setSubmitted(false);
        }
    };

    return (
        <Modal
            title="Create Personal Search Center"
            trapFocus={false}
            zIndex={8000}
            opened={createPersonalSearchCenterOpened}
            onClose={() => setCreatePersonalSearchCenterOpened(false)}
            withinPortal={true}
            styles={getDialogStyles()}
        >
            <Paper p="xs">
                <Stack gap="xs">
                    <div className="field-label">Group:</div>
                    <SearchCenterGroupsDropdown value={group} setValue={setGroup}/>
                    {submitted && !group &&
                        <div style={{color: "red"}}>Group is not defined</div>
                    }
                    <div className="field-label">Country:</div>
                    <CountriesDropdown value={country} setValue={setCountry}/>
                    {submitted && !country &&
                        <div style={{color: "red"}}>Country is not defined</div>
                    }
                    <div className="field-label">City:</div>
                    <TextInput
                        value={city}
                        onChange={(e) => setCity(e.currentTarget.value)}
                        error={submitted && !cityValid() ? 'City is not defined' : null}
                    />
                    <div className="field-label">Name:</div>
                    <TextInput
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                        error={submitted && !nameValid() ? 'Name is not defined' : null}
                    />
                    <Box style={{textAlign: "center"}}>
                        <Button onClick={onSave}>Save</Button>
                    </Box>
                </Stack>
            </Paper>
        </Modal>
    );
}