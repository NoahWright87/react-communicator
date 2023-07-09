import { useEffect } from "react";


export function KeyboardHelper({ onInput }) {
    // Listen for keyboard input, call inInput with the input
    const getInputEventFromKeyEvent = (e) => {
        let returnString = e.code;
        // Ignore modifier keys
        if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) {
            return;
        }
        if (e.ctrlKey) {
            returnString = "ctrl-" + returnString;
        }
        if (e.altKey) {
            returnString = "alt-" + returnString;
        }
        if (e.metaKey) {
            returnString = "meta-" + returnString;
        }
        if (e.shiftKey) {
            returnString = "shift-" + returnString;
        }
        if (e.repeat) {
            returnString += "-hold";
        }
        if (e.type === "keyup") {
            returnString += "-release";
        }

        return { device: "Keyboard", name: returnString } ;
    };

    useEffect(() => {
        const handleKeyEvent = (e) => {
            if (onInput) {
                const inputEvent = getInputEventFromKeyEvent(e);
                if (inputEvent) {
                    const input = {
                      name: inputEvent,
                      device: "Keyboard",  
                    };
                    onInput(inputEvent);
                    // onInput(inputEvent, "keyboard");
                }
            }
        };

        window.addEventListener("keydown", handleKeyEvent);
        window.addEventListener("keyup", handleKeyEvent);
        return () => {
            window.removeEventListener("keydown", handleKeyEvent);
            window.removeEventListener("keyup", handleKeyEvent);
        };
    }, [onInput()]);


    return <></>;
}
