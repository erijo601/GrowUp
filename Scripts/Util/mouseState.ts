class MouseState
{
    public x: number;
    public y: number;
    public leftButtonDown: boolean;
    public rightButtonDown: boolean;
    
    constructor() {

        this.x = 0;
        this.y = 0;
        this.leftButtonDown = false;
        this.rightButtonDown = false;
    }
}

class Mouse
{
    public current: MouseState;
    public last: MouseState;

    constructor() {

        this.current = new MouseState();
        this.last = new MouseState();
    }
}