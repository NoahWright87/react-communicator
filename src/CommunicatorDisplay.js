import { Box, Button } from "@mui/material";
import { useState } from "react";
import { PrevNextDisplay } from "./Components/PrevNextDisplay";
import { actions } from "./Settings";
import GamepadHelper from "./GamepadHelper";


export default function CommunicatorDisplay(props) {
  const [currentMode, setCurrentMode] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [currentVariation, setCurrentVariation] = useState(0);

  const settings = props.settings;
  // const setSettings = props.setSettings;

  const modes = settings.modes;
  const phrases = modes[currentMode].phrases.map(phrase => {
    return settings.phrases.find(p => p.name === phrase);
  })
  const variations = phrases[currentPhrase].variations;

  const setModeAndSpeak = (modeIndex) => {
    const mode = modes[modeIndex];

    setState(modeIndex, 0, 0, mode?.name, null);
  };
  const setPhraseAndSpeak = (phraseIndex) => {
    const phrase = phrases[phraseIndex];

    setState(currentMode, phraseIndex, 0, phrase?.name, null);
  };
  const setVariationAndSpeak = (variationIndex) => {
    const variation = variations[variationIndex];

    setState(currentMode, currentPhrase, variationIndex, variation?.name, variation?.src);
  };

  const getNextIndex = (current, size, direction) => {
    return (current + direction + size) % size;
  }
  const performAction = (action) => {
    switch(action) {
      case actions.nextMode:
        setModeAndSpeak(getNextIndex(currentMode, modes.length, 1));
      break;
      case actions.previousMode:
        setModeAndSpeak(getNextIndex(currentMode, modes.length, -1));
      break;
      case actions.nextPhrase:
        setPhraseAndSpeak(getNextIndex(currentPhrase, phrases.length, 1));
      break;
      case actions.previousPhrase:
        setPhraseAndSpeak(getNextIndex(currentPhrase, phrases.length, -1));
      break;
      case actions.nextVariation:
        setVariationAndSpeak(getNextIndex(currentVariation, variations.length, 1));
      break;
      case actions.previousVariation:
        setVariationAndSpeak(getNextIndex(currentVariation, variations.length, -1));
      break;
      default:
      case actions.repeat:
        if (variations[currentVariation].src) {
          playAudio(variations[currentVariation].src);
        } else if (variations[currentVariation].name) {
          speak(variations[currentVariation].name);
        }
      break;
    }
  }

  const buttonPress = (button) => {
    switch(button) {
      case 'Axis1+': // DPad vertical
      case 'Axis1-':
      case 'Axis0+': // DPad horizontal
      case 'Axis0-':
        performAction(actions.nextPhrase);
        break;
      case 'B0': // A
      case 'B1': // B
      case 'B7': // C
      case 'B3': // X 
      case 'B4': // Y
      case 'B6': // Z
        performAction(actions.nextVariation);
        break;
      default:
      case 'B8': // Left shoulder
      case 'B9': // Right shoulder
      case 'B11': // select
        performAction(actions.repeat);
        break;
    }
  }

  const setState = (mode, phrase, variation, speech, src) => {
    setCurrentMode(mode);
    setCurrentPhrase(phrase);
    setCurrentVariation(variation);

    if (src) {
      playAudio(src);
    } else if (speech) {
      speak(speech);
    }
  };

  return <Box
    sx={{
      height: '75vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <GamepadHelper
      onPress={buttonPress}
    />
    <PrevNextDisplay
      title="Mode"
      items={modes.map(mode => mode.name)}
      index={currentMode}
      setter={setModeAndSpeak}
    />
    <PrevNextDisplay
      title="Phrase"
      items={phrases.map(phrase => phrase.name)}
      index={currentPhrase}
      setter={setPhraseAndSpeak}
    />
    <PrevNextDisplay
      title="Variation"
      items={variations.map(variation => variation.name)}
      index={currentVariation}
      setter={setVariationAndSpeak}
    />
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Button
        variant="contained"
        onClick={() => {performAction(actions.repeat)}}
      >
          Repeat
      </Button>
    </Box>
  </Box>
}

let lastAudio = null;
function speak(words) {
  stopSounds();
  if (window.speechSynthesis) {
    const utterance = new SpeechSynthesisUtterance(words);
    window.speechSynthesis.speak(utterance);
  }
}

function playAudio(src) {
  stopSounds();
  if (!src) {
    return;
  }
  const audio = new Audio(src);
  lastAudio = audio;
  audio.play();
}

function stopSounds() {
  if (lastAudio) {
    lastAudio.pause();
    lastAudio.currentTime = 0;
  }
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}



// function CommunicatorInput(props) {
//   const performAction = props.performAction;
//   const controlScheme = props.controlScheme;

//   const keyActionMap = {};
//   const buttonActionMap = {};

//   controlScheme.actions.forEach((action) => {
//     action.keys.forEach((key) => {
//       keyActionMap[key] = action.name;
//     });
//     action.buttons.forEach((button) => {
//       buttonActionMap[button] = action.name;
//     });
//   });


//   // Hook to listen for keyboard input
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       const action = keyActionMap[event.key];
//       if (action) {
//         performAction(action);
//       }
//     }
//     window.addEventListener('keydown', handleKeyDown);
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     }
//   }, [props]);

//   // TODO: Use my gamepad helper???
//   // // Hook to listen for gamepad input each frame
//   // useEffect(() => {
//   //   const handleGamepadInput = () => {
//   //     const gamepad = navigator.getGamepads()[0];
//   //     if (!gamepad) {
//   //       return;
//   //     }
//   //     const buttons = gamepad.buttons;
//   //     const axes = gamepad.axes;
//   //     if (buttons[0].pressed) {
//   //       props.performAction(actions.repeat);
//   //     }
//   //     if (buttons[1].pressed) {
//   //       props.performAction(actions.previousVariation);
//   //     }
//   //     if (buttons[2].pressed) {
//   //       props.performAction(actions.nextVariation);
//   //     }
//   //     if (buttons[3].pressed) {
//   //       props.performAction(actions.previousPhrase);
//   //     }
//   //     if (buttons[4].pressed) {
//   //       props.performAction(actions.nextPhrase);
//   //     }
//   //     if (buttons[5].pressed) {
//   //       props.performAction(actions.previousMode);
//   //     }
//   //     if (buttons[6].pressed) {
//   //       props.performAction(actions.nextMode);
//   //     }
//   //     if (axes[1] < -0.5) {
//   //       props.performAction(actions.previousVariation);
//   //     }
//   //     if (axes[1] > 0.5) {
//   //       props.performAction(actions.nextVariation);
//   //     }
//   //     if (axes[0] < -0.5) {
//   //       props.performAction(actions.previousPhrase);
//   //     }
//   //     if (axes[0] > 0.5) {
//   //       props.performAction(actions.nextPhrase);
//   //     }
//   //   }
//   //   const interval = setInterval(handleGamepadInput, 50);
//   //   return () => {
//   //     clearInterval(interval);
//   //   }
//   // }, [props]);

//   return <>
//     {/* Nothing needs to be displayed! */}
//   </>
// }