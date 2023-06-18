import * as Tone from 'tone';

let seq;
let synth;

export function playVariation(variation) {
  if (variation.src) {
    playAudio(variation.src);
  } else if (variation.notes) {
    playNotes(variation.notes);
  } else if (variation.name) {
    speak(variation.name);
  }
}

export function playNotes(notes) {
  stopSounds();
  const parsedNotes = notes.split(" ").map((note) => {
        if (note === "_") {
            return "4n";
        }
        return note;
    });

    if (!synth) {
        synth = new Tone.Synth().toDestination();
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

export function speak(words) {
  stopSounds();
  if (window.speechSynthesis) {
    const utterance = new SpeechSynthesisUtterance(words);
    window.speechSynthesis.speak(utterance);
  }
}