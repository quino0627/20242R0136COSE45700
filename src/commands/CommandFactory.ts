import { Command } from "./Command";
import { AddShapeCommand } from "./AddShapeCommand";
import { RemoveShapeCommand } from "./RemoveShapeCommand";
import { UpdateShapeCommand } from "./UpdateShapeCommand";
import { ShapeComponent } from "@/models/ShapeComponent";
import { ShapeProperties } from "@/models/Shape";
import { ShapeCommandExecutor } from "./ShapeCommandExecutor";
import { makeAutoObservable } from "mobx";

export class CommandFactory {
  private static instance: CommandFactory;
  private executor: ShapeCommandExecutor;

  private constructor(executor: ShapeCommandExecutor) {
    this.executor = executor;
    makeAutoObservable(this);
  }

  public static getInstance(executor: ShapeCommandExecutor): CommandFactory {
    if (!CommandFactory.instance) {
      CommandFactory.instance = new CommandFactory(executor);
    }
    return CommandFactory.instance;
  }

  createAddCommand(shape: ShapeComponent): Command {
    return new AddShapeCommand(shape, this.executor);
  }

  createRemoveCommand(shape: ShapeComponent): Command {
    return new RemoveShapeCommand(shape, this.executor);
  }

  createUpdateCommand(
    shape: ShapeComponent,
    updates: Partial<ShapeProperties>
  ): Command {
    return new UpdateShapeCommand(shape, updates, this.executor);
  }
}
