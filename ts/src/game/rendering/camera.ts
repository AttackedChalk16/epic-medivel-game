import { Point, addPoint } from "../../data/point";
import { TILE_SIZE } from "../constants";
//import { TileSize } from "../gameScene/world/chunk";
const TilesPadding = 4;
const BufferSize = TILE_SIZE * TilesPadding;
export class Camera {
    private cameraPosition: Point;

    public constructor() {
        this.cameraPosition = { x: 0, y: 0 };
    }
    public center(worldSpace: Point) {
        const screenSpace = {
            x: worldSpace.x * -TILE_SIZE,
            y: worldSpace.y * -TILE_SIZE,
        };
        this.cameraPosition = screenSpace;
    }
    public screenToWorldSpace(screenSpacePoint: Point): Point {
        const clickX =
            screenSpacePoint.x - this.cameraPosition.x - window.innerWidth / 2;

        const clickY =
            screenSpacePoint.y - this.cameraPosition.y - window.innerHeight / 2;

        const worldSpace = {
            x: Math.floor(clickX / TILE_SIZE),
            y: Math.floor(clickY / TILE_SIZE),
        };

        return worldSpace;
    }
    public follow(worldSpace: Point) {
        const translation: Point = { x: 0, y: 0 };
        const screenSpace = {
            x:
                worldSpace.x * TILE_SIZE +
                window.innerWidth / 2 +
                this.cameraPosition.x,
            y:
                worldSpace.y * TILE_SIZE +
                window.innerHeight / 2 +
                this.cameraPosition.y,
        };
        //Check if outside of the client area which is considered to be the size
        //of four tiles. This means that if the point moves outside
        //this area/rectangle (in screenspace) we will move the camera
        //enough to keep the point inside the client rectangle¨
        if (screenSpace.x < BufferSize) {
            const amountOutside = BufferSize - screenSpace.x;
            translation.x = amountOutside;
        } else if (screenSpace.x > window.innerWidth - BufferSize) {
            const amountOutside =
                window.innerWidth - BufferSize - screenSpace.x;
            translation.x = amountOutside;
        }

        if (screenSpace.y < BufferSize) {
            const amountOutside = BufferSize - screenSpace.y;
            translation.y = amountOutside;
        } else if (screenSpace.y > window.innerHeight - BufferSize) {
            const amountOutside =
                window.innerHeight - BufferSize - screenSpace.y;
            translation.y = amountOutside;
        }
        this.cameraPosition = addPoint(this.cameraPosition, translation);
    }

    public get screenPosition(): Point {
        return {
            x: this.cameraPosition.x + window.innerWidth / 2,
            y: this.cameraPosition.y + window.innerHeight / 2,
        };
    }
}
