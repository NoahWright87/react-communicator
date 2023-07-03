import React, { useState, useEffect } from 'react';
import Chip from '@material-ui/core/Chip';

function GamepadInputs() {
  const [gamepad, setGamepad] = useState(null);
  const [buttons, setButtons] = useState([]);

  const handleGamepadConnected = (event) => {
    console.log(`Gamepad connected at index ${event.gamepad.index}: ${event.gamepad.id}.`);
    setGamepad(event.gamepad);
  };

  const handleGamepadDisconnected = (event) => {
    console.log(`Gamepad disconnected from index ${event.gamepad.index}: ${event.gamepad.id}.`);
    setGamepad(null);
    setButtons([]);
  };

  const handleGamepadInput = (event) => {
    if (gamepad) {
      const newButtons = [...buttons];
      for (let i = 0; i < gamepad.buttons.length; i++) {
        const pressed = gamepad.buttons[i].pressed;
        if (pressed !== buttons[i]) {
          newButtons[i] = pressed;
        }
      }
      setButtons(newButtons);
    }
  };

  useEffect(() => {
    window.addEventListener('gamepadconnected', handleGamepadConnected);
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);
    return () => {
      window.removeEventListener('gamepadconnected', handleGamepadConnected);
      window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(handleGamepadInput, 16.67);
    return () => clearInterval(intervalId);
  }, [gamepad]);

  const buttonChips = buttons.map((pressed, i) => (
    <Chip
      key={`button-${i}`}
      label={`Button #${i + 1}: ${pressed ? 'PRESSED' : 'not pressed'}`}
      color={pressed ? 'secondary' : 'primary'}
      style={{ margin: 4 }}
    />
  ));

  return (
    <div>
      {gamepad ? (
        <div>
          <p>Gamepad detected:</p>
          <p>ID: {gamepad.id}</p>
          <p>Index: {gamepad.index}</p>
          <p>Number of buttons: {gamepad.buttons.length}</p>
          <div>{buttonChips}</div>
        </div>
      ) : (
        <p>No gamepad detected.</p>
      )}
    </div>
  );
}

export default GamepadInputs;
