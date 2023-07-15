import { Button } from "@mui/material";
import { Box } from "@mui/system";
import mitt from "mitt";
import { useState } from "react";


export default function Experiment({ consoleMessages, actionLists }) {
  return <>TBD</>

  const actionButtons = actionLists.map(actionList => {
    return <ActionButton
      actions={actionList.actions}
      inputs={actionList.inputs}
    />
  });

  return <>
    <Box
      sx={{
        display: 'grid',
        gridTemplateAreas:
        `"console console"
         "buttons buttons"
         "buttons buttons"
         "buttons buttons"`
      }}
    >
      <Box
        sx={{
          gridArea: 'console',
          minHeight: '300px',
          my: 1,
        }}
      >
        <TerminalDisplay
          lines={consoleMessages}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row wrap',
          gridArea: 'buttons',
        }}
      >
        {actionButtons}
      </Box>
    </Box>
  </>
}

const controllerMapping = {
  // TODO: Connect controller, write down what the buttons are by index
  "DualShock 4 Wireless Controller": {
    axes: {
      0: "Left Stick X",
      1: "Left Stick Y",
      2: "Right Stick X",
      3: "Right Stick Y",
      4: "L2",
      5: "R2",
    },
    buttons: {
      0: "Cross",
      1: "Circle",
      2: "Square",
      3: "Triangle",
      4: "L1",
      5: "R1",
      6: "L2",
      7: "R2",
      8: "Share",
      9: "Options",
      10: "Left Stick",
      11: "Right Stick",
      12: "PS",
      13: "Touchpad",
    },
    dpad: {
      0: "Up",
      1: "Up Right",
      2: "Right",
      3: "Down Right",
      4: "Down",
      5: "Down Left",
      6: "Left",
      7: "Up Left",
    },
  },
};



export function TerminalDisplay({ lines }) {
  return <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: '100%',
      height: '100%',
      maxHeight: '100%',
      overflowY: 'scroll',
      overflowX: 'hidden',
      backgroundColor: 'black',
      color: 'white',
      fontFamily: 'monospace',
      fontSize: '1.5em',
      padding: '0.5em',
      border: '1px solid white',
    }}
  >
    {lines.map((line, index) => {
      return <Box
        key={index}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '100%',
          height: 'auto',
          maxHeight: '100%',
          overflowY: 'scroll',
          overflowX: 'hidden',
          backgroundColor: 'black',
          color: 'white',
          fontFamily: 'monospace',
          fontSize: '1.5em',
          padding: '0.5em',
          border: '1px solid white',
        }}
      >
        {line}
      </Box>
    })}
  </Box>
}


export function ActionButton({ actions, inputs }) {
  // console.log(actions, inputs);
  
  const [actionIndex, setActionIndex] = useState(0);

  if (!actions?.length) return <></>;

  const nextAction = (inputReceived) => {
    if (!actions?.length) return;
    const newIndex = (actionIndex + 1) % actions.length;
    setActionIndex(newIndex);
    const action = actions[newIndex];
    
    // if (action.useInputAmount) {
    //   action.callback({...action.args, amount: ?????});
    // } else {
      action.callback({...action.args});
    // }
  }

  const emitter = mitt();
  for (const input of inputs) {
    emitter.on(input, nextAction);
  }

  return <>
    <Button
      sx={{
        // display: 'flex',
        // width: '50%',
        // flex: 1,
        minHeight: '50px',
        width: '200px',
        my: 1,

      }}
    >
      {actions[actionIndex]?.name ?? actions[actionIndex].args ?? "???"}
    </Button>


  </>
}


// const actions = [
//   {
//     name: "Mary Had a Little Lamb",
//     callback: () => { playSynth("C4") }
//   },
//   {
//     name: "\"Hello\"",
//     callback: () => { speak("Hello") }
//   },
// ];