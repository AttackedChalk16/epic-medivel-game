import { Point } from "../../../common/point";
import { InputEvent } from "../../../input/input";
import { RenderContext } from "../../../rendering/renderContext";
import { GroundTile } from "../../entity/ground";
import { InteractionState } from "../handler/interactionState";
import { InteractionStateChanger } from "../handler/interactionStateChanger";
import { TileSelectedState } from "./tileSelectedState";

export class RootState extends InteractionState {
    onTap(
        screenPosition: Point,
        stateChanger: InteractionStateChanger
    ): boolean {
        return false;
    }

    onTileTap(
        tile: GroundTile,
        stateChanger: InteractionStateChanger
    ): boolean {
        console.log("RootState tap: ", tile);
        stateChanger.push(new TileSelectedState(tile));
        return true;
    }

    onInput(input: InputEvent, stateChanger: InteractionStateChanger): boolean {
        return true;
    }

    onDraw(context: RenderContext): void {}
}
