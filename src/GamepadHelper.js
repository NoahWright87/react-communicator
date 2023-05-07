import { useEffect, useState } from "react";


export default function GamepadHelper({ callback }) {
    const [status, setStatus] = useState("");

    useEffect(() => {
        let previousButtons = [];
    
        function checkGamepad() {
          const gamepads = navigator.getGamepads();
          if (!gamepads) return;
    
          for (let i = 0; i < gamepads.length; i++) {
            const gamepad = gamepads[i];
            if (!gamepad) continue;
    
            const { buttons } = gamepad;
            const pressedButtons = [];
    
            for (let j = 0; j < buttons.length; j++) {
              const button = buttons[j];
              if (button.pressed) {
                pressedButtons.push(j);
              }
            }
    
            const newButtons = pressedButtons.filter((button) => {
              return !previousButtons.includes(button);
            });

            console.log(newButtons);
            setStatus(newButtons);
    
            for (const newButton of newButtons) {
              callback(newButton);
            }
    
            previousButtons = pressedButtons;
          }
        }
    
        const intervalId = setInterval(checkGamepad, 16);
    
        return () => clearInterval(intervalId);
      }, [callback]);
    
    


    return <>
        {/* Do I need to display anything?? */}
        {status}
    </>
}