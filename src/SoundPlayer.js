import { duration } from '@mui/material';
import * as Tone from 'tone';

let synths = [];
let trackParts = [];

let seq;
let synth;
let pitchShift, reverb, distortion;
let beatAssist = true;

let activeSynthId;
let interruptTracks = false;


export function initSynth() {
  synth = new Tone.Synth().toDestination();
  // synth.chain(pitchShift, distortion);
  
  // Tone.Transport.bpm.value = 120;
}
export function initSynths() {
  synths = [
    new Tone.Synth().toDestination(),
    new Tone.AMSynth().toDestination(),
    new Tone.FMSynth().toDestination(),
    new Tone.DuoSynth().toDestination(),
    new Tone.PolySynth().toDestination(),
    new Tone.MembraneSynth().toDestination(),
  ];

  // Make poly synth deeper
  synths[4].set({
    oscillator: {
      type: "sine",
    },
    envelope: {
      attack: 0.1,
      decay: 0.1,
      sustain: 0.1,
      release: 0.1,
    },
  });

  pitchShift = new Tone.PitchShift().toDestination();
  reverb = new Tone.Reverb().toDestination();
  distortion = new Tone.Distortion().toDestination();
}

export function toggleBeatAssist({args}) {
  this.beatAssist = args;
  console.log("Beat assist: " + (this.beatAssist ? "on" : "off"));
}

export function toggleAudioInterrupt({args}) {
  interruptTracks = args;
  console.log("Audio interrupt: " + (interruptTracks ? "on" : "off"));
}

export function setActiveSynth({args}) {
  activeSynthId = args;
  // console.log("Active synth: " + activeSynthId);
  if (synths && synths[activeSynthId]) {
    synth = synths[activeSynthId];
    console.log("Synth: " + synth);
  }
}

export function setBpm(bpm) {
  console.log("Setting BPM not implemented");
  // console.log("Setting bpm to " + bpm)
  // Tone.Transport.bpm.rampTo(bpm, 1);
}
export function shiftPitch(amount) {
  console.log("Shifting pitch not implemented")
  // console.log("Shifting pitch by " + amount)
  // pitchShift.pitch = amount;
}
export function setReverb(amount) {
  console.log("Setting reverb not implemented")
  // console.log("Setting reverb to " + amount)
  // reverb.decay = amount;
}
export function setSynthDistortion(amount) {
  console.log("Setting synth distortion not implemented")
  // console.log("Setting distortion to " + amount)
  // distortion.distortion = amount;
}
export function setSynthVolume(amount) {
  console.log("Setting synth volume not implemented")
  // console.log("Setting synth volume to " + amount)
  // synth.volume.value = amount;
}


const rest = "4n";

export function playVariation(variation) {
  if (variation.src) {
    playAudio(variation.src);
  } else if (variation.notes) {
    playNotes(variation.notes);
  } else if (variation.name) {
    speak(variation.name);
  }
}

const noteTime = 0.25;
const restEvent = {
  // time: t,
  note: rest,
  velocity: 1.0,
  length: noteTime,
}
export function parseNoteString(noteString, t = 0) {
  let pitch = noteString.slice(0, 2);
  let i = 1;
  if (noteString[2] === "#" ||
    noteString[2] === "b") {
    pitch += noteString[2];
    i = 2;
  } 

  let length = 1;
  while (noteString[i+length] === "-") {
    length++;
  }
  let fraction = 1;
  while (noteString[i+fraction] === "/") {
    fraction++;
  }


  // return {
  //   note,
  //   length: length * noteTime,
  // }
  const velocity = 1.0;
  // return {
  //   note: {pitch, velocity},
  //   time: (length / fraction) * noteTime,
  // }
  return {
    // time: (length / fraction) * noteTime,
    time: t,
    note: pitch,
    velocity: velocity,
    length: (length / fraction) * noteTime,
  }

}

// Function that returns random notes
export function randomNotes(num) {
  let notes = "";
  for (let i = 0; i < num; i++) {
    notes += randomNote() + " ";
  }
  // Trim trailing space
  if (notes.length > 0) notes = notes.slice(0, -1);
  return notes;
}

export function randomNote() {
  const notes = ["C", "D", "E", "F", "G", "A", "B"];
  const pitches = ["3", "4", "5", "6"];
  return notes[Math.floor(Math.random() * notes.length)] 
    + pitches[Math.floor(Math.random() * pitches.length)];
}



const letters = ["C", "D", "E", "F", "G", "A", "B"];
const pitches = ["2", "3", "4", "5", "6", "7", "8"];
export function playNotes_fromAxes({args, value}) {
  // Normalize x and y between 0 and 1
  const x = (value.x + 1) / 2;
  const y = (value.y + 1) / 2;

  // Get note and octave from x and y
  const note = letters[Math.floor(y * letters.length)];
  const octave = pitches[Math.floor(x * pitches.length)];

  // Play note
  const velocity = 1.0;
  synths[activeSynthId].triggerAttackRelease(note + octave, noteTime, undefined, velocity);
}

export function playNotes_new({args, value}) {
  if (!synths || synths.length === 0) {
    initSynths();
    speak("Initializing synths");
    // while(synths?.length) {
    //   console.log("waiting...");
    // }
  }
  const notes = args.notes ?? randomNotes(4);
  const trackId = (args.trackId ?? 0) % trackParts.length;
  const synthId = (args.synthId ?? activeSynthId ?? 0) % synths.length;

  const currentSynth = synths[synthId];
  // console.log("currentSynth", currentSynth);
  // if (!synth) {
  //   initSynth();
  // }

  // if (seq) {
  //   seq.stop();
  // }
  
  currentSynth.sync();
  let t = Tone.now();
  const assistAmount = 0.25; // correct to nearest 0.25 (i.e.: 1/4)
  if (beatAssist) {
    t = Math.ceil(t / assistAmount) * assistAmount;
  }
  

  // Parse notes string into note objects
  let nextT = t;
  const parsedNotes = notes.split(' ').map((note) => {
    
    if (note === "_") {
      const restWithTime = {...restEvent, time: nextT};
      nextT += noteTime;
      return restWithTime;
    } else {
      const parsed = {...parseNoteString(note), time: nextT};
      nextT += parsed.length;
      return parsed;
    }
  });

  // If there's an existing track, stop it
  if (trackParts[trackId]) {
    if (interruptTracks) {
      trackParts[trackId].stop();
    }
  }

  trackParts[trackId] = new Tone.Part((time, event) => {
    currentSynth.triggerAttackRelease(event.note, event.length, time);
  }, parsedNotes).start(0);

  if (Tone.Transport.state !== "started") {
    Tone.Transport.start();
  }
}

export function playNotes(input) {
  const notes = input.args;
  const value = input.value;
  stopSounds();
  const parsedNotes = notes.split(" ").map((note) => {
        if (note === "_") {
            return "4n";
        }
        return note;
    });

    if (!synth) {
        initSynth();
    }

    seq = new Tone.Sequence((time, note) => {
        synth.triggerAttackRelease(note, 0.1, time);
    }, parsedNotes).start(0);
    seq.loop = 0;
    Tone.Transport.ticks = 0;
    Tone.Transport.start();
}

export function stop() {
    seq.stop();
}

let lastAudio = null;

export function playAudio(src) {
  stopSounds();
  if (!src) {
    return;
  }
  const audio = new Audio(src);
  lastAudio = audio;
  audio.play();
}

export function stopSounds() {
  if (lastAudio) {
    lastAudio.pause();
    lastAudio.currentTime = 0;
  }
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  if (seq) {
    seq.stop();
  }
}

export function speak(input) {
  if (!input?.args) { return; }
  if (input.value === 0) { return; }
  // stopSounds();
  if (window.speechSynthesis) {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(input.args);
    window.speechSynthesis.speak(utterance);
  }
}