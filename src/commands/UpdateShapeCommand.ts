import { ShapeProperties } from "@/models/Shape";
import { Command } from "./Command";
import { ShapeComponent } from "@/models/ShapeComponent";
import { ShapeCommandExecutor } from "./ShapeCommandExecutor";

export class UpdateShapeCommand implements Command {
  private shape: ShapeComponent;
  private updates: Partial<ShapeProperties>;
  private previousState: Partial<ShapeProperties>;
  private executor: ShapeCommandExecutor;

  constructor(
    shape: ShapeComponent,
    updates: Partial<ShapeProperties>,
    executor: ShapeCommandExecutor
  ) {
    this.shape = shape;
    this.updates = updates;
    this.executor = executor;

    // 이전 상태 저장
    this.previousState = {};
    if (updates.position) {
      this.previousState.position = { ...shape.getPosition() };
    }
    if (updates.size) {
      this.previousState.size = { ...shape.getSize() };
    }
    if (updates.rotation !== undefined) {
      this.previousState.rotation = shape.getRotation();
    }
    if (updates.zIndex !== undefined) {
      this.previousState.zIndex = shape.getZIndex();
    }
    if (updates.color !== undefined) {
      this.previousState.color = shape.getColor?.();
    }
    if (updates.text !== undefined) {
      this.previousState.text = shape.getText?.();
    }
  }

  execute(): void {
    this.executor.updateShapeInState(this.shape, this.updates);
  }

  undo(): void {
    this.executor.updateShapeInState(this.shape, this.previousState);
  }
}
