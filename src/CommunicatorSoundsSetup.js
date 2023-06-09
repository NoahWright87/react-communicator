import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Add, Close, Delete, Edit, PlayArrow, UploadFile } from '@mui/icons-material';
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { AccordionGroup } from './AccordionGroup';
import { playAudio, playNotes, speak } from './SoundPlayer';

export default function CommunicatorSoundsSetup(props) {
  const currentSettings = props.settings;
  const setSettings = props.setSettings;

  const setModesAndPhrases = (modes, phrases) => {
    const newSettings = { ...currentSettings };
    newSettings.settings.phrases = phrases;
    newSettings.settings.modes = modes;
    setSettings(newSettings);
  }

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
    var missingPhrases = newMode.phrases.filter(p => !newSettings.settings.phrases.find(p2 => p2.name === p));
    missingPhrases.forEach(p => {
      newSettings.settings.phrases.push({ name: p, variations: [] });
    });

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
            phrases={currentSettings.settings.phrases}
            setModesAndPhrases={setModesAndPhrases}
            availablePhrases={currentSettings.settings.phrases}
          />
        },
        // {
        //   title: "Text-to-speach",
        //   content: <div>TODO: TTS options</div>
        //   // TODO: Choose voice option for TTS
        //   // e.g.: window.speechSynthesis.getVoices()
        // },
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
    setNewPhrase(defaultNewPhrase);
  }
  const cancelDialog = () => {
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
          cancel={cancelDialog}
          phrase={newPhrase}
        />
      </Box>
    </Box>
  </>;
}
function PhraseDetails(props) {
  const [openDialog, setOpenDialog] = useState(false);
  const phrase = props.phrase.phrase ?? props.phrase;
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

  const clearFields = () => {
    setName(props.phrase.name);
    setVariations(props.phrase.variations);
  }
  const cancelClick = () => {
    cancel();
    clearFields();
  }

  const submitClick = () => {
    submit({
      name: name,
      variations: variations,
    });
    clearFields();
  }

  const addVariation = () => {
    setVariations([...variations, {
      name: "",
      src: null,
      type: "tts",
    }]);
  }
  const updateVariation = (index, variation) => {
    const newVariations = [...variations];
    newVariations[index] = variation;
    setVariations(newVariations);
  }
  const deleteVariation = (i) => {
    console.log("TODO: Delete variation index " + i);
    const newVariations = [...variations];
    newVariations.splice(i, 1);
    console.log("newVariations", newVariations);
    setVariations(newVariations);
  }

  const inputRef = useRef();
  const addFiles = (files) => {
    // Add a variation for each file
    const newVariations = [...variations];

    let proms = [];
    for (const file of files) {
      const fileReader = new FileReader();
      proms.push(new Promise((resolve, reject) => {
        fileReader.onload = () => {
          newVariations.push({
            type: "file",
            name: file.name,
            src: fileReader.result,
          });
          resolve();
        }
        fileReader.readAsDataURL(file);
      }));
    }
    Promise.all(proms).then(() => {
      setVariations(newVariations);
    });
  }


  return <Dialog
      open={open}
      onClose={cancelClick}
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
            <Button
              variant="outlined"
              component="label"
            >
              Batch upload
              <input
                hidden
                type="file"
                ref={inputRef}
                accept='audio/*'
                multiple={true}
                onChange={(e) => {
                  addFiles(e.target.files);
                }}
              />
            </Button>
          </Box>
          <DialogActions>
            <Button
              onClick={() => {
                submitClick();
              }}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                cancelClick();
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
  const [variationType, setVariationType] = useState(props.variation.type);
  const [variationNotes, setVariationNotes] = useState(props.variation.notes);

  const srcDisplay = variationSrc === null
    ? "None 🔇"
    : variationDisplay ?? variationSrc;

  const deleteVariation = props.deleteVariation;
  const updateVariation = props.updateVariation;

  const inputRef = useRef();
  const playSrc = (src) => {
    if (src === '') return;
    playAudio(src);
  }
  const chooseFile = (file) => {
    console.log("Choosing file", file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target.result;
      playSrc(src);
      updateVariation(props.index, {
        name: variationName ?? file.name,
        src: src,
        srcPath: file.path,
        display: file.name,
      });
      setVariationSrc(src);
      setVariationDisplay(file.name ?? src);
    }
    reader.readAsDataURL(file);
  }

  const ttsDisplay = <>
    <TextField
      sx={{
        flex: 1,
      }}
      variant="outlined"
      label="Words to speak"
      value={variationName}
      onChange={(e) => {setVariationName(e.target.value)}}
      onBlur={() => {
        updateVariation(props.index, {
          type: "tts",
          name: variationName,
          // src: variationSrc,
          src: null,
          display: variationDisplay,
        });
      }}
    />
    <Button
      sx={{
        flex: 0,
      }}
      variant="outlined"
      color="success"
      onClick={() => {
        // playSrc(variationSrc);
        speak(variationName);
      }}
    >
      <PlayArrow />
    </Button>
  </>
  const fileDisplay = <>
    <TextField
      sx={{
        flex: 1,
      }}
      variant="outlined"
      label="File name"
      value={srcDisplay}
    />
    <Button
      sx={{
        flex: 0,
      }}
      variant="outlined"
      component="label"
    >
      <FileUploadIcon />
      {/* Choose file */}
      <input
        hidden
        type="file"
        ref={inputRef}
        accept='audio/*'
        onChange={(e) => {
          chooseFile(e.target.files[0]);
        }}
      />
    </Button>
    <Button
      sx={{
        flex: 0,
      }}
      variant="outlined"
      color="success"
      onClick={() => {
        playSrc(variationSrc);
      }}
      enabled={variationSrc !== null}
    >
      <PlayArrow />
    </Button>
  </>

  const notesDisplay = <>
    <TextField
      sx={{
        // width: "25%",
        flex: 1,
      }}
      variant="outlined"
      label="Name"
      value={variationDisplay}
      onChange={(e) => {setVariationDisplay(e.target.value)}}
      onBlur={() => {
        updateVariation(props.index, {
          name: variationName,
          notes: variationNotes,
          src: null,
          display: variationDisplay,
        });
      }}
    />
    <TextField
      sx={{
        flex: 2,
      }}
      variant="outlined"
      label="Notes"
      value={variationNotes}
      onChange={(e) => {setVariationNotes(e.target.value)}}
      onBlur={() => {
        updateVariation(props.index, {
          name: variationName,
          notes: variationNotes,
          src: null,
          display: variationDisplay,
        });
      }}
    />
    <Button
      sx={{
        flex: 0,
      }}
      variant="outlined"
      color='success'
      onClick={() => {
        // playSrc(variationSrc);
        playNotes(variationNotes);
      }}
    >
      <PlayArrow />
    </Button>
  </>

  const typeDisplay = <>
    <FormControl
      variant="outlined"
      sx={{
        minWidth: 120,
        width: "25%",
        // flex: 0.5,
      }}
    >
      <InputLabel id="variation-type-label">Type</InputLabel>
      <Select
        labelId="variation-type-label"
        value={variationType}
        >
        <MenuItem
          value="tts"
          onClick={() => {
            setVariationType("tts");
          }}
        >
          Text to speech
        </MenuItem>
        <MenuItem
          value="file"
          onClick={() => {
            setVariationType("file");
          }}
        >
          File
        </MenuItem>
        <MenuItem
          value="notes"
          onClick={() => {
            setVariationType("notes");
          }}
        >
          Notes
        </MenuItem>
      </Select>
    </FormControl>
  </>

  return <Box
    key={props.index}
    sx={{
      display: "flex",
      flexDirection: "row",
      my: 1,
    }}
  >
    {typeDisplay}
    {variationType === "tts" && ttsDisplay}
    {variationType === "file" && fileDisplay}
    {variationType === "notes" && notesDisplay}
    <Button
      sx={{
        flex: 0,
        ml: "auto",
      }}
      variant="outlined"
      color="error"
      size="xs"
      
      onClick={() => {deleteVariation(props.index)}}
    >
      <Close />
    </Button>
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

  const inputRef = useRef();
  const importFolders = (folders) => {
    const modes = props.modes.slice();
    const phrases = props.phrases.slice();

    for(const folder of folders) {
      const parts = folder.webkitRelativePath.split("/");
      // Make sure we have mode + phrase + variation
      if (parts.length < 3) {
        continue;
      }

      const variationName = parts[parts.length - 1];
      const phraseName = parts[parts.length - 2];
      const modeName = parts[parts.length - 3];

      // Check for existing mode
      let mode = modes.find((mode) => {
        return mode.name === modeName;
      });
      if (mode === undefined) {
        mode = {
          name: modeName,
          phrases: [],
        };
      }

      // Check for existing phrase
      let phrase = phrases.find((phrase) => {
        return phrase.name === phraseName;
      });
      if (phrase === undefined) {
        phrase = {
          name: phraseName,
          variations: [],
        };
        phrases.push(phrase);
      }
      // Does the mode already have this phrase?
      const matchingPhrase = mode.phrases.find((phrase) => {
        return phrase.name === phraseName;
      });
      if (matchingPhrase === undefined) {
        mode.phrases.push(phrase);
      }
      
      // Check for existing variation
      let variation = phrase.variations.find((variation) => {
        return variation.name === variationName;
      });
      if (variation === undefined) {
        const reader = new FileReader();
        reader.readAsDataURL(folder);
        reader.onload = () => {
          const src = reader.result;
          variation = {
            type: "file",
            name: variationName,
            src: src,
            display: variationName,
            notes: "",
          };
          phrase.variations.push(variation);
        }
      }

      // Add mode if it's new
      const matchingMode = props.modes.find((mode) => {
        return mode.name === modeName;
      });
      if (matchingMode === undefined) {
        props.addMode(mode);
      }
    }
    props.setModesAndPhrases(modes, phrases);
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
      <Button
        variant="outlined"
        color="success"
        component="label"
        sx={{
          ml: 1,
        }}
      >
        <UploadFile />
        Import folder(s)
        <input
          type="file"
          ref={inputRef}
          onChange={(e) => {
            importFolders(e.target.files);
            inputRef.current.value = "";
          }}
          style={{display: "none"}}
          webkitdirectory=""
          mozdirectory=""
          directory=""
        />
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
          label={phrase.name ?? phrase}
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

  const clearFields = () => {
    setName(mode.name);
    setPhrases(mode.phrases);
  }

  const submit = () => {
    props.submit({
      name: name,
      phrases: phrases,
    });
    clearFields();
  }
  const cancel = () => {
    props.cancel();
    clearFields();
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
