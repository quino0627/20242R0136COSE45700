import { Command } from "./Command";
import { ShapeComponent } from "@/models/ShapeComponent";
import { ShapeCommandExecutor } from "./ShapeCommandExecutor";
import { makeAutoObservable } from "mobx";

export class RemoveShapeCommand implements Command {
  private shape: ShapeComponent;
  private executor: ShapeCommandExecutor;

  constructor(shape: ShapeComponent, executor: ShapeCommandExecutor) {
    this.shape = shape;
    this.executor = executor;
    makeAutoObservable(this);
  }

  execute(): void {
    if (this.shape.getComponents) {
      this.shape.getComponents().forEach((component) => {
        this.executor.removeShapeFromState(component.getId());
      });
    } else {
      this.executor.removeShapeFromState(this.shape.getId());
    }
  }

  undo(): void {
    this.executor.addShapeToState(this.shape.clone());
  }
}
