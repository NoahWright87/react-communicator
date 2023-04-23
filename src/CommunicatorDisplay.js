import { Box } from "@mui/material";
import { useState } from "react";
import { PrevNextDisplay } from "./Components/PrevNextDisplay";


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

  const setState = (mode, phrase, variation, speach, src) => {
    setCurrentMode(mode);
    setCurrentPhrase(phrase);
    setCurrentVariation(variation);

    if (src) {
      playAudio(src);
    } else if (speach) {
      speak(speach);
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

  </Box>
}

function speak(words) {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(words);
    window.speechSynthesis.speak(utterance);
  }
}

function playAudio(src) {
  if (!src) {
    return;
  }
  const audio = new Audio(src);
  audio.play();
}