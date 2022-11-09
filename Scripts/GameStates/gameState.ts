class GameState {

    public stateName: string;
    public player: number;
    public xOffset: number;
    public upKey: string;
    public downKey: string;
    public leftKey: string;
    public rightKey: string;

    constructor(player: number, xOffset: number, upKey: string, downKey: string, leftKey: string, rightKey: string) {

        this.stateName = "GameState";
        this.player = player;
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

    public updateOtherPlayer(worldPosition: Position, angle: number, texture: string): void {

        //  Used only in LevelOffice
    }
}