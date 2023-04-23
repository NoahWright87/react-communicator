import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export function Something() {
  const [prevButtonState, setPrevButtonState] = useState({});
  
  useEffect(() => {
    const gamepadLoop = () => {
      const gamepads = navigator.getGamepads();

      for (const gamepad of gamepads) {
        if (!gamepad) continue;

        for (let i = 0; i < gamepad.buttons.length; i++) {
          const button = gamepad.buttons[i];
          const prevState = prevButtonState[gamepad.index]?.[i] || false;

          if (button.pressed && !prevState) {
            console.log(`Gamepad ${gamepad.index} button ${i} pressed`);

            // Trigger your event here
          }
        }
      }

      requestAnimationFrame(gamepadLoop);
    };

    requestAnimationFrame(gamepadLoop);

    return () => {
      cancelAnimationFrame(gamepadLoop);
    };
  }, [prevButtonState]);
}

export default function GamepadTest() {
  const [gamepads, setGamepads] = useState([]);
  // const [prevGamepads, setPrevGamepads] = useState([]);
  const [{previous, current}, setGamepadState] = useState({previous: {}, current: {}});

  useEffect(() => {
      function handleGamepadConnected(event) {
      console.log('Gamepad connected');
      console.log(event);
      const gamepads = navigator.getGamepads();
      setGamepads(gamepads);
    }
    function handleGamepadDisconnected(event) {
      console.log('Gamepad disconnected');
      console.log(event);
      const gamepads = navigator.getGamepads();
      setGamepads(gamepads);
    }

    const tick = () => {
      // setPrevGamepads(gamepads);
      setGamepads(navigator.getGamepads());
      console.log("setting state");
      setGamepadState({previous: current, current: navigator.getGamepads()});
    };
    const interval = setInterval(tick, 1000 / 30);

    window.addEventListener('gamepadconnected', handleGamepadConnected);
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);

    return function cleanup() {
      window.removeEventListener('gamepadconnected', handleGamepadConnected);
      window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
      clearInterval(interval);
    }
  }, []);

  // useEffect(() => {


  //   console.log('Gamepads changed');
  //   console.log(gamepads);
  // }, [gamepads]);

  useEffect(() => {
    console.log("hello");
    console.log('Gamepads changed', current, previous);
  }, {previous, current});

  return <Box>
    <Typography
      variant="h1"
    >
      Gamepad Test
    </Typography>
    <Box>
      {gamepads.map((gamepad, index) => (
        <GamepadDisplay gamepad={gamepad} key={index} />
      ))}
    </Box>
  </Box>;
}

export function GamepadDisplay({ gamepad }) {
  if (!gamepad) {
    return null;
  }

  return <Box>
    <Typography
      variant="h4"
    >
      {gamepad.id}
    </Typography>
    <Box>
      {gamepad.buttons.map((button, index) => (
        <Box key={index}>
          <Typography
            variant="body1"
          >
            Button {index}:
            {button.pressed ? 'Pressed' : 'Not Pressed'}
            ({button.value})
          </Typography>
          {/* <Typography
            variant="h4"
          >
            Value: {button.value}
          </Typography>
          <Typography
            variant="h4"
          >
            Pressed: {button.pressed ? 'Yes' : 'No'}
          </Typography> */}
        </Box>
      ))}
    </Box>
  </Box>;
}