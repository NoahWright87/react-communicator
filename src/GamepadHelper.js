import { useEffect } from "react";

// Check https://gist.github.com/nondebug/aec93dff7f0f1969f4cc2291b24a3171 for a list of gamepad ids
const deviceNameMap = {
  "Wireless Controller (STANDARD GAMEPAD Vendor: 054c Product: 09cc)": "DualShock",
}

let buttonsLastFrame = [];

// TODO: Have a way to toggle actOnRelease
// TODO: Actually look for change in value and fire an onChange event
// TODO: Move event emitter into this class
const handleGamepadInput = (gamepad, callback, actOnRelease = false) => {
  const currentButtons = [];
  const pressedButtons = [];
  const releasedButtons = [];

  // TODO: Change this to gamepad name
  const deviceName = deviceNameMap[gamepad.id] || gamepad.id;
  const gamepadPrefix = deviceName + ":";
  // const gamepadPrefix = `G${gamepad.index}-`;

  for (let i = 0; i < gamepad.buttons.length; i++) {
    const buttonName = `B${i}`;
    const key = { deviceName, buttonName };
    // const eventArgs = {
    //   deviceName,
    //   buttonName,
    //   value: buttons[i].value
    // };
    const gamepadButtonName = `${gamepadPrefix}B${i}`;

    if (gamepad.buttons[i].pressed){
      currentButtons.push(key);
      if (!buttonsLastFrame.includes(key)) {
        pressedButtons.push(key);
      }
    } else if (buttonsLastFrame.includes(key)) {
      releasedButtons.push(key);
    }
  }
  for (let i = 0; i < gamepad.axes.length; i++) {
    
    const axisPrefix = `Axis${i}`
    // const axisPrefix = `${gamepadPrefix}Axis${i}`
    const buttonName = axisPrefix + (gamepad.axes[i] > 0 ? "+" : "-");
    const oppositeButtonName = axisPrefix + (gamepad.axes[i] > 0 ? "-" : "+");
    
    const key = { deviceName, buttonName };
    const oppositeKey = { deviceName, buttonName: oppositeButtonName };

    if (gamepad.axes[i] > 0.5 || gamepad.axes[i] < -0.5) {

      currentButtons.push(key);
      if (!buttonsLastFrame.includes(key)) {
        pressedButtons.push(key);
      }
    } else if (buttonsLastFrame.includes(key)
        || buttonsLastFrame.includes(oppositeKey)) {
      releasedButtons.push(key);
    }
  }

  // TODO: Enable press-and-hold if actOnRelease is on
  if (callback) {
    // const input = {
    //   name: button,
    //   device: "gamepad", // TODO: Get device name
    // }

    if (actOnRelease) {
      // Handle button releases
      releasedButtons.forEach(button => {
        // callback(button);
        callback({
          name: button?.buttonName ?? button,
          device: button?.deviceName ?? "Gamepad",
        });
      });
    } else {
      // Handle button presses
      pressedButtons.forEach(button => {
        // callback(button);
        callback({
          name: button?.buttonName ?? button,
          device: button?.deviceName ?? "Gamepad",
        });
      });
    }
  }

  buttonsLastFrame = currentButtons;
  return currentButtons;
}

const threshold = 0.5;
export function GamepadHelper({ onInput, actOnRelease = false }) {
    useEffect(() => {
        let previousButtons = [];
    
        function checkGamepad() {
          const gamepads = navigator.getGamepads();
          if (!gamepads) return;
    
          for (let i = 0; i < gamepads.length; i++) {
            const gamepad = gamepads[i];
            if (!gamepad) continue;
            previousButtons = handleGamepadInput(gamepad, onInput, actOnRelease);
          }
        }
    
        const intervalId = setInterval(checkGamepad, 16);
    
        return () => clearInterval(intervalId);
      }, [onInput]);

  return <></>
}