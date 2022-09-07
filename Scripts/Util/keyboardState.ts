class KeyboardState
{
    public pressed: {};

    constructor() {

        this.pressed = {};
    }

    public isPressed(key) {

        key = key.toLowerCase();

        if (this.pressed[key] == undefined) {

            return false;
        }

        return this.pressed[key];
    }    
}

class Keyboard
{
    public current: KeyboardState;
    public last: KeyboardState;
    public isDirty: boolean;

    constructor() {

        this.current = new KeyboardState();
        this.last = new KeyboardState();
        this.isDirty = false;
    }

    public update() {

        //  Copy all of current to last, to reset the delta

        if (this.isDirty == true) {

            this.last.pressed = { ...this.current.pressed };
            this.isDirty = false;
        }
    }
}