import { useEffect } from "react";


export default function GamepadHelper({ callback, onPress, onRelease }) {
    useEffect(() => {
        let previousButtons = [];
    
        function checkGamepad() {
          const gamepads = navigator.getGamepads();
          if (!gamepads) return;
    
          for (let i = 0; i < gamepads.length; i++) {
            const gamepad = gamepads[i];
            if (!gamepad) continue;
    
            const { buttons } = gamepad;
            const currentButtons = [];
    
            for (let j = 0; j < buttons.length; j++) {
              const button = buttons[j];
              if (button.pressed) {
                currentButtons.push(j);
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
                for (const newButton of pressedButtons) {
                    onPress(newButton);
                }
            }
            if (onRelease) {
                for (const newButton of releasedButtons) {
                    onRelease(newButton);
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