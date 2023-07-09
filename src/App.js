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
import ToneJsTest from './ToneJsTest';
import Experiment from './Experimental/Experiment';
import { playNotes, speak } from './SoundPlayer';
import mitt from 'mitt';


const rumbleWeak = (weak) => rumble(weak.amount, 0);
const rumbleStrong = (strong) => rumble(0, strong.amount);

const rumble = (weak, strong) => {
  navigator.getGamepads().forEach(gamepad => {
    if (!gamepad?.vibrationActuator) return;
    gamepad.vibrationActuator.playEffect("dual-rumble", {
      startDelay: 0,
      duration: 250,
      weakMagnitude: weak,
      strongMagnitude: strong,
    });
  });
}

const createTtsActions = (phrases) => {
  return phrases.map(phrase => {
    return {
      callback: speak,
      args: phrase
    };
  });
}
const ttsActions = {
    JJJ: createTtsActions("Jimbo Jambo's Jumbo Jambalaya Jamboree Jumping Gymnasium".split(" ")),
    ChCh: createTtsActions("Chunky Charlie Challenged Chester Cheetah's Chilli Cheddar Charred Cheese Chimps Chaining Challenge Champion".split(" ")),
    Shhh: createTtsActions("Shawn Seamus sings sea shanties so sea shells sell Sam's simple sea salt shallot salad snacks".split(" ")),
    Mmmm: createTtsActions("Mom magnificently makes many mangy monkeys mini morning mango marmalade marshmallow mega margaritas".split(" ")),
}

const createSynthActions = (songList) => {
  return songList.map(song => {
    return {
      callback: playNotes,
      args: song
    };
  });
}
const synthActions = {
  Music1: createSynthActions([
    "E4",
    "E5",
    "E6",
    // "E D C D E E E D D D E G G E D C D E E E E D D E D C", // Mary Had a Little Lamb
    // TODO: Lots more songs
  ]),
  Music2: createSynthActions([
    "D4",
    // "E D C D E E E D D D E G G E D C D E E E E D D E D C", // Mary Had a Little Lamb
    // TODO: Lots more songs
  ]),
  Music3: createSynthActions([
    "C4",
    // "E D C D E E E D D D E G G E D C D E E E E D D E D C", // Mary Had a Little Lamb
    // TODO: Lots more songs
  ]),
  Music4: createSynthActions([
    "B4",
    // "E D C D E E E D D D E G G E D C D E E E E D D E D C", // Mary Had a Little Lamb
    // TODO: Lots more songs
  ]),
  // TODO: More groups of songs
}

const setVolume = (volume) => {
  console.debug("Volume set to " + volume);
}
const volumeOptions = [1.0, 0.8, 0.6, 0.4, 0.2];
const volumeUp = () => {
  return volumeOptions.sort((a, b) => a - b).map((volume) => {
    return {
      callback: setVolume,
      args: volume
    }
  })
}
const volumeDown = () => {
  return volumeOptions.sort((a, b) => b - a).map((volume) => {
    return {
      callback: setVolume,
      args: volume
    }
  })
}

const tempoOptions = [1.0, 0.8, 0.6, 0.4, 0.2];
const setTempo = (tempo) => {
  console.debug("Tempo set to " + tempo);
}
const tempoUp = () => {
  return tempoOptions.sort((a, b) => a - b).map((tempo) => {
    return {
      callback: setTempo,
      args: tempo
    }
  })
}
const tempoDown = () => {
  return tempoOptions.sort((a, b) => b - a).map((tempo) => {
    return {
      callback: setTempo,
      args: tempo
    }
  })
}

const pitchOptions = [1.0, 0.8, 0.6, 0.4, 0.2];
const setPitch = (pitch) => {
  console.debug("Pitch set to " + pitch);
}
const pitchUp = () => {
  return pitchOptions.sort((a, b) => a - b).map((pitch) => {
    return {
      callback: setPitch,
      args: pitch
    }
  })
}
const pitchDown = () => {
  return pitchOptions.sort((a, b) => b - a).map((pitch) => {
    return {
      callback: setPitch,
      args: pitch
    }
  })
}



