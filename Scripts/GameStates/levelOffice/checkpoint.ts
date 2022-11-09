class Checkpoint {

    public worldPosition: PIXI.Rectangle;
    public directionNext: Direction;

    constructor(worldX: number, worldY: number, width: number, height: number, directionNext: Direction) {

        this.worldPosition = new PIXI.Rectangle(worldX, worldY, width, height);
        this.directionNext = directionNext;
    }

    public isInside(playerPosition: Position) : boolean {

        if (this.worldPosition.x <= playerPosition.x && this.worldPosition.x + this.worldPosition.width >= playerPosition.x &&
            this.worldPosition.y <= playerPosition.y && this.worldPosition.y + this.worldPosition.height >= playerPosition.y) {

            return true;
        }

        return false;
    }
}

enum Direction {

    Up,
    Down,
    Left,
    Right
}