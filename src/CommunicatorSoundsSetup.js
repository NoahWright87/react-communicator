import { useRef, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';
import { AccordionGroup } from './AccordionGroup';

export default function CommunicatorSoundsSetup(props) {
  const currentSettings = props.settings;
  const setSettings = props.setSettings;

  // console.log("currentSettings", currentSettings);
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

  return <>
    <AccordionGroup
      accordions={[
        {
          title: "Phrases",
          content: <NewPhrasesSection 
            phrases={currentSettings.settings.phrases}
            // setPhrases={setSettings}
            setPhrase={setPhrase}
            addPhrase={addPhrase}
          />
        },
        {
          title: "Modes",
          content: <NewModesSection

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
    {/* <Box>
      {currentSettings.settings.modes.map(mode => {
        return <ModeDetailRow
          mode={mode}
          phrases={mode.phrases}
        />
      })}
    </Box> */}
    
  </>
}

function NewPhrasesSection(props) {
  const phrases = props.phrases;
  const setPhrase = props.setPhrase;
  const addPhrase = props.addPhrase;

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
        return <NewPhraseDetails
          phrase={phrase}
          setPhrase={setPhrase}
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
          // onClick={() => {props.addPhrase({
          //   name: "New phrase",
          //   variations: [],
          // })}}
          onClick={addPhraseClick}
        >
          Add new phrase
        </Button>
        <NewPhraseEditDialog
          // open={false}
          open={dialogOpen}
          // submit={addPhrase}
          submit={submitDialog}
          cancel={() => {setDialogOpen(false)}}
          phrase={defaultNewPhrase}
        />
      </Box>
    </Box>
  </>;
}
function NewPhraseDetails(props) {
  // This function is the (uneditable) row for a phrase
  const [openDialog, setOpenDialog] = useState(false);
  // const [phrase, setPhrase] = useState(props.phrase);
  const phrase = props.phrase;
  const setPhrase = props.setPhrase;

  const submitDialog = (newPhrase) => {
    // console.log("submitting newPhrase", newPhrase);
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
      justifyContent: "space-around",
      my: 1,
    }}
  >
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
    <Button
      variant="outlined"
      onClick={() => {setOpenDialog(true)}}
    >
      Edit
    </Button>

    {/* Delete button */}
    <Button
      variant="outlined"
      color="error"
      onClick={() => {alert('TODO: Delete phrase after "are you sure?" prompt')}}
    >
      Delete
    </Button>
    <NewPhraseEditDialog
      open={openDialog}
      submit={submitDialog}
      cancel={cancelDialog}
      phrase={phrase}
    />
  </Box>
}
function NewPhraseEditDialog(props) {
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
          {variations?.length == 0
          ? <div>No variations... yet!</div>
          : variations.map((variation, i) => {
            return <NewVariationDetails
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
function NewVariationDetails(props) {
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
function NewModesSection(props) {

  return <>
    {/* Header */}

    {/* List of modes */}

    {/* Add new mode button */}

  </>
}
function NewModeDetails(props) {

  return <>
    {/* Mode name */}

    {/* Multi-select of phrases */}

    {/* Delete button */}

  </>
}

function ModeDetailRow(props) {
  // console.log("mode props: ", props);
  
  const modeName = props.mode.name;
  const phrases = props.phrases;

  return <>
    <Box>
      <Typography
        variant="h2"
      >
        {modeName}
      </Typography>
      <Box>
        {phrases.map(phrase => {
          return <PhraseDetailRow
            phrase={phrase}
            variations={phrase.variations}
          />
        })}
      </Box>
    </Box>
  </>
}

function PhraseDetailRow(props) {
  // console.log("phrase props: ", props);
  const phraseName = props.phrase.name;
  const variations = props.variations;

  console.log("variations", variations);

  return <Box
    key={phraseName}
  >
    <Typography
      variant="h3"
    >
      {phraseName}
    </Typography>
    <Box>
      {variations.map(variation => {
        return <VariationDetailRow
          variation={variation}
        />
      })}
    </Box>
  </Box>
}

function VariationDetailRow(props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [variation, setVariation] = useState(props.variation);

  const submitDialog = (updatedVariation) => {
    setVariation(updatedVariation);
    setOpenDialog(false);
  };
  const cancelDialog = () => {
    console.log("canceling dialog");
    setOpenDialog(false);
  };

  // console.log("variation props: ", props);

  // const variationName = props.variation.name;
  const src = variation.src;
  const speach = variation.speach;

  return <>
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {/* TODO: Input fields instead */}
      {/* <Typography>
        {variationName}
      </Typography> */}
      
      <Typography>
        {src}
      </Typography>
      <Typography>
        {speach}
      </Typography>
      {/* <TextField
        label="Speach"
        value={speach}
      /> */}
      <Button
        variant="contained"
        color="info"
        onClick={() => setOpenDialog(true)}
      >
        Edit
      </Button>
      <VariationDialog
        open={openDialog}
        submit={submitDialog}
        cancel={cancelDialog}
        variation={variation}
        // setOpen={setOpenDialog}
        // variation={variation}
        // setVariation={setVariation}
      />
    </Box>
  </>
}

function VariationDialog(props) {
  // console.log("dialog props: ", props);
  const open = props.open;
  const submit = props.submit;
  const cancel = props.cancel;

  const [name, setName] = useState(props.variation.name);
  const [src, setSrc] = useState('');
  const [speach, setSpeach] = useState(props.variation.speach);

  const inputRef = useRef();

  const setSrcAndPlay = (src) => {
    if (src === '') return;
    playSrc(src);
  }
  const playSrc = (src) => {
    if (src === '') return;

    // Play the audio file
    const audio = new Audio(src);
    audio.play();
  }
  

  return <>
    <Dialog
      open={open}
      onClose={cancel}
      // onClose={() => setOpen(false)}
      sx={{
        // width: "50%",
        // height: "50%",
        // position: "absolute",
        // top: "25%",
        // left: "25%",
        // p: 2,
      }}
    >
      <DialogTitle>
        Edit Variation '{props.variation?.name}'
      </DialogTitle>
      <DialogContentText>
        Edit the speach and/or upload a new file.
      </DialogContentText>
      <DialogContent>
        <TextField 
          label="Name"
          value={name}
          variant='standard'
          autoFocus
          fullWidth
          margin='dense'
          id='name'
          type='text'
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          label="Speach"
          value={speach}
          variant='standard'
          fullWidth
          margin='dense'
          id='speach'
          type='text'
          onChange={(e) => {
            setSpeach(e.target.value);
          }}
        />
        {/* File picker */}
        {/* <TextField
          label="Filename"
          value={src}
          variant='standard'
          fullWidth
          margin='dense'
          id='src'
          type='file'
          inputRef={inputRef}
          onChange={(e) => {
            console.log(e);
            setSrc(e.target.value);
            // Play the audio file
            // const audio = new Audio(e.target.value);
            const audio = new Audio(URL.createObjectURL(e.target.files[0]));
            const audio2 = new Audio(inputRef.current.files[0]);
            audio.play();
            
            // audio2.play();
            console.log("audio: ", audio);
            console.log("audio2: ", audio2);
          }}
        /> */}
        {/* <Button variant="contained" component="label">
        Upload
        <input hidden accept="image/*" multiple type="file" />
      </Button> */}
        <Button
          variant="contained"
          color="success"
          component="label"
        >
          Upload
          <input
            hidden
            accept='audio/*' 
            type='file'
            ref={inputRef}
            onChange={(e) => {
              console.log(e);
              // console.log("inputRef: ", inputRef);
              // console.log("inputRef files: ", inputRef?.current?.files);
              // const audio = new Audio(URL.createObjectURL(e.target.files[0]));
              // audio.play();

              setSrcAndPlay(URL.createObjectURL(e.target.files[0]));
              
              // console.log("ref", ref);
            }}
          // ref={inputRef} 
            // onChange={(e) => {
            //   console.log(e);
            //   setSrc(e.target.value);
            //   // Play the audio file
            //   // const audio = new Audio(e.target.value);
            //   const audio = new Audio(URL.createObjectURL(e.target.files[0]));
            //   const audio2 = new Audio(inputRef.current.files[0]);
            //   audio.play();
              
            //   // audio2.play();
            //   console.log("audio: ", audio);
            //   console.log("audio2: ", audio2);
            // }}
          />
        </Button>
        <Typography>
          {src === '' ? 'No file selected' : <Button
            onClick={() => playSrc(src)}
            color="info"
          >
            Preview
          </Button>}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="info"
          onClick={() => {
            const newVariation = {
              ...props.variation,
              speach: speach,

            };

            submit(newVariation);
          }}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={cancel}
        >
          Cancel
        </Button>
        {/* <Button
          variant="contained"
          color="error"
        >
          Delete
        </Button> */}
      </DialogActions>
    </Dialog>
  </>
}