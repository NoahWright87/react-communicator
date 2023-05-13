import { useEffect } from "react";

let buttonsLastFrame = [];

const handleGamepadInput = (gamepad, callback) => {
  const currentButtons = [];
  const pressedButtons = [];
  const releasedButtons = [];

  const gamepadPrefix = `G${gamepad.index}-`;

  for (let i = 0; i < gamepad.buttons.length; i++) {
    const buttonName = `${gamepadPrefix}B${i}`;

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
    const axisPrefix = `${gamepadPrefix}A${i}-`
    const buttonName = axisPrefix + (gamepad.axes[i] > 0 ? "+" : "-");
    const oppositeButtonName = axisPrefix + (gamepad.axes[i] > 0 ? "-" : "+");
    
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
    if (callback) callback(button + "-press");
  });

  // Handle button releases
  releasedButtons.forEach(button => {
    if (callback) callback(button + "-release");
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
            previousButtons = handleGamepadInput(gamepad, onInput);
          }
        }
    
        const intervalId = setInterval(checkGamepad, 16);
    
        return () => clearInterval(intervalId);
      }, [onInput]);

  return <></>
}