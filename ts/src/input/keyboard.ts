import { InputAction } from "./inputAction";
import { Event, EventListener } from "../common/event";

export type KeyboardMap = { [key: string]: InputAction };

export class Keyboard {
    private keyboardMap: KeyboardMap;
    private _keyEvent: Event<InputAction>;
    public constructor() {
        this.keyboardMap = getKeyboardMap();
        this._keyEvent = new Event();
        window.addEventListener("keydown", this.onKeyPress);
    }
    public dispose() {
        this._keyEvent.dispose();
    }

    public get keyEvent(): EventListener<InputAction> {
        return this._keyEvent;
    }

    private onKeyPress = (event: KeyboardEvent) => {
        const action = this.keyboardMap[event.key.toLowerCase()];
        if (!!action) {
            this._keyEvent.publish(action);
        }
    };
}

export function getKeyboardMap(): KeyboardMap {
    const userMap = window.localStorage.getItem(UserKeyboardMapStorageKey);
    if (!!userMap) {
        try {
            return JSON.parse(userMap) as KeyboardMap;
        } catch (err) {
            console.error("Failed to parse user keyboard map", err);
            return DefaultKeyboardMap;
        }
    }
    console.debug(
        "No keyboardmap defined, returning default",
        DefaultKeyboardMap
    );
    return DefaultKeyboardMap;
}

export const UserKeyboardMapStorageKey = "KEYBOARD_USER_MAP";
export const DefaultKeyboardMap: KeyboardMap = {
    d: InputAction.RIGHT_PRESS,
    a: InputAction.LEFT_PRESS,
    w: InputAction.UP_PRESS,
    s: InputAction.DOWN_PRESS,
    q: InputAction.BACK_PRESS,
    e: InputAction.ACTION_PRESS,
    r: InputAction.MENU_PRESS,
};
