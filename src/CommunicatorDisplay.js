import { Box, Button } from "@mui/material";
import { useState } from "react";
import { PrevNextDisplay } from "./Components/PrevNextDisplay";
import { InputHelper } from "./InputHelper";
import { actions } from "./Settings";
import { playAudio, playVariation, speak } from "./SoundPlayer";


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
    modeIndex = (modeIndex + modes.length) % modes.length;
    const mode = modes[modeIndex];

    setState(modeIndex, 0, 0, mode?.name, null);
  };
  const setPhraseAndSpeak = (phraseIndex) => {
    phraseIndex = (phraseIndex + phrases.length) % phrases.length;
    const phrase = phrases[phraseIndex];

    setState(currentMode, phraseIndex, 0, phrase?.name, null);
  };
  const setVariationAndSpeak = (variationIndex) => {
    variationIndex = (variationIndex + variations.length) % variations.length;
    const variation = variations[variationIndex];

    setState(currentMode, currentPhrase, variationIndex, variation?.name, variation?.src);
  };

  const repeat = () => {
    playVariation(variations[currentVariation]);
  }

  const getActionForName = (name) => {
    // console.log(name);
    switch(name) {
      case actions.nextMode:
        return () => setModeAndSpeak(currentMode+1);
      case actions.previousMode:
        return () => setModeAndSpeak(currentMode-1);
      case actions.nextPhrase:
        return () => setPhraseAndSpeak(currentPhrase+1);
      case actions.previousPhrase:
        return () => setPhraseAndSpeak(currentPhrase-1);
      case actions.nextVariation:
        return () => setVariationAndSpeak(currentVariation+1);
      case actions.previousVariation:
        return () => setVariationAndSpeak(currentVariation-1);
      case actions.repeat:
        return () => repeat();
      default:
        return () => console.warn("Unknown action: " + name);
    }
  }
  const buttonActionMap = [];
  settings.controlSchemes[0].actions.forEach((action) => {
    action.keys.forEach((key) => {
      buttonActionMap[key] = () => getActionForName(action.name)();
    })
  })

  const setState = (mode, phrase, variation, speech, src) => {
    setCurrentMode(mode);
    setCurrentPhrase(phrase);
    setCurrentVariation(variation);

    playVariation(variations[variation]);
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
    <InputHelper
      buttonActionMap={buttonActionMap}
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
        onClick={() => repeat()}
      >
          Repeat
      </Button>
    </Box>
  </Box>
}
