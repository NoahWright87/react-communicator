import { Box, Button } from "@mui/material";
import { useRef } from "react";


export function CommunicatorSaveLoad(props) {
    const { settings, setSettings } = props;

    const hasChanges = props.hasChanges ?? false;

    const inputRef = useRef();
    
    // const saveAs = async () => {
    //     // const options = {
    //     //     types: [
    //     //         {
    //     //             description: 'JSON file',
    //     //             accept: {
    //     //                 'application/json': ['.json'],
    //     //             },
    //     //         },
    //     //     ],
    //     //     excludeAcceptAllOption: true,
    //     //     // multiple: false,
    //     // };
    //     // const file = await window.showSaveFilePicker(options);
    //     // // setSettings({...settings, filename: filename});

    //     // setSettings({...settings, filename: file.name});
    //     save();
    // }

    const save = () => {
        const settingsString = JSON.stringify(settings);
        const blob = new Blob([settingsString], {type: 'text/plain'});
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = settings.filename;
        link.click();
    }
    const load = (file) => {
        settings.filename = file.name;
        const reader = new FileReader();
        reader.onload = (e) => {
            const settingsString = e.target.result;
            const loadedSettings = JSON.parse(settingsString);
            loadedSettings.filename = settings.filename;
            setSettings(loadedSettings);
            // TODO: Show "loading..." and "loaded" messages in dialog
        }
        reader.readAsText(file);
    }

    return <>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }}
        >
            {/* <Button
                disabled={!hasChanges}
                hidden={settings.filename === ""}
                onClick={() => {
                    save();
                }}
            >
                {hasChanges
                    ? "Save changes"
                    : "-No changes-"}
            </Button> */}
            <Button
                variant="contained"
                size="large"
                component="label"
                onClick={() => {
                    save();
                }}
            >
                Save
                {hasChanges && <span>*</span>}
                {/* <input
                    hidden
                    type="file"
                    ref={inputRef}
                    
                    accept=".json"
                    // onChange={(e) => {
                    //     saveAs(e.target.files[0].name);
                    // }}
                /> */}
            </Button>
            <Button
                variant="contained"
                component="label"
                size="large"
            >
                Load
                <input
                    hidden
                    type="file"
                    ref={inputRef}
                    accept=".json"
                    onChange={(e) => {
                        load(e.target.files[0]);
                    }}
                />
            </Button>

        </Box>
    </>
}