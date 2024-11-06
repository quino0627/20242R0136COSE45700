import { makeAutoObservable } from "mobx";
import { Command } from "./Command";

export class CommandHistory {
  private static instance: CommandHistory | null = null;
  private commands: Command[] = [];
  private redoStack: Command[] = [];

  private constructor() {
    makeAutoObservable(this);
  }

  static getInstance(): CommandHistory {
    if (!CommandHistory.instance) {
      CommandHistory.instance = new CommandHistory();
    }
    return CommandHistory.instance;
  }

  execute(command: Command): void {
    console.log("CommandHistory execute", command);
    command.execute();
    this.commands.push(command);
    this.redoStack = [];
  }

  undo(): void {
    const command = this.commands.pop();
    if (command) {
      command.undo();
      this.redoStack.push(command);
    }
  }

  redo(): void {
    const command = this.redoStack.pop();
    if (command) {
      command.execute();
      this.commands.push(command);
    }
  }

  canUndo(): boolean {
    return this.commands.length > 0;
  }

  canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  getHistory(): Command[] {
    return this.commands;
  }
}
