import { Backdrop, Box, Button, Chip, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { availableActions } from "./App";

export function InputSettings() {

}

// TODO: better name???
export function ButtonGroupSettings(buttonGroup) {
  const [isListening, setIsListening] = useState(false);
  const [buttonsPressed, setButtonsPressed] = useState([]);

  const startListening = () => {
    setButtonsPressed([]);
    setIsListening(true);
  };
  const finishListening = () => {
    setIsListening(false);
    // TODO: Save buttonsPressed
  };

  // useEffect(() => {
    function handleKeyDown(event) {
      console.log(isListening);
      if (isListening) {
        const buttons = buttonsPressed.slice();
        if (!buttons.includes(event.code)) {
          console.log(event.code);
          buttons.push(event.code);
          setButtonsPressed(buttons);
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);

  //   return function cleanup() {
  //     document.removeEventListener('keydown', handleKeyDown);
  //   }
  // }, []);

  const listeningOverlay = <Backdrop
    open={isListening}
  >
    <Typography
      variant="h6"
      gutterBottom
    >
        Listening for buttons...
    </Typography>
    {buttonsPressed && buttonsPressed.length > 0 && (
      <Box
        // className={classes.chipBox}
      >
        {buttonsPressed.map((button, index) => (
          <Chip key={index} label={button} />
        ))}
      </Box>
    )}
    <Button
      variant="outlined"
      onClick={finishListening}
    >
      Finish
    </Button>
  </Backdrop>

  return <div>
    {isListening && listeningOverlay}
    <Button
      color="primary"
      onClick={startListening}
      // disabled={!action}
    >
      Assign buttons
    </Button>
    <Select
    >
      {availableActions.map((action, index) => {
        <MenuItem
          key={index}
          value={index}
        >
          {action.name}
        </MenuItem>
      })}
    </Select>
    <div>
      {buttonGroup?.buttons && buttonGroup.buttons.map((button, index) => {
        <Chip
          key={index}
          variant='outlined'
          label={button.id}
          onDelete={() => { console.log("TODO: Delete this button"); }}
        />
      })}
    </div>
    
  </div>
}