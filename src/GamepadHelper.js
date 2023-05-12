import { useEffect } from "react";


let buttonsLastFrame = [];

const handleGamepadInput = (gamepad, callback) => {
  const currentButtons = [];
  const pressedButtons = [];
  const releasedButtons = [];

  for (let i = 0; i < gamepad.buttons.length; i++) {
    const buttonName = "B" + i;

    if (gamepad.buttons[i].pressed){
      currentButtons.push(buttonName);
      if (!buttonsLastFrame.includes(buttonName)) {
        pressedButtons.push(buttonName);
      }
    } else if (buttonsLastFrame.includes(buttonName)) {
      releasedButtons.push(buttonName);
    }
  }
  for (let i = 0; i < gamepad.axes.length; i++) {
    const buttonName = "A" + i + (gamepad.axes[i] > 0 ? "+" : "-");
    const oppositeButtonName = "A" + i + (gamepad.axes[i] > 0 ? "-" : "+");
    
    if (gamepad.axes[i] > 0.5 || gamepad.axes[i] < -0.5) {

      currentButtons.push(buttonName);
      if (!buttonsLastFrame.includes(buttonName)) {
        pressedButtons.push(buttonName);
      }
      
    } else if (buttonsLastFrame.includes(buttonName)
        || buttonsLastFrame.includes(oppositeButtonName)) {
      releasedButtons.push(buttonName);
    }
  }


  // Handle button presses
  pressedButtons.forEach(button => {
    //onInput(button);
    if (callback) callback(button + "-press");
    else console.log(button + "-press");
    // handleButtonPress(button);
  });

  // Handle button releases
  releasedButtons.forEach(button => {
    //onInput(button);
    if (callback) callback(button + "-release");
    else console.log(button + "-release");
    // handleButtonRelease(button);
  });

  buttonsLastFrame = currentButtons;
  return currentButtons;
}

const threshold = 0.5;
export function GamepadHelper({ onInput }) {
    useEffect(() => {
        let previousButtons = [];
    
        function checkGamepad() {
          const gamepads = navigator.getGamepads();
          if (!gamepads) return;
    
          for (let i = 0; i < gamepads.length; i++) {
            const gamepad = gamepads[i];
            if (!gamepad) continue;
            previousButtons = handleGamepadInput(gamepad);
    
            // TODO: Remove if the above worked.  This was my first attempt
            //   and was performing actions EACH FRAME instead of on press/release.
            // const { buttons, axes } = gamepad;
            // const currentButtons = [];
    
            // for (let j = 0; j < buttons.length; j++) {
            //   const button = buttons[j];
            //   if (button.pressed) {
            //     currentButtons.push( `G${i}-Button${j}`);
            //   }
            // }
            // for (let j = 0; j < axes.length; j++) {
            //   const axis = axes[j];
            //   if (axis > threshold) {
            //     currentButtons.push(`G${i}-Axis${j}+`);
            //   } else if (axis < -threshold) {
            //     currentButtons.push(`G${i}-Axis${j}-`);
            //   }
            // }
            
            // const prevButtons = previousButtons;
            // const pressedButtons = currentButtons.filter((button) => {
            //   return !prevButtons.includes(button);
            // });
            // const releasedButtons = prevButtons.filter((button) => {
            //     return !currentButtons.includes(button);
            // });
            // const heldButtons = currentButtons.filter((button) => {
            //     return prevButtons.includes(button);
            // });

            // if (onInput) {
            //     for (const b of pressedButtons) {
            //         onInput(b);
            //     }
            //     for (const b of heldButtons) {
            //         onInput(b + "-hold");
            //     }
            //     for (const b of releasedButtons) {
            //         onInput(b + "-release");
            //     }
            // }
    
            // previousButtons = currentButtons;
          }
        }
    
        const intervalId = setInterval(checkGamepad, 16);
    
        return () => clearInterval(intervalId);
      }, [onInput]);

  return <></>
}