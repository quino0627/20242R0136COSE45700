import { ShapeProperties } from "@/models/Shape";
import { Command } from "./Command";
import { ShapeComponent } from "@/models/ShapeComponent";
import { ShapeCommandExecutor } from "./ShapeCommandExecutor";
import { makeAutoObservable, observable } from "mobx";

export class UpdateShapeCommand implements Command {
  private shape: ShapeComponent;
  private updates: Partial<ShapeProperties>;
  private executor: ShapeCommandExecutor;

  constructor(
    shape: ShapeComponent,
    updates: Partial<ShapeProperties>,
    executor: ShapeCommandExecutor
  ) {
    this.shape = shape;
    this.updates = updates;
    this.executor = executor;
  }

  execute(): void {
    console.log(
      "UpdateShapeCommand execute:",
      this.shape.getId(),
      this.updates
    );
    this.executor.updateShapeInState(this.shape, this.updates);
  }

  undo(): void {
    // ... undo logic
  }
}
