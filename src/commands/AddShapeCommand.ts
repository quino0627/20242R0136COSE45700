import { Command } from "./Command";
import { ShapeComponent } from "@/models/ShapeComponent";
import { ShapeCommandExecutor } from "@/commands/ShapeCommandExecutor";
import { makeAutoObservable } from "mobx";

export class AddShapeCommand implements Command {
  private shape: ShapeComponent;
  private executor: ShapeCommandExecutor;

  constructor(shape: ShapeComponent, executor: ShapeCommandExecutor) {
    this.shape = shape.clone();
    this.executor = executor;
    makeAutoObservable(this);
  }

  execute(): void {
    this.executor.addShapeToState(this.shape.clone());
  }

  undo(): void {
    this.executor.removeShapeFromState(this.shape.getId());
  }
}