const actionButtonInfo = [
  // Face buttons
  {
    actions: synthActions.Music1,
    inputs: [
      "DualShock: B0",
      "Keyboard: Digit1",
    ],
  },
  {
    actions: synthActions.Music2,
    inputs: [
      "DualShock: B1",
      "Keyboard: Digit2",
    ],
  },
  {
    actions: synthActions.Music3,
    inputs: [
      "DualShock: B2",
      "Keyboard: Digit3",
    ],
  },
  {
    actions: synthActions.Music4,
    inputs: [
      "DualShock: B3",
      "Keyboard: Digit4",
    ],
  },

  // D-pad
  {
    actions: ttsActions.JJJ,
    inputs: [
      "DualShock: B12",
      "Keyboard: Digit5",
    ],
  },
  {
    actions: ttsActions.Shhh,
    inputs: [
      "DualShock: B13",
      "Keyboard: Digit6",
    ],
  },
  {
    actions: ttsActions.ChCh,
    inputs: [
      "DualShock: B14",
      "Keyboard: Digit7",
    ],
  },
  {
    actions: ttsActions.Mmmm,
    inputs: [
      "DualShock: B15",
      "Keyboard: Digit8",
    ],
  },

  // Shoulder buttons
  {
    actions: null,
    inputs: [
      "DualShock: B4",
      "Keyboard: Digit9",
    ],
  },
  {
    actions: null,
    inputs: [
      "DualShock: B5",
      "Keyboard: Digit0",
    ],
  },

  // Triggers
  {
    actions: [
      {callback: rumbleWeak, args: 0.3},
      {callback: rumbleWeak, args: 0.6},
      {callback: rumbleWeak, args: 1.0},
    ],
    inputs: [
      "DualShock: B6",
      "Keyboard: BracketLeft",

    ],
  },
  {
    actions: [
      {callback: rumbleStrong, args: 0.3},
      {callback: rumbleStrong, args: 0.6},
      {callback: rumbleStrong, args: 1.0},
    ],
    inputs: [
      "DualShock: B7",
      "Keyboard: BracketRight",
    ],
  },

  // Start/Select/PS
  {
    actions: null,
    inputs: [
      "DualShock: B8",
      "Keyboard: Minus",
    ],
  },
  {
    actions: null,
    inputs: [
      "DualShock: B9",
      "Keyboard: Equal",
    ],
  },
  {
    actions: null,
    inputs: [
      "DualShock: B16",
      "Keyboard: Enter",
    ],
  },

  // Stick clicks
  {
    actions: null,
    inputs: [
      "DualShock: B10",
    ],
  },
  {
    actions: null,
    inputs: [
      "DualShock: B11",
    ],
  },

  // Analog sticks
  {
    actions: pitchUp,
    inputs: [
      "DualShock: Axis0+",
      "Keyboard: ArrowUp",
    ],
  },
  {
    actions: pitchDown,
    inputs: [
      "DualShock: Axis0-",
      "Keyboard: ArrowDown",
    ],
  },
  {
    actions: volumeUp,
    inputs: [
      "DualShock: Axis1+",
      "Keyboard: ArrowRight",
    ],
  },
  {
    actions: volumeDown,
    inputs: [
      "DualShock: Axis1-",
      "Keyboard: ArrowLeft",
    ],
  },

  {
    actions: tempoUp,
    inputs: [
      "DualShock: Axis2+",
      "Keyboard: KeyW",
    ],
  },
  {
    actions: tempoDown,
    inputs: [
      "DualShock: Axis2-",
      "Keyboard: KeyS",
    ],
  },
  {
    actions: volumeUp,
    inputs: [
      "DualShock: Axis3+",
      "Keyboard: KeyD",
    ],
  },
  {
    actions: volumeDown,
    inputs: [
      "DualShock: Axis3-",
      "Keyboard: KeyA",
    ],
  },




  // {
  //   callback: speak,
  //   args: [
  //     { words: "Jimbo" },
  //     { words: "Jambo's" },
  //     { words: "Jumbo" },
  //     { words: "Jamboree" },
  //   ],
  //   actions: [
  //     { callback: speak, args:  "Jimbo"  }, 
  //     { callback: speak, args: "Jambo's" },
  //     { callback: speak, args: "Jumbo" },
  //     { callback: speak, args: "Jamboree" },
  //   ],
  //   inputs: [
  //     "DualShock: Circle",
  //     "Sega Genesis: B",
  //   ],
  // },
  // {
  //   actions: [
  //     { callback: playSynth, args: "C4" },
  //     { callback: playSynth, args: "E4" },
  //     { callback: playSynth, args: "G4" },
  //   ],
  //   inputs: [
  //     "DualShock: Triangle",
  //     "Sega Genesis: A",
  //   ],
  // },
  // {
  //   actions: [
  //     // TODO: ???
  //   ],
  //   inputs: [
  //     "DualShock: Square",
  //     "Sega Genesis: C",
  //   ],
  // },
  // {
  //   actions: [
  //     { callback: rumbleWeak}
  //   ],
  //   inputs: [
  //     "DualShock: Left Trigger",
  //   ],
  // }
];



