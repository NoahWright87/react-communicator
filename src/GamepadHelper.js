import { useEffect } from "react";

// Check https://gist.github.com/nondebug/aec93dff7f0f1969f4cc2291b24a3171 for a list of gamepad ids
const deviceNameMap = {
  "Wireless Controller (STANDARD GAMEPAD Vendor: 054c Product: 09cc)": "DualShock",
}

let gamePadState = {
  "DualShock": {
    lastFrame: {},
    thisFrame: {},
  },
}

const handleGamepadInput_new = (gamepad, callback, actOnRelease = false) => {
  const deviceName = deviceNameMap[gamepad.id] || gamepad.id;
  
  if (gamePadState[deviceName] === undefined) {
    // gamePadState[deviceName] = {
    //   lastFrame: [],
    //   thisFrame: [],
    // };

    gamePadState[deviceName] = {
      lastFrame: gamepad,
      thisFrame: gamepad,
    };
  }
  gamePadState[deviceName].lastFrame = gamePadState[deviceName].thisFrame;
  gamePadState[deviceName].thisFrame = gamepad;

  const changedButtons = [];
  
  gamepad.buttons.forEach((button, index) => {
    const buttonName = `B${index}`;
    const key = { deviceName, buttonName };
    
    const lastFrameButton = gamePadState[deviceName].lastFrame.buttons[index];
    if (button.value !== lastFrameButton.value) {
      changedButtons.push({device: deviceName, name: buttonName, value: button.value});
    };
  });

  gamepad.axes.forEach((axis, index) => {
    const axisName = `Axis${index}`;
    const key = { deviceName, axisName };

    const lastFrameAxis = gamePadState[deviceName].lastFrame.axes[index];
    if (axis !== lastFrameAxis) {
      changedButtons.push({device: deviceName, name: axisName, value: axis});
    }
  });

  if (changedButtons.length > 0) {
    changedButtons.forEach(changedButton => {
      callback(changedButton);
    });
  }
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
            previousButtons = handleGamepadInput_new(gamepad, onInput, actOnRelease);
          }
        }
    
        const intervalId = setInterval(checkGamepad, 16);
    
        return () => clearInterval(intervalId);
      }, [onInput]);

  return <></>
}