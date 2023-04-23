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

export const settings = {
  filename: "settings.json",
  phrases: [
    {
      name: "Yes",
      // speach: "Agree",
      variations: [
        {
          // src: "yes.mp3",
          name: "Yes.",
          src: null,
        },
        {
          // src: "yes2.mp3",
          name: "Yeah?",
          src: null,
        },
      ],
    },
    {
      name: "No",
      // speach: "Decline",
      variations: [
        {
          name: "No",
          src: null,
          // src: "no.mp3",
        },
        {
          // src: "no2.mp3",
          src: null,
          name: "Nope!",
        },
      ],
    },
    {
      name: "One",
      // speach: "Ones",
      variations: [
        {
          // src: "one.mp3",
          name: "One",
          src: null,
        },
        {
          // src: "one2.mp3",
          name: "Uno!",
          src: null,
        },
      ],
    },
    {
      name: "Two",
      // speach: "Twos",
      variations: [
        {
          // src: "two.mp3",
          name: "Two",
          src: null,
        },
        {
          // src: "two2.mp3",
          name: "Dos!",
          src: null,
        },
      ],
    },
  ],
  modes: [
    {
      name: "Communication",
      // speach: "Communication mode",
      phrases: [
        "Yes",
        "No",
      ],
    },
    {
      name: "Numbers",
      // speach: "Number mode",
      phrases: [
        "One",
        "Two",
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
