// TODO: Replace the accordion with just this

import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { KeyboardHelper } from "./KeyboardHelper";
import { GamepadHelper } from "./GamepadHelper";


export function InputHelper({ callback }) {
// export function InputHelper({ buttonActionMap }) {
    

    const onInput = (input) => {
        console.debug(input);

        callback(input);
    }

    // const onInput = (input) => {
    //     console.debug(input);
    //     // if (buttonActionMap[input]) {
    //     //     buttonActionMap[input]();
    //     // }

    //     callback(input);
    // }

  return <>
    <KeyboardHelper
        onInput={onInput}
    />
    <GamepadHelper
        onInput={onInput}
    />
    {/* TODO: MouseHelper */}
  </>
}
