import { useEffect } from "react";

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
    
            const { buttons, axes } = gamepad;
            const currentButtons = [];
    
            for (let j = 0; j < buttons.length; j++) {
              const button = buttons[j];
              if (button.pressed) {
                currentButtons.push( `G${i}-B${j}`);
              }
            }
            for (let j = 0; j < axes.length; j++) {
              const axis = axes[j];
              if (axis > threshold) {
                currentButtons.push(`G${i}-Axis${j}+`);
              } else if (axis < -threshold) {
                currentButtons.push(`G${i}-Axis${j}-`);
              }
            }
            
            const prevButtons = previousButtons;
            const pressedButtons = currentButtons.filter((button) => {
              return !prevButtons.includes(button);
            });
            const releasedButtons = prevButtons.filter((button) => {
                return !currentButtons.includes(button);
            });
            const heldButtons = currentButtons.filter((button) => {
                return prevButtons.includes(button);
            });

            if (onInput) {
                for (const b of pressedButtons) {
                    onInput(b);
                }
                for (const b of heldButtons) {
                    onInput(b + "-hold");
                }
                for (const b of releasedButtons) {
                    onInput(b + "-release");
                }
            }
    
            previousButtons = currentButtons;
          }
        }
    
        const intervalId = setInterval(checkGamepad, 16);
    
        return () => clearInterval(intervalId);
      }, [onInput]);

    return <></>
}