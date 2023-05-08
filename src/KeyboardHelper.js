import { useEffect } from "react";


export function KeyboardHelper({ onInput }) {
    // Listen for keyboard input, call inInput with the input
    const inputName = (e) => {
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

        return returnString;
    };

    useEffect(() => {
        const handleKeyEvent = (e) => {
            if (onInput) {
                const input = inputName(e);
                if (input) {
                    onInput(input);
                }
            }
        };

        window.addEventListener("keydown", handleKeyEvent);
        window.addEventListener("keyup", handleKeyEvent);
        return () => {
            window.removeEventListener("keydown", handleKeyEvent);
            window.removeEventListener("keyup", handleKeyEvent);
        };
    }, [onInput]);


    return <></>;
}
