class GameState {

    public xOffset: number;
    public upKey: string;
    public downKey: string;
    public leftKey: string;
    public rightKey: string;

    constructor(xOffset: number, upKey: string, downKey: string, leftKey: string, rightKey: string) {

        this.xOffset = xOffset;
        this.upKey = upKey;
        this.downKey = downKey;
        this.leftKey = leftKey;
        this.rightKey = rightKey;
    }

    public onEnter(): void {

    }

    public onExit(): void {

    }

    public update(elapsedTime: number): void {

        // elapsedTime in ms
    }
}