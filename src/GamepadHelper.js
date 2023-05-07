import { useEffect } from "react";

const threshold = 0.5;

export default function GamepadHelper({ callback, onPress, onRelease }) {
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
                currentButtons.push("B" + j);
              }
            }
            for (let j = 0; j < axes.length; j++) {
              const axis = axes[j];
              if (axis > threshold) {
                currentButtons.push("Axis" + j + "+");
              } else if (axis < -threshold) {
                currentButtons.push("Axis" + j + "-");
              }
            }
   
            
            const prevButtons = previousButtons;
            const pressedButtons = currentButtons.filter((button) => {
              return !prevButtons.includes(button);
            });
            const releasedButtons = prevButtons.filter((button) => {
                return !currentButtons.includes(button);
            });

            if (onPress){
                for (const b of pressedButtons) {
                    onPress(b);
                }
            }
            if (onRelease) {
                for (const b of releasedButtons) {
                    onRelease(b);
                }
            }
    
            previousButtons = currentButtons;
          }
        }
    
        const intervalId = setInterval(checkGamepad, 16);
    
        return () => clearInterval(intervalId);
      }, [callback]);
    
    


    return <>
        {/* Do I need to display anything?? */}
        {/* {status} */}
    </>
}