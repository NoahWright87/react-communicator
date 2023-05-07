import { Add, Delete, Edit } from '@mui/icons-material';
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { AccordionGroup } from './AccordionGroup';

export default function CommunicatorSoundsSetup(props) {
  const currentSettings = props.settings;
  const setSettings = props.setSettings;

  const setPhrase = (phrase, index) => {
    const newSettings = { ...currentSettings };
    newSettings.settings.phrases[index] = phrase;
    setSettings(newSettings);
  }
  const addPhrase = (newPhrase) => {
    const newSettings = { ...currentSettings };
    newSettings.settings.phrases.push(newPhrase);
    setSettings(newSettings);
  }
  const deletePhrase = (index) => {
    const newSettings = { ...currentSettings };
    newSettings.settings.phrases.splice(index, 1);
    setSettings(newSettings);
  }

  const setMode = (mode, index) => {
    const newSettings = { ...currentSettings };
    newSettings.settings.modes[index] = mode;
    setSettings(newSettings);
  }
  const addMode = (newMode) => {
    const newSettings = { ...currentSettings };
    newSettings.settings.modes.push(newMode);
    setSettings(newSettings);
  }
  const deleteMode = (index) => {
    const newSettings = { ...currentSettings };
    newSettings.settings.modes.splice(index, 1);
    setSettings(newSettings);
  }

  return <>
    <AccordionGroup
      accordions={[
        {
          title: "Phrases",
          content: <PhrasesSection 
            phrases={currentSettings.settings.phrases}
            // setPhrases={setSettings}
            setPhrase={setPhrase}
            addPhrase={addPhrase}
            deletePhrase={deletePhrase}
          />
        },
        {
          title: "Modes",
          content: <ModesSection
            modes={currentSettings.settings.modes}
            updateMode={setMode}
            addMode={addMode}
            deleteMode={deleteMode}
            availablePhrases={currentSettings.settings.phrases}
          />
        },
        {
          title: "Text-to-speach",
          content: <div>TODO: TTS options</div>
          // TODO: Choose voice option for TTS
          // e.g.: window.speechSynthesis.getVoices()
        },
      ]}
    />
    
  </>
}

