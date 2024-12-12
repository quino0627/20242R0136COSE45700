import { Command } from "./Command";
import { ShapeComponent } from "@/models/ShapeComponent";
import { ShapeCommandExecutor } from "./ShapeCommandExecutor";
import { ShapeType } from "@/constants/ShapeType";
import { ShapeFactory } from "@/factories/ShapeFactory";

export class AddShapeCommand implements Command {
  private shape: ShapeComponent;
  private executor: ShapeCommandExecutor;

  constructor(type: ShapeType, executor: ShapeCommandExecutor) {
    this.shape = ShapeFactory.getInstance().createShape(type);
    this.executor = executor;
  }

  execute(): void {
    this.executor.addShapeToState(this.shape.clone());
  }

  undo(): void {
    this.executor.removeShapeFromState(this.shape.getId());
  }
}
