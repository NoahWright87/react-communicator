import { Box, Button, Fade, Paper, Slide, Typography } from "@mui/material";
import { KeyboardDoubleArrowLeftTwoTone, KeyboardDoubleArrowRightTwoTone } from "@mui/icons-material";
import { useState } from "react";


export default function CommunicatorDisplay(props) {
  const [currentMode, setCurrentMode] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [currentVariation, setCurrentVariation] = useState(0);

  const settings = props.settings;
  const setSettings = props.setSettings;

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

export function PrevNextDisplay(props) {
  // const [slideDirection, setSlideDirection] = useState("left");

  const { title, items, index, setter } = props;

  const leftIndex = (index - 1 + items.length) % items.length;
  const rightIndex = (index + 1) % items.length;

  const displayItems = [
    items[leftIndex],
    items[index],
    items[rightIndex],
  ];

  return <Paper
    elevation={4}
    sx={{
      flex: 1,
      width: "100%",
      m: 1,
      p: 2,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Typography
      variant="h4"
      sx={{
        textAlign: "center",
        color: "primary.light",
      }}
    >
      {title}
    </Typography>
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",

      }}
    >
      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={() => {
          setter(leftIndex);
        }}

      >
        <KeyboardDoubleArrowLeftTwoTone
        />

        Prev
      </Button>

      {displayItems.map((item, i) => {
        return <Box
          key={i}
          sx={{
            flex: 2,
            textAlign: "center",
            color: i === 1 ? 'primary.main' : 'grey',
          }}
        >
          {/*
            TODO: Animations aren't working for some reason
                  The error says it can't read property 'style' of null
          */}
          {/* Slide left and right when changing current item */}
          {/* <Slide
            direction={slideDirection}
            // in={i === 1}
            // mountOnEnter
            // unmountOnExit
          > */}
            {item}
          {/* </Slide> */}

          {/* Fade out and in when changing current item */}
          {/* <Fade
            in={i === 1}
            mountOnEnter
            unmountOnExit
            className="fade"
          >
            {item}
          </Fade> */}
        </Box>
      })}
      
      <Button
        color="primary"
        size="large"
        variant="contained"
        sx={{
          flex: 1,
        }}
        onClick={() => {
          setter(rightIndex);
        }}
      >
        Next
        <KeyboardDoubleArrowRightTwoTone />
      </Button>

    </Box>

  </Paper>;
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