import * as Tone from 'tone';

let seq;
let synth;
const pitchShift = new Tone.PitchShift().toDestination();
const reverb = new Tone.Reverb().toDestination();
const distortion = new Tone.Distortion().toDestination();

export function initSynth() {
  synth = new Tone.Synth().toDestination();
  // synth.chain(pitchShift, distortion);
  
  Tone.Transport.bpm.value = 120;
}

export function setBpm(bpm) {
  Tone.Transport.bpm.value = bpm;
}
export function shiftPitch(amount) {
  pitchShift.pitch = amount;
}
export function setReverb(amount) {
  reverb.decay = amount;
}
export function setSynthDistortion(amount) {
  distortion.distortion = amount;
}
export function setSynthVolume(amount) {
  synth.volume.value = amount;
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

export function parseNoteString(noteString) {
  const note = noteString.slice(0, 2);
  let i = 2;
  if (noteString[2] === "#" ||
    noteString[2] === "b") {
    note += noteString[2];
    i = 3;
  } 

  let length = 1;
  while (noteString[i+length] === "-") {
    length++;
  }

  return {
    note,
    length: length * noteTime,
  }

}


const noteTime = 0.25;
export function playNotes_new(input) {
  if (!synth) {
    initSynth();
  }

  if (input.value === 0) { return; }

  if (seq) {
    seq.stop();
  }

  let time = 0;

  const notes = input.args;
  const value = input.value;

  const savedBpm = Tone.Transport.bpm.value;
  console.log(savedBpm);
  Tone.Transport.cancel();
  Tone.Transport.stop();

  synth.sync();

  notes.split(' ').forEach((note) => {
    if (note === "_") {
      time += noteTime;
    } else {
      const parsedNote = parseNoteString(note);
      
      synth.triggerAttackRelease(parsedNote.note, parsedNote.length, time);
      
      time += parsedNote.length;

    }
  });

  Tone.Transport.start();
  // set bpm
  Tone.Transport.bpm.value = savedBpm;
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
  stopSounds();
  if (window.speechSynthesis) {
    const utterance = new SpeechSynthesisUtterance(input.args);
    window.speechSynthesis.speak(utterance);
  }
}