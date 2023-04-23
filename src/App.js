import { Box, Button, Chip, MenuItem, Select, TextField, Typography } from '@mui/material';
import './App.css';
import { ButtonGroupSettings } from './InputSettings';
import GamepadTest from './GamepadTest';
import CommunicatorDisplay from './Communicator';
import CommunicatorInputSetup from './CommunicatorInputSetup';
import CommunicatorSoundsSetup from './CommunicatorSoundsSetup';
import { AccordionGroup } from './AccordionGroup';
import { useState } from 'react';
import { settings } from './Settings';


export const availableActions = [
  {
    id: 'action1',
    text: "Next phrase",
    function: someFunction,
  },
  {
    id: 'action2',
    text: "Previous phrase",
    function: someFunction,
  },
  {
    id: 'action3',
    text: "Next variation",
    function: someFunction,
  },
  {
    id: 'action4',
    text: "Previous variation",
    function: someFunction,
  },
];


function someFunction() {

}



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
  
  const accordionContents = [
    {
      title: 'Save / Load',
      content: "TODO: Save / Load buttons",
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
    //   content: <CommunicatorInputSetup />,
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
  return <GamepadTest />;
  return <ButtonGroupSettings  />

  return <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      // backgroundColor: 'darkslategray',
      // color: 'wheat',
    }}
  >
    <Layout />
  </Box>
}

export default App;

export function Layout() {
  console.log(settings);

  return <Box>
    <Typography
      variant="h1"
    >
      Communicator
    </Typography>

    <Box> {/* Save and load */}
      <Typography
        variant="h2"
      >
        Data
      </Typography>
      <Box>
        <Button>Save</Button>
        <Button>Load</Button>
        <Button>Show JSON</Button>
      </Box>
    </Box>
    
    <ControlSchemeSetup />
    
    <ModeSetup />

    <Box> {/* Start/stop */}
      <Button
        variant="outlined"
        onClick={() => {}}
      >
        Start / Stop
      </Button>
    </Box>
    <CommunicatorDisplay />

  </Box>;
}

export function PrevNextDisplay(title, items, index, onClick) {
  let nextItem = items[(index + 1) % items.length];
  let prevItem = items[(index + items.length + 1) % items.length];

  return <div>TODO: Prev/next</div>;
  return <Box>
    <Typography
      variant="h3"
    >
      {title}
    </Typography>
    <Button
      variant="outlined"
      onClick={() => onClick(index - 1)}
    >
      Prev
    </Button>
    <Typography
    >
      {prevItem}
    </Typography>
    <Typography
    >
      {items[index]}
    </Typography>
    <Typography
    >
      {nextItem}
    </Typography>
    <Button
      variant="outlined"
      onClick={() => onClick(index + 1)}
    >
      Next
    </Button>
  </Box>;
}

export function PhraseGroupBox() {

}

export function PhraseBox() {

}

export function VariationBox() {

}

export function ControlSchemeSetup() {
  

  return <Box> {/* Control scheme */}
    <Typography
      variant="h2"
    >
      Control scheme
    </Typography>
    <Box>
      {/* Dropdown with schemes and "Add New" option */}
      <Typography
        variant="h3"
      >
        Scheme name
      </Typography>
      <Select
        variant="outlined"
        value={0}
        onChange={() => {}}
        label="Control scheme"

      >
        {/* Row for each control scheme */}
        {settings.controlSchemes.map((scheme, index) => {
          <MenuItem value={index}>{scheme.name}</MenuItem>
        })}
        {/* "Add new" option */}
        <MenuItem value={-1}>Add new</MenuItem>
      </Select>
      <hr />
      <TextField
        variant="outlined"
        label="Scheme name"
        value={settings.controlSchemes[0].name}
        onChange={() => {}}
      />
      {/* Row for each button group */}
      {settings.controlSchemes[0].buttonGroups.map((buttonGroup, index) => {
        <Box>
          <Typography
            variant="h4"
          >
            Button group name
          </Typography>
          <TextField
            variant="outlined"
            label="Button group name"
            value={buttonGroup.name}
            onChange={() => {}}
          />
          <Button
            variant="outlined"
            onClick={() => {}}
          >
            Set buttons
          </Button>
          <Box>
            {buttonGroup.buttons.map((button, index) => {
              <Chip
                variant='outlined'
                label={button.id}
                onDelete={() => {}}
              />
            })}
          </Box>
          <Button
            variant="outlined"
            onClick={() => {}}
          >
            Delete
          </Button>
        </Box>
      })}

    </Box>
  </Box>;
}

