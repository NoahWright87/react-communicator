// TODO: Replace the accordion with just this

import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { KeyboardHelper } from "./KeyboardHelper";
import { GamepadHelper } from "./GamepadHelper";


export function InputHelper({ buttonActionMap }) {
    // const buttonActionMap = {
    //     "ArrowLeft": () => changeNumber(-1),
    //     "ArrowRight": () => changeNumber(1),
    //     "ArrowUp": () => changeNumber(10),
    //     "ArrowDown": () => changeNumber(-10),
    // }

    // const [number, setNumber] = useState(0);
    // const changeNumber = (amount) => {
    //     setNumber(number + amount);
    // }

    const onInput = (input) => {
        console.log(input);
        if (buttonActionMap[input]) {
            buttonActionMap[input]();
        }
    }

    return <Box
        sx={{
            display: 'flex',
            flexDirection: 'column'
        }}
    >
        <KeyboardHelper
            onInput={onInput}
        />
        <GamepadHelper
            onInput={onInput}
        />
    </Box>;
}
