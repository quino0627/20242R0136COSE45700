import { Command } from "@/commands/Command";
import { CommandHistory } from "@/commands/CommandHistory";
import { CommandFactory } from "@/commands/CommandFactory";
import { ShapeComponent } from "@/models/ShapeComponent";
import { ShapeProperties } from "@/models/Shape";
import { ShapeType } from "@/constants/ShapeType";
import { ShapeCommandExecutor } from "@/commands/ShapeCommandExecutor";

export class CommandService {
  private static instance: CommandService;
  private commandHistory: CommandHistory;
  private commandFactory: CommandFactory;

  private constructor(executor: ShapeCommandExecutor) {
    this.commandHistory = CommandHistory.getInstance();
    this.commandFactory = CommandFactory.getInstance(executor);
  }

  static getInstance(executor: ShapeCommandExecutor): CommandService {
    if (!this.instance) {
      this.instance = new CommandService(executor);
    }
    return this.instance;
  }

  executeCommand(command: Command): void {
    this.commandHistory.execute(command);
  }

  addShape(type: ShapeType): void {
    const command = this.commandFactory.createAddCommand(type);
    this.executeCommand(command);
  }

  removeShape(shape: ShapeComponent): void {
    const command = this.commandFactory.createRemoveCommand(shape);
    this.executeCommand(command);
  }

  updateShape(shape: ShapeComponent, updates: Partial<ShapeProperties>): void {
    console.log("CommandService updateShape:", shape.getId(), updates);
    const command = this.commandFactory.createUpdateCommand(shape, updates);
    this.executeCommand(command);
  }

  undo(): void {
    this.commandHistory.undo();
  }

  redo(): void {
    this.commandHistory.redo();
  }

  canUndo(): boolean {
    return this.commandHistory.canUndo();
  }

  canRedo(): boolean {
    return this.commandHistory.canRedo();
  }

  getCommandHistory(): Command[] {
    return this.commandHistory.getHistory();
  }
}