export function ModeSetup() {
  return <Box> {/* Modes */}
    <Typography
      variant="h2"
    >
      Modes
    </Typography>
    <Box>
      <Select
        variant="outlined"
        value={0}
        onChange={() => {}}
        label="Mode"
      >
        {/* Row for each mode */}
        {settings.modes.map((mode, index) => {
          <MenuItem value={index}>{mode.name}</MenuItem>
        })}
        {/* "Add new" option */}
        <MenuItem value={-1}>Add new</MenuItem>
      </Select>
    </Box>
    <Box>
      <TextField
        variant="outlined"
        label="Mode name"
        value={settings.modes[0].name}
        onChange={() => {}}
      />
      <Box> {/* Phrases */}
        <Typography
          variant="h3"
        >
          Phrases
        </Typography>
        {/* Row for each phrase */}
        {settings.modes[0].phrases.map((phrase, index) => {
          <Box>
            <TextField
              variant="outlined"
              label="Phrase text"
              value={phrase.text}
              onChange={() => {}}
            />
            <Button
              variant="outlined"
              onClick={() => {}}
            >
              Add variations
            </Button>
            <Box>
              {/* Row for each variation */}
              {phrase.variations.map((variation, index) => {
                <Chip
                  variant='outlined'
                  label={variation.text}
                  onDelete={() => {}}
                />
              })}
            </Box>
            <Button
              variant="outlined"
              onClick={() => {}}
            >
              Delete
            </Button>
          </Box>
        })}
        <Button
          variant="outlined"
          onClick={() => {}}
        >
          Add phrase
        </Button>
      </Box>

      
    </Box>
  </Box>;
}

export function CommunicatorDisplay_old() {

  let currentMode = 0;
  let currentPhrase = 0;
  let currentVariation = 0;

  return <Box> {/* Communicator status */}
    <Typography
      variant="h2"
    >
      Communicator status
    </Typography>
    <Box> {/* Current mode */}
      <PrevNextDisplay
        title="Mode"
        items={settings.modes}
        index={0}
      />
    </Box>
    <Box> {/* Current phrase */}
      <PrevNextDisplay
        title="Phrase"
        items={settings.modes[0].phrases}
        index={0}
      />
    </Box>
    <Box> {/* Current variation */}
      <PrevNextDisplay
        title="Variation"
        items={settings.modes[0].phrases[0].variations}
        index={0}
      />
    </Box>
  </Box>;
}

// let settings = {
//   filename: "settings.json",
//   controlSchemes: [
//     {
//     name: "Left/Right",
//     buttonGroups: [
//         {
//           name: "Left",
//           buttons: [
//             {
//               id: 0,
//             },
//           ],
//           action: "nextPhrase",
//         },
//         {
//           name: "Right",
//           buttons: [
//             {
//               id: 1,
//             },
//           ],
//           action: "nextVariation",
//         },
//       ],

//     },
//   ],
//   modes: [
//     {
//       name: "Communication",
//       phrases: [
//         {
//           text: "Yes",
//           variations: [
//             {
//               text: "Hi",
//               src: "audio/yes/hi.mp3",
//             },
//             {
//               text: "Hello",
//               src: "audio/yes/hello.mp3",
//             },
//           ],
//         },
//         {
//           text: "No",
//           variations: [
//             {
//               text: "No",
//               src: "audio/no/no.mp3",
//             },
//             {
//               text: "Nope",
//               src: "audio/no/nope.mp3",
//             },
//           ],
//         },
//       ],
//     }
//   ]
// }

