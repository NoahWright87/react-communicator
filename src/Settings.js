import { furElise, happyBirthday, jingleBells, maryHadaLittleLamb, odeToJoy, twinkleTwinkle } from "./Melodies";

// Map of action names to human-readable strings
export const actions = {
  nextPhrase: "Next phrase",
  previousPhrase: "Previous phrase",
  nextVariation: "Next variation",
  previousVariation: "Previous variation",
  nextMode: "Next mode",
  previousMode: "Previous mode",
  repeat: "Repeat",
}

export const audioTypes = [
  "tts",
  "file",
  "notes",
]

export const settings = {
  phrases: [
    {
      name: "Yes",
      variations: [
        {
          name: "Yes.",
        },
        {
          name: "Yeah?",
        },
      ],
    },
    {
      name: "No",
      variations: [
        {
          name: "No",
        },
        {
          name: "Nope!",
        },
      ],
    },
    {
      name: "One",
      variations: [
        {
          name: "One",
        },
        {
          name: "Uno!",
        },
      ],
    },
    {
      name: "Two",
      variations: [
        {
          name: "Two",
        },
        {
          name: "Dos!",
        },
      ],
    },
    {
      name: "Music synths",
      variations: [
        {
          name: "Mary had a little lamb",
          notes: maryHadaLittleLamb
        },
        {
          name: "Twinkle twinkle little star",
          notes: twinkleTwinkle
        },
        {
          name: "Jingle Bells",
          notes: jingleBells
        },
        {
          name: "Happy Birthday",
          notes: happyBirthday
        },
        {
          name: "Fur Elise",
          notes: furElise
        },
        {
          name: "Ode to Joy",
          notes: odeToJoy
        }
      ],
    }
  ],
  modes: [
    {
      name: "Communication",
      phrases: [
        "Yes",
        "No",
      ],
    },
    {
      name: "Numbers",
      phrases: [
        "One",
        "Two",
      ],
    },
    {
      name: "Music",
      phrases: [
        "Music synths",
      ],
    }
  ],
  controlSchemes: [
    {
      name: "Left/Right/Top",
      actions: [
        {
          name: actions.repeat,
          keys: [
            'G0-B8',
            'G0-B9',
            'Space'
          ],
        },
        {
          name: actions.nextPhrase,
          keys: [
            "ArrowLeft",
            "G0-Axis0+",
            "G0-Axis0-",
            "G0-Axis1+",
            "G0-Axis1-",
          ],
        },
        {
          name: actions.nextVariation,
          keys: [
            "ArrowRight",
            "G0-B0",
            "G0-B1",
            "G0-B7",
            "G0-B3",
            "G0-B4",
            "G0-B6",
          ],
        },
      ]
    },
    // {
    //   name: "Numpad",
    //   actions: [
    //     {
    //       name: actions.nextPhrase,
    //       buttons: [
    //         {
    //           id: 'numpad 1',
    //         },
    //       ],
    //     },
    //     {
    //       name: actions.nextVariation,
    //       buttons: [
    //         {
    //           id: 'numpad 2',
    //         },
    //       ],
    //     },
    //   ],
    // },
  ],
};



export const OLD_settings = {
  filename: "settings.json",
  modes: [
    {
      name: "Communication",
      speach: "Communication mode",
      phrases: [
        {
          name: "Yes",
          speach: "Agree",
          variations: [
            {
              // src: "yes.mp3",
              speach: "Yes.",
            },
            {
              // src: "yes2.mp3",
              speach: "Yeah?",
            },
          ],
        },
        {
          name: "No",
          speach: "Decline",
          variations: [
            {
              src: "no.mp3",
              speach: "No.",
            },
            {
              src: "no2.mp3",
              speach: "Nope!",
            },
          ],
        },
      ],
    },
    {
      name: "Numbers",
      speach: "Number mode",
      phrases: [
        {
          name: "One",
          speach: "Ones",
          variations: [
            {
              // src: "one.mp3",
              speach: "One",
            },
            {
              // src: "one2.mp3",
              speach: "Uno!",
            },
          ],
        },
        {
          name: "Two",
          speach: "Twos",
          variations: [
            {
              // src: "two.mp3",
              speach: "Two",
            },
            {
              // src: "two2.mp3",
              speach: "Dos!",
            },
          ],
        },
      ],
    },
  ],
  controlSchemes: [
    {
      name: "Left/Right",
      actions: [
        {
          name: actions.nextPhrase,
          buttons: [
            {
              id: 'left alt',
            },
            {
              id: 'left shift',
            },
            {
              id: 'left ctrl',
            },
          ],
        },
        {
          name: actions.nextVariation,
          buttons: [
            {
              id: 'right alt',
            },
            {
              id: 'right shift',
            },
            {
              id: 'right ctrl',
            },
          ],
        },
      ]
    },
    {
      name: "Numpad",
      actions: [
        {
          name: actions.nextPhrase,
          buttons: [
            {
              id: 'numpad 1',
            },
          ],
        },
        {
          name: actions.nextVariation,
          buttons: [
            {
              id: 'numpad 2',
            },
          ],
        },
      ],
    },
  ],
};

/*
====================
NEW SETTINGS???
====================
// TODO: Make new settings based on this layout:

Save / Load
  Name
  Save as...
  Load
Sounds
  Phrases (list)
    Phrase name
    {n} variations
    [Edit] [Delete]
        << Edit phrase pop-up >>
        <Optional> Phrase name
        {n} variations
        [=== repeating rows
          <Optional> Variation name??



              Once it gets this deep I lose track of what I'm doing
              I'm going to make the smallest bit first and work up
              scroll further down





        ===]
        [Add variation] [Delete]
Modes
Input
Communicator
  (left right dials for control scheme, mode, phrase, variation)





Edit variation pop-up:
<Title: Edit {phrase name} variation
<Optional> Variation name:______________
[ ] [Drop-down of public-domain sounds]  
[ ] { filename | null } [ Select... ]
[ ] (label:Text-to-speech) [ text input field ]

[Save] [Cancel]


Edit phrase pop-up / row?:
<Title: Edit phrase
<Optional> Phrase name:______________
[=== repeating rows
  [ Edit ] 
  { variation name | type -- value (eg: src filename, tts input) }
  [ Delete ]
===]
[Add new variation]


*/ 
