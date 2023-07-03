import { Box, Button } from '@mui/material';
import * as Tone from 'tone';


export default function ToneJsTest() {
    // const synth = new Tone.Synth().toDestination();




    return <>
        <Box
        >
            {/* <Button
                onClick={doStuff}
            >
                Play
            </Button> */}
            <Button
                onClick={() => doThing1()}
            >
                #1
            </Button>
            <Button
                onClick={() => doThing2()}
            >
                #2
            </Button>
            <Button
                onClick={() => doThing3()}
            >
                #3
            </Button>
        </Box>
    </>;
}



// function doStuff() {
//     //create a synth and connect it to the main output (your speakers)
//     // const synth = new Tone.Synth().toDestination();

//     //// What I had before chat gpt helped
//     // const maryHadaLittleLamb = [
//     //     { note: "E4", duration: "8n" },
//     //     { note: "D4", duration: "8n", offset: "+8n" },
//     //     { note: "C4", duration: "8n", offset: "+16n" },
//     //     { note: "D4", duration: "8n", offset: "+24n" },
//     //     { note: "E4", duration: "8n", offset: "+32n" },
//     //     { note: "E4", duration: "8n", offset: "+40n" },
//     //     { note: "E4", duration: "4n", offset: "+48n" },
//     //     { note: "D4", duration: "8n", offset: "+56n" },
//     //     { note: "D4", duration: "8n", offset: "+64n" },
//     //     { note: "D4", duration: "4n", offset: "+72n" },
//     //     { note: "E4", duration: "8n", offset: "+80n" },
//     //     { note: "G4", duration: "8n", offset: "+88n" },
//     //     { note: "G4", duration: "4n", offset: "+96n" },
//     //     { note: "E4", duration: "8n", offset: "+104n" },
//     //     { note: "D4", duration: "8n", offset: "+112n" },
//     //     { note: "C4", duration: "8n", offset: "+120n" },
//     //     { note: "D4", duration: "8n", offset: "+128n" },
//     // ];

//     // maryHadaLittleLamb.forEach(note => {
//     //     synth.triggerAttackRelease(note.note, note.duration, note.offset);
//     // });

//     //play a middle 'C' for the duration of an 8th note
//     // synth.triggerAttackRelease("C4", "8n");
//     // synth.triggerAttackRelease("E4", "8n", "+8n");
//     // synth.triggerAttackRelease("G4", "8n", "+16n");



//     const melody = [
//         "E4", "D4", "C4", "D4", "E4", "E4", "E4", "rest",
//         "D4", "D4", "D4", "rest", "E4", "G4", "G4"
//       ];
      
//       // Convert the shorthand notation to Tone.js Time and Frequency values
//       const convertedMelody = melody.map(note => {
//         if (note === "rest") {
//           return "4n"; // Represents a quarter note rest
//         } else {
//           return Tone.Frequency(note).toNote();
//         }
//       });
//       console.log(convertedMelody);
      
//       const beatsPerNotes = 4;
//       let time = 0;

//       // Play the melody using Tone.js
//       const synth = new Tone.Synth().toDestination();
//       const part = new Tone.Part((time, note) => {
//         console.log(time, note);
//         synth.triggerAttackRelease(note, "4n", time);
//       }, convertedMelody).start();
//       Tone.Transport.start();
      
    
// }

let seq;
let synth;
function doThing1() {
    if (seq) {
        seq.stop();
    }
    if (!synth) {
        synth = new Tone.Synth().toDestination();
    }

    const maryHadaLittleLamb = [
        "E4", "D4", "C4", "D4", "E4", "E4", "E4", "4n", 
        "D4", "D4", "D4", "4n", "E4", "G4", "G4", "4n",
        "E4", "D4", "C4", "D4", "E4", "E4", "E4", "4n",
        "D4", "D4", "E4", "D4", "C4", "4n"
    ]


    seq = new Tone.Sequence((time, note) => {
        synth.triggerAttackRelease(note, 0.1, time);
    }, maryHadaLittleLamb).start(0);
    seq.loop = 0;
// }, ["C4", ["E4", "D4", "E4"], "G4", ["A4", "G4"]]).start(0);
    // Tone.Transport.bpm.value = 120;
    // Tone.Transport.time = 0;
    Tone.Transport.ticks = 0;
    Tone.Transport.start();

}

const bpms = [60, 120, 180, 240];
let bpmIndex = 0;
function doThing2() {
    // Tone.Transport.stop();

    bpmIndex = (bpmIndex + 1) % bpms.length;
    console.log(bpms[bpmIndex]);
    // Tone.Transport.bpm.value = bpms[bpmIndex];
    Tone.Transport.bpm.rampTo(bpms[bpmIndex], 0.1);
}



function doThing3() {

}