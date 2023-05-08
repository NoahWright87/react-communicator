import { Box } from '@mui/material';
import './App.css';
// import { ButtonGroupSettings } from './InputSettings';
// import GamepadTest from './GamepadTest';
import CommunicatorDisplay from './CommunicatorDisplay';
import CommunicatorSoundsSetup from './CommunicatorSoundsSetup';
import { AccordionGroup } from './AccordionGroup';
import { useState } from 'react';
import { settings } from './Settings';
import { CommunicatorSaveLoad } from './CommmunicatorSaveLoad';
import CommunicatorInputSetup from './CommunicatorInputSetup';
import { InputHelper } from './InputHelper';

function App() {
  const [currentSettings, setSettings] = useState({settings});

  // window.addEventListener("gamepadconnected", (event) => {
  //   console.log("A gamepad connected:");
  //   console.log(event.gamepad);
  // });
  
  // window.addEventListener("gamepaddisconnected", (event) => {
  //   console.log("A gamepad disconnected:");
  //   console.log(event.gamepad);
  // });

  // TODO: Look into this animation library:
  //       https://github.com/pmndrs/react-spring


  // TODO: Give a way for each content to know if it is active.  That way things
  // can be disabled and not listening for input if not active.
  const accordionContents = [
    {
      title: 'Save / Load',
      content: <CommunicatorSaveLoad 
        settings={currentSettings}
        setSettings={setSettings}
      />,
    },
    {
      title: 'Sounds Setup',
      content: <CommunicatorSoundsSetup
        settings={currentSettings}
        setSettings={setSettings}
      />,
    },
    // {
    //   title: 'Input Setup',
    //   content: <CommunicatorInputSetup
    //     settings={currentSettings}
    //     setSettings={setSettings}
    //   />,
    // },
    {
      title: 'Communicator',
      content: <CommunicatorDisplay
        settings={currentSettings.settings}
        setSettings={setSettings}
      />,
    },
  ];

  return <>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        maxHeight: '100vh',
        width: '100vw',
        backgroundColor: 'black',
      }}
    >
      <AccordionGroup
        width="80%"
        accordions={accordionContents}
      />
    </Box>
  </>;
}

export default App;