// TODO: Functions for setting pitch, tempo, volume, distortion, 


function App() {
  const [currentSettings, setSettings] = useState({settings});
  const [messages, setMessages] = useState([]);

  const emitter = mitt();


  const addNewMessage = (message) => {
    setMessages([...messages, message]);
  }




  const addMessage = (message) => {
    console.log(messages, message);
    setMessages([...messages, message]);
    // setMessages([...messages, message].slice(-10));
    // setMessages(messages.add(message).slice(-10));
  }

  const onInput = (args) => {
    if (!args?.name) return;

    const key = args.device + ": " + args.name;

    actionButtonInfo.forEach(actionButtonInfo => {
      if (actionButtonInfo.inputs.includes(key)) {
        if (!actionButtonInfo?.actions?.length) {
          console.debug("No actions mapped to button: ", key);
          return;
        }
        if (actionButtonInfo.currentIndex === undefined) {
          actionButtonInfo.currentIndex = 0;
        }
        actionButtonInfo.currentIndex = (actionButtonInfo.currentIndex + 1) % actionButtonInfo.actions.length;
        // actionButtonInfo.actions.forEach(action => {
        //   action.callback({notes: action.args, value: args?.value ?? 0});
        // })
        actionButtonInfo.actions[actionButtonInfo.currentIndex].callback({
          args: actionButtonInfo.actions[actionButtonInfo.currentIndex].args, 
          value: args?.value ?? 0
        });
      }
    });
  }
  // TODO: Bunch of functions that inputs will map to, like next page, previous page, etc.

  

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
    // {
    //   title: 'Tone.js Test',
    //   content: <ToneJsTest />,
    // },
    // {
    //   title: 'Save / Load',
    //   content: <CommunicatorSaveLoad 
    //     settings={currentSettings}
    //     setSettings={setSettings}
    //   />,
    // },
    // {
    //   title: 'Sounds Setup',
    //   content: <CommunicatorSoundsSetup
    //     settings={currentSettings}
    //     setSettings={setSettings}
    //   />,
    // },
    // // {
    // //   title: 'Input Setup',
    // //   content: <CommunicatorInputSetup
    // //     settings={currentSettings}
    // //     setSettings={setSettings}
    // //   />,
    // // },
    // {
    //   title: 'Communicator',
    //   content: <CommunicatorDisplay
    //     settings={currentSettings.settings}
    //     setSettings={setSettings}
    //   />,
    // },
    {
      title: 'Experimental',
      content: <Experiment
        consoleMessages={messages}
        actionLists={actionButtonInfo}
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
      <InputHelper
        callback={onInput}
      />
      <AccordionGroup
        width="80%"
        accordions={accordionContents}
      />
    </Box>
  </>;
}

export default App;
