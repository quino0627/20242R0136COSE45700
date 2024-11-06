import { ShapeProperties } from "@/models/Shape";
import { Command } from "./Command";
import { ShapeComponent } from "@/models/ShapeComponent";
import { ShapeCommandExecutor } from "./ShapeCommandExecutor";
import { makeAutoObservable, observable } from "mobx";

export class UpdateShapeCommand implements Command {
  private previousState: Partial<ShapeProperties>;
  private shape: ShapeComponent;
  private updates: Partial<ShapeProperties>;
  private executor: ShapeCommandExecutor;

  constructor(
    shape: ShapeComponent,
    updates: Partial<ShapeProperties>,
    executor: ShapeCommandExecutor
  ) {
    this.previousState = {};
    if (updates.position) {
      this.previousState.position = observable({
        x: shape.getPosition().x,
        y: shape.getPosition().y,
      });
    }
    if (updates.size) {
      this.previousState.size = observable({
        width: shape.getSize().width,
        height: shape.getSize().height,
      });
    }
    if (updates.rotation !== undefined) {
      this.previousState.rotation = shape.getRotation();
    }
    if (updates.zIndex !== undefined) {
      this.previousState.zIndex = shape.getZIndex();
    }
    if (updates.text !== undefined) {
      this.previousState.text = shape.getText?.();
    }

    this.shape = shape;
    this.updates = updates;
    this.executor = executor;
    makeAutoObservable(this);
  }

  execute(): void {
    this.executor.updateShapeInState(this.shape, this.updates);
  }

  undo(): void {
    this.executor.updateShapeInState(this.shape, this.previousState);
  }
}
