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
import { playNotes, playNotes_new, setActiveSynth, setBpm, setReverb, setSynthDistortion, setSynthVolume, shiftPitch, speak, toggleAudioInterrupt, toggleBeatAssist } from './SoundPlayer';
import mitt from 'mitt';
import { furElise, jingleBells, maryHadaLittleLamb, odeToJoy, rowYourBoat, testMelody, twinkleTwinkle } from './Melodies';
import { Tone } from 'tone/build/esm/core/Tone';


const rumbleWeak = (weak) => rumble(weak.value ?? weak.args ?? 0, 0);
const rumbleStrong = (strong) => rumble(0, strong.value ?? strong.args ?? 0);

const rumble = (weak, strong) => {
  console.debug("Rumble", weak, strong);

  navigator.getGamepads().forEach(gamepad => {
    if (!gamepad?.vibrationActuator) return;
    gamepad.vibrationActuator.playEffect("dual-rumble", {
      startDelay: 0,
      duration: 500,
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

const createSynthActions = (songList, synthId, trackId) => {
  return songList.map(song => {
    return {
      callback: playNotes_new,
      args: {
        notes: song,
        synthId: synthId,
        trackId: trackId,
      }
    };
    
  });
}

const synthActions = {
  Music1: createSynthActions([
    // maryHadaLittleLamb,
    // jingleBells,
    testMelody,
  ]),
  Music2: createSynthActions([
    rowYourBoat,
    twinkleTwinkle,
  ]),
  Music3: createSynthActions([
    odeToJoy,
    furElise,
  ]),
  Music4: createSynthActions([
    "C3--- C4-- C5- C6",
    "D3--- D4-- D5- D6",
    "E3--- E4-- E5- E6",
    "F3--- F4-- F5- F6",
  ]),
  Percussion: createSynthActions([
    "C1---",
  ],
  5),
  Percussion2: createSynthActions([
    "C2-",
  ],
  5),
  Percussion3: createSynthActions([
    "F2",
  ],
  5),
  Percussion4: createSynthActions([
    "F3",
  ],
  5),
}

const setVolume = (volume) => {
  setSynthVolume(volume.args);
}
const volumeUpActions = [
  { callback: setVolume, args: 1.0 },
  { callback: setVolume, args: 1.1 },
  { callback: setVolume, args: 1.2 },
  { callback: setVolume, args: 1.3 },
]
const volumeDownActions = [
  { callback: setVolume, args: 1.0 },
  { callback: setVolume, args: 0.9 },
  { callback: setVolume, args: 0.8 },
  { callback: setVolume, args: 0.7 },
]


const setTempo = (input) => {
  setBpm(input.args);
}

const createTempoAction = (tempo) => {
  return {
    callback: setTempo,
    args: tempo
  }
}
const tempoActionUp = [
  createTempoAction(120),
  createTempoAction(150),
  createTempoAction(180),
  createTempoAction(210),
  createTempoAction(240),
]
const tempoActionDown = [
  createTempoAction(210),
  createTempoAction(180),
  createTempoAction(150),
  createTempoAction(120),
  createTempoAction(80),
]

const setPitch = (input) => {
  shiftPitch(input.args);
}
const pitchDownActions = [
  { callback: setPitch, args: 1.0 },
  { callback: setPitch, args: 0.8 },
  { callback: setPitch, args: 0.6 },
  { callback: setPitch, args: 0.4 },
  { callback: setPitch, args: 0.2 },
]
const pitchUpActions = [
  { callback: setPitch, args: 0.2 },
  { callback: setPitch, args: 0.4 },
  { callback: setPitch, args: 0.6 },
  { callback: setPitch, args: 0.8 },
  { callback: setPitch, args: 1.0 },
]

const setDistortion = (input) => {
  setSynthDistortion(input.args);
}
const setDistortionUpActions = [
  { callback: setDistortion, args: 0.0 },
  { callback: setDistortion, args: 0.1 },
  { callback: setDistortion, args: 0.2 },
  { callback: setDistortion, args: 0.3 },
]
const setDistortionDownActions = [
  { callback: setDistortion, args: 0.3 },
  { callback: setDistortion, args: 0.2 },
  { callback: setDistortion, args: 0.1 },
  { callback: setDistortion, args: 0.0 },
]


const actionButtonInfo = [
  // Face buttons
  {
    actions: createSynthActions([
      "C3/ C3/ C3/ _ C3/ C3/ C3/",
      "E3/ E3/ E3/ _ E3/ E3/ E3/",
      "G3/ G3/ G3/ _ G3/ G3/ G3/",
      "F3/ F3/ F3/ _ F3/ F3/ F3/",
    ]),
    inputs: [
      "DualShock: B0",
      "Keyboard: Digit1",
    ],
  },
  {
    actions: createSynthActions([
      "D4-- D4-- D4--",
      "F4-- F4-- F4--",
      "A5-- A5-- A5--",
      "C5-- C5-- C5--",
    ]),
    inputs: [
      "DualShock: B1",
      "Keyboard: Digit2",
    ],
  },
  {
    actions: createSynthActions([
      "C3// C4// C5// C6//",
      "E3// E4// E5// E6//",
      "G3// G4// G5// G6//",
      "F3// F4// F5// F6//",
    ]),
    inputs: [
      "DualShock: B2",
      "Keyboard: Digit3",
    ],
  },
  {
    actions: createSynthActions([
      "A6// A5// A4// A3//",
      "B6// B5// B4// B3//",
      "C6// C5// C4// C3//",
      "D6// D5// D4// D3//",
    ]),
    inputs: [
      "DualShock: B3",
      "Keyboard: Digit4",
    ],
  },

  // D-pad
  {
    actions: synthActions.Percussion,
    inputs: [
      "DualShock: B12",
      "Keyboard: Digit5",
    ],
  },
  {
    actions: synthActions.Percussion2,
    inputs: [
      "DualShock: B13",
      "Keyboard: Digit6",
    ],
  },
  {
    actions: synthActions.Percussion3,
    inputs: [
      "DualShock: B14",
      "Keyboard: Digit7",
    ],
  },
  {
    actions: synthActions.Percussion4,
    inputs: [
      "DualShock: B15",
      "Keyboard: Digit8",
    ],
  },

  // Shoulder buttons
  {
    actions: [{callback: speak, args: "Yes"}],
    inputs: [
      "DualShock: B4",
      "Keyboard: Digit9",
    ],
  },
  {
    actions: [{callback: speak, args: "No"}],
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
    actions: [
      {callback: toggleAudioInterrupt, args: true},
      {callback: toggleAudioInterrupt, args: false},
    ],
    inputs: [
      "DualShock: B8",
      "Keyboard: Minus",
    ],
  },
  {
    actions: [
      {callback: toggleAudioInterrupt, args: true},
      {callback: toggleAudioInterrupt, args: false},
    ],
    inputs: [
      "DualShock: B9",
      "Keyboard: Equal",
    ],
  },
  {
    actions: [
      {callback: toggleBeatAssist, args: true},
      {callback: toggleBeatAssist, args: false},
    ],
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
    actions: [{callback: setActiveSynth, args: 0}],
    // actions: pitchUpActions,
    inputs: [
      "DualShock: Axis0+",
      "Keyboard: ArrowUp",
    ],
  },
  {
    actions: [{callback: setActiveSynth, args: 1}],
    // actions: pitchDownActions,
    inputs: [
      "DualShock: Axis0-",
      "Keyboard: ArrowDown",
    ],
  },
  {
    actions: [{callback: setActiveSynth, args: 2}],
    // actions: volumeUpActions,
    inputs: [
      "DualShock: Axis1+",
      "Keyboard: ArrowRight",
    ],
  },
  {
    actions: [{callback: setActiveSynth, args: 3}],
    // actions: volumeDownActions,
    inputs: [
      "DualShock: Axis1-",
      "Keyboard: ArrowLeft",
    ],
  },

  {
    // actions: tempoActionUp,
    actions: createSynthActions(["F3---"], 5),
    inputs: [
      "DualShock: Axis2+",
      "Keyboard: KeyW",
    ],
  },
  {
    // actions: tempoActionDown,
    actions: createSynthActions(["E3---"], 5),
    inputs: [
      "DualShock: Axis2-",
      "Keyboard: KeyS",
    ],
  },
  {
    // actions: setDistortionUpActions,
    actions: createSynthActions(["D3---"], 5),
    inputs: [
      "DualShock: Axis3+",
      "Keyboard: KeyD",
    ],
  },
  {
    // actions: setDistortionDownActions,
    actions: createSynthActions(["C3---"], 5),
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

    actionButtonInfo.forEach(abInfo => {
      if (abInfo.inputs.includes(key)) {
        if (!abInfo?.actions?.length) {
          console.debug("No actions mapped to button: ", key);
          return;
        }
        if (abInfo.currentIndex === undefined) {
          abInfo.currentIndex = 0;
        }
        abInfo.currentIndex = (abInfo.currentIndex + 1) % abInfo.actions.length;
        // actionButtonInfo.actions.forEach(action => {
        //   action.callback({notes: action.args, value: args?.value ?? 0});
        // })
        abInfo.actions[abInfo.currentIndex].callback({
          args: abInfo.actions[abInfo.currentIndex].args, 
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
