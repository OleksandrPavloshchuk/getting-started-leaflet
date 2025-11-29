import {Box, Button, Modal, TextInput} from "@mantine/core";
import {useWidgetStateModel} from "../model/WidgetStateModel.ts";
import {useCreatePersonalSearchCenterModel} from "../model/CreatePersonalSearchCenterModel.ts";
import {CountriesDropdown} from "./CountriesDropdown.tsx";
import {useState} from "react";

export const CreatePersonalSearchCenterDialog: React.FC = () => {

    const createPersonalSearchCenterOpened = useWidgetStateModel((s) => s.createPersonalSearchCenterOpened);
    const setCreatePersonalSearchCenterOpened = useWidgetStateModel((s) => s.setCreatePersonalSearchCenterOpened);

    const country = useCreatePersonalSearchCenterModel((s) => s.country);
    const setCountry = useCreatePersonalSearchCenterModel((s) => s.setCountry);
    const city = useCreatePersonalSearchCenterModel((s) => s.city);
    const setCity = useCreatePersonalSearchCenterModel((s) => s.setCity);
    const name = useCreatePersonalSearchCenterModel((s) => s.name);
    const setName = useCreatePersonalSearchCenterModel((s) => s.setName);

    const [submitted, setSubmitted] = useState(false);

    const countryValid = () => country != undefined;
    const cityValid = () => city.trim().length>0;
    const nameValid = () => name.trim().length>0;

    const onSave = () => {
        setSubmitted(true);
        if (countryValid() && cityValid() && nameValid()) {

            // TODO implement saving:
            console.log("TRACE", {country, city, name});

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
            styles={{
                root: {
                    borderRadius: 6
                },
                title: {
                    fontSize: "small",
                    fontWeight: 500,
                },
                header: {
                    paddingTop: '4px',
                    paddingBottom: '4px',
                    minHeight: 'auto',
                    backgroundColor: 'lightgrey'

                },
                content: {
                    fontSize: "10pt",
                    top: '20%',
                    left: '-20%',
                    transform: 'translate(-50%, -50%)',
                    position: 'absolute',
                    backgroundColor: 'white'
                }
            }}
        >
            <Box maw={720} mx="auto" mt="md">
                <table width="100%">
                    <tbody>
                    <tr>
                        <td>Country:</td>
                        <td>
                            <CountriesDropdown
                                value={country}
                                setValue={setCountry}
                            />
                        </td>
                    </tr>
                    {submitted && !countryValid() &&
                        <tr>
                            <td colSpan={2} style={{color: "red"}}>Country is not defined</td>
                        </tr>
                    }
                    <tr>
                        <td>City:</td>
                        <td>
                            <TextInput
                                value={city}
                                onChange={(e) => setCity(e.currentTarget.value)}
                                error={submitted && !cityValid() ? 'City is not defined' : null}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Name:</td>
                        <td>
                            <TextInput
                                value={name}
                                onChange={(e) => setName(e.currentTarget.value)}
                                error={submitted && !nameValid() ? 'Name is not defined' : null}
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
                <Box style={{textAlign: "center"}}>
                    <Button onClick={onSave}>Save</Button>
                </Box>
            </Box>
        </Modal>
    );
}