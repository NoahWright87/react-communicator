import { Backdrop, Box, Button, Chip, Typography } from "@mui/material"
import { actions } from "./Settings"
import { useEffect, useState } from "react";
import GamepadHelper from "./GamepadHelper";

export default function CommunicatorInputSetup(props) {
  // const settings = props.settings;
  // const setSettings = props.setSettings;

  
  return <>
    <Box>
      TODO: Create way to make / save / retrieve control schemes
    </Box>
    <Box>
      {Object.keys(actions).map(action => {
        return <ActionRow
          // id={action}
          action={action}
          actionName={actions[action]}
        />
      })}
    </Box>
    <Box>
      <GamepadHelper />
    </Box>
  </>
}

function ActionRow(props) {
  const [buttons, setButtons] = useState([]);
  const [listening, setListening] = useState(false);

  const setUniqueButtons = (newButtons) => {
    const buttonSet = new Set(newButtons);
    setButtons(Array.from(buttonSet));
  }

  return <Box
    id={props.action}
  >
    <ListenerOverlay 
      action={props.action}
      setButtons={setUniqueButtons}
      setListening={setListening}
      isListening={listening}
    />
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Typography
        variant="h4"
      >
        {props.actionName}
      </Typography>
      <Box>
        {buttons.map(button => {
          return <Chip
            id={button}
            label={button}
          />
        })}
      </Box>
      <Button
        variant="contained"
        onClick={() => {
          setListening(true);
        }}
      >
        Set
        <br />
        buttons
      </Button>
    </Box>
  </Box>
}

function ListenerOverlay(props) {
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    if (props.isListening) {
      // Listen for keyboard input
      const listener = (event) => {
        
        setButtons(buttons => [...buttons, event.key]);
      }
      window.addEventListener("keydown", listener);

      // TODO: This is all firing too much.
      //  I need to figure out how to only fire when a button is pressed.
      //  Also we're still adding too many things to the list
      // Listen each frame
      // const frameListener = () => {
      //   const gamepads = navigator.getGamepads();
      //   for (let i = 0; i < gamepads.length; i++) {
      //     const gamepad = gamepads[i];
      //     if (gamepad) {
      //       const buttons = gamepad.buttons;
      //       console.log(buttons);
      //       for (let i = 0; i < buttons.length; i++) {
      //         if (buttons[i].pressed) {
      //           console.log(buttons[i]);
      //           setButtons(buttons => [...buttons, i]);
      //         }
      //       }
      //     }
      //   }
      //   window.requestAnimationFrame(frameListener);
      // }
      // window.requestAnimationFrame(frameListener);

      return () => {
        window.removeEventListener("keydown", listener);
        // window.cancelAnimationFrame(frameListener);
      }
    }
  }, [props.isListening]);


  return <>
    <Backdrop
      // id="listener-overlay"
      open={props.isListening}

      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography>
        Press buttons for '{props.action}'
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {buttons.map(button => {
          return <Chip
            id={button}
            label={button}
          />
        })}
      </Box>
      <Box
      >
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setButtons([]);
            props.setListening(false);
          }}
          sx={{
            mx: 1,
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            props.setButtons(buttons);
            props.setListening(false);
            setButtons([]);
          }}
          sx={{
            mx: 1,
          }}
        >
          Finish
        </Button>
      </Box>
      
    </Backdrop>
  </>
}