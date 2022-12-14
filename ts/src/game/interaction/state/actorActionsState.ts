import { Point } from "../../../common/point";
import { InputEvent } from "../../../input/input";
import { RenderContext } from "../../../rendering/renderContext";
import { drawLayout, onTapLayout } from "../../../ui/layout/layout";
import { LayoutNode } from "../../../ui/layout/layoutNode";
import { actionbarView } from "../../../ui/view/actionbar";
import { GroundTile } from "../../entity/ground";
import { InteractionState } from "../handler/interactionState";
import { InteractionStateChanger } from "../handler/interactionStateChanger";

export class ActorActionsState extends InteractionState {
    private actionbar: LayoutNode | null = null;

    onTap(
        screenPosition: Point,
        stateChanger: InteractionStateChanger
    ): boolean {
        if (this.actionbar) {
            const hitResult = onTapLayout(this.actionbar, screenPosition);
            if (hitResult.handled) {
                return true;
            }
        }
        return false;
    }

    onInput(input: InputEvent, stateChanger: InteractionStateChanger): boolean {
        return false;
    }
    onDraw(context: RenderContext): void {
        this.actionbar = actionbarView(context, [
            {
                id: "chop",
                name: "Chop",
            },
            {
                id: "attack",
                name: "Attack",
            },
            {
                id: "cancel",
                name: "Cancel",
            },
        ]);
        drawLayout(context, this.actionbar);
    }
}