function PhrasesSection(props) {
  const phrases = props.phrases;
  const setPhrase = props.setPhrase;
  const addPhrase = props.addPhrase;
  const deletePhrase = props.deletePhrase;

  const defaultNewPhrase = {
    name: "New phrase",
    variations: [],
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newPhrase, setNewPhrase] = useState(defaultNewPhrase);

  const addPhraseClick = () => {
    setNewPhrase(defaultNewPhrase);
    setDialogOpen(true);
  }
  const submitDialog = (newPhrase) => {
    addPhrase(newPhrase);
    setDialogOpen(false);
  }


  return <>
    <Box>
      <Box>
        {/* TODO: Header row?? */}
      </Box>
      {phrases.map((phrase, i) => {
        return <PhraseDetails
          phrase={phrase}
          setPhrase={setPhrase}
          deletePhrase={deletePhrase}
          index={i}
        />
      })}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: 2,
        }}
      >
        <Button
          variant="outlined"
          size="large"
          color='success'
          onClick={addPhraseClick}
        >
          <Add />
          Add phrase
        </Button>
        <PhraseEditDialog
          open={dialogOpen}
          submit={submitDialog}
          cancel={() => {setDialogOpen(false)}}
          phrase={newPhrase}
        />
      </Box>
    </Box>
  </>;
}
function PhraseDetails(props) {
  const [openDialog, setOpenDialog] = useState(false);
  const phrase = props.phrase;
  const setPhrase = props.setPhrase;
  const deletePhrase = props.deletePhrase;

  const submitDialog = (newPhrase) => {
    setPhrase(newPhrase, props.index);
    setOpenDialog(false);
  }
  const cancelDialog = () => {
    setOpenDialog(false);
  }

  return <Box
    key={phrase.name}
    sx={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      my: 1,
    }}
  >
    {/* TODO: Consider putting these in locked textboxes */}
    {/* Phrase name */}
    <Typography
    >
      {phrase.name}
    </Typography>

    {/* Number of variations */}
    <Typography
    >
      {phrase.variations.length} variation(s)
    </Typography>

    {/* Edit button */}
    <Box
      sx={{
        display: 'flex',
        py: 1,
      }}
    >
      <Button
        variant="contained"
        onClick={() => {setOpenDialog(true)}}
      >
        <Edit />
      </Button>

      {/* Delete button */}
      <Button
        variant="contained"
        color="error"
        onClick={() => {deletePhrase(props.index)}}
      >
        <Delete />
      </Button>
    </Box>
    <PhraseEditDialog
      open={openDialog}
      submit={submitDialog}
      cancel={cancelDialog}
      phrase={phrase}
    />
  </Box>
}
function PhraseEditDialog(props) {
  const open = props.open;
  const submit = props.submit;
  const cancel = props.cancel;

  const [name, setName] = useState(props.phrase.name);
  const [variations, setVariations] = useState(props.phrase.variations);

  const addVariation = () => {
    setVariations([...variations, {
      name: "",
      src: null,
    }]);
  }
  const updateVariation = (index, variation) => {
    console.log("updateVariation", index, variation);

    const newVariations = [...variations];
    newVariations[index] = variation;
    setVariations(newVariations);


    // setVariations(variations.map((variation, i) => {
    //   if (i === from) {
    //     return to;
    //   }
    //   return variation;
    // }));
  }
  const deleteVariation = (i) => {
    console.log("TODO: Delete variation index " + i);
    const newVariations = [...variations];
    newVariations.splice(i, 1);
    console.log("newVariations", newVariations);
    setVariations(newVariations);
    // setVariations(variations.filter((variation, index) => index !== i));

    // setVariations(variations.filter((variation, i) => i !== index));
    // setVariations(variations.filter((variation) => variation.name !== variationName));
  }


  return <Dialog
      open={open}
      onClose={cancel}
      // key={name}
    >
      <DialogTitle>
        Edit phrase
      </DialogTitle>
      <DialogContentText>
        {/* Instructions go here? */}
        TODO: Delete button deletes the right index but doesn't update
        to UI correctly -- it looks like it deleted the last item only.
      </DialogContentText>
      <DialogContent>
        <TextField
          variant="outlined"
          label="Phrase name"
          value={name}
          onChange={(e) => {setName(e.target.value)}}
        />
        {/* TODO: Info button with pop-up */}

        <Box
          sx={{
          }}
        >
          <Typography
            variant="h4"
          >
            Variations
          </Typography>
          {/* List of variations */}
          {variations?.length === 0
          ? <div>No variations... yet!</div>
          : variations.map((variation, i) => {
            return <VariationDetails
              key={i}
              index={i}
              variation={variation}
              deleteVariation={deleteVariation}
              updateVariation={updateVariation}
            />
          })}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Button
              variant="outlined"
              color="success"
              onClick={addVariation}
            >
              Add variation
            </Button>
          </Box>
          <DialogActions>
            <Button
              onClick={() => {
                // console.log("saving phrase", name, variations);
                submit({
                  name: name,
                  variations: variations,
                });
              }}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setName(props.phrase.name);
                setVariations(props.phrase.variations);
                cancel();
              }}
              color="warning"
            >
              Cancel
            </Button>
          </DialogActions>
          
        </Box>
      </DialogContent>
  </Dialog>
}
function VariationDetails(props) {
  const [variationName, setVariationName] = useState(props.variation.name);
  const [variationSrc, setVariationSrc] = useState(props.variation.src);
  const [variationDisplay, setVariationDisplay] = useState(props.variation.display);

  const srcDisplay = variationSrc === null
    ? "None 🔇"
    : variationDisplay ?? variationSrc;

  const deleteVariation = props.deleteVariation;
  const updateVariation = props.updateVariation;

  const inputRef = useRef();
  const playSrc = (src) => {
    if (src === '') return;
    const audio = new Audio(src);
    audio.play();
  }
  const chooseFile = (path) => {
    console.log("Choosing file", path);

    const src = URL.createObjectURL(path);
    playSrc(src);
    updateVariation(props.index, {
      name: variationName,
      src: src,
      display: path.name ?? src,
    });
    setVariationSrc(src);
    setVariationDisplay(path.name ?? src);
  }

  return <Box
      key={props.index}
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {/* Variation name (also the TTS words) */}
      <TextField
        variant="outlined"
        label="Variation name"
        value={variationName}
        onChange={(e) => {setVariationName(e.target.value)}}
        // onBlur={() => {updateVariation(variationName)}}
        // onBlur={() => console.log("blurrrrr")}
        onBlur={() => {
          updateVariation(props.index, {
            name: variationName,
            src: variationSrc,
            display: variationDisplay,
          });
        }}
      />
  
      {/* Sound source's filename */}
      <TextField
        variant="outlined"
        label="Sound source"
        // TODO: Only show the filename, not the path
        // value={props.variation.src ?? ""}
        // value={variationSrc ?? "🔇"}
        value={srcDisplay}
        disabled
        // TODO: Have a decorator to clear this
      />
  
      {/* Choose sound button */}
      <Button
        variant="outlined"
        // onClick={() => {alert('TODO: Choose sound')}}
        component="label"
      >
        Choose sound
        <input
          hidden
          type="file"
          ref={inputRef}
          accept='audio/*'
          onChange={(e) => {
            console.log("e.target.files", e.target.files);
            chooseFile(e.target.files[0]);
          }}
        />
      </Button>
  
      {/* Remove sound button */}
      <Button
        variant="contained"
        color="error"
        onClick={() => {deleteVariation(props.index)}}
      >
        X
      </Button>


      {/* TODO EVENTUALLY: Let them pick from default sounds */}
    </Box>
}
function ModesSection(props) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const newMode = {
    name: "New mode",
    phrases: [],
  };

  const submitDialog = (newMode) => {
    props.addMode(newMode);

    setDialogOpen(false);
  }

  return <>
    {/* List of modes */}
    <Box
    >
      {props.modes.map((mode, i) => {
        return <ModeDetails
          key={i}
          index={i}
          mode={mode}
          availablePhrases={props.availablePhrases}
          updateMode={props.updateMode}
          deleteMode={props.deleteMode}
        />
      })}
    </Box>

    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Button
        variant="outlined"
        color="success"
        onClick={() => setDialogOpen(true)}
      >
        <Add />
        Add mode
      </Button>
    </Box>

    <ModeEditDialog
      open={dialogOpen}
      submit={submitDialog}
      cancel={() => setDialogOpen(false)}
      mode={newMode}
      availablePhrases={props.availablePhrases}
    />
  </>
}
function ModeDetails(props) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const cancel = () => {
    setDialogOpen(false);
  }
  const submit = (mode) => {
    props.updateMode(mode, props.index);

    setDialogOpen(false);
  }
  

  return <Box
    key={props.index}
    sx={{
      display: "flex",
      flexDirection: "row",
      // alignItems: "center",
      justifyContent: "space-between",
      my: 1.5,
    }}
  >
    <TextField
      variant="outlined"
      label="Mode name"
      value={props.mode.name}
    />

    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {props.mode.phrases.map((phrase, i) => {
        return <Chip
          key={i}
          label={phrase}
        />
      })}
    </Box>
    <ModeEditDialog
      open={dialogOpen}
      submit={submit}
      cancel={cancel}
      mode={props.mode}
      availablePhrases={props.availablePhrases}
    />

    <Box
      sx={{
        display: 'flex',
        py: 1,
      }}
    >
      <Button
        variant="contained"
        onClick={() => {setDialogOpen(true)}}
        color='info'
      >
        <Edit />
      </Button>

      <Button
        variant="contained"
        color="error"
        onClick={() => {props.deleteMode(props.index)}}
      >
        <Delete />
      </Button>
    </Box>
  </Box>
}
function ModeEditDialog(props) {
  const open = props.open;
  const mode = props.mode;
  const availablePhrases = props.availablePhrases;

  const [name, setName] = useState(mode.name);
  const [phrases, setPhrases] = useState(mode.phrases);

  const submit = () => {
    props.submit({
      name: name,
      phrases: phrases,
    });
  }
  const cancel = () => {
    setName(mode.name);
    setPhrases(mode.phrases);
    props.cancel();
  }


  return <Dialog
    open={open}
    onClose={cancel}
    fullWidth
  >
    <DialogTitle
      sx={{
        bgcolor: 'primary.dark',
        marginBottom: 1,
      }}
    >
      Edit mode
    </DialogTitle>
    <DialogContent
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TextField
        variant="outlined"
        label="Mode name"
        value={name}
        onChange={(e) => {setName(e.target.value)}}
        sx={{
          my: 1,
        }}
      />
      <FormControl
        sx={{
          my: 1,
        }}
      >
        <InputLabel
          id="mode-phrase-select-label"
        >
          Phrases
        </InputLabel>
        <Select
          labelId="mode-phrase-select-label"
          multiple
          value={phrases}
          onChange={(e) => {setPhrases(e.target.value)}}
        >
          {availablePhrases.map((phrase) => (
            <MenuItem
              key={phrase.name}
              value={phrase.name}
            >
              {phrase.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <DialogActions>
        <Button
          onClick={cancel}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {submit(name, phrases)}}
        >
          Save
        </Button>
      </DialogActions>
    </DialogContent>
  </Dialog>
}
