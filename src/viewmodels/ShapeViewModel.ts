import { ShapeProperties } from "@/models/Shape";
import { ShapeType } from "@/constants/ShapeType";
import { ShapeFactory } from "@/factories/ShapeFactory";
import { SelectionManager } from "@/managers/SelectionManager";
import { Command } from "@/commands/Command";
import { CommandFactory } from "@/commands/CommandFactory";
import { ShapeComponent } from "@/models/ShapeComponent";
import { CommandHistory } from "@/commands/CommandHistory";
import { ShapeCommandExecutor } from "@/commands/ShapeCommandExecutor";
import { computed, makeAutoObservable, observable, runInAction } from "mobx";

export class ShapeViewModel implements ShapeCommandExecutor {
  shapes: ShapeComponent[] = observable.array([], { deep: false });

  private selectionManager = SelectionManager.getInstance();
  private commandHistory = CommandHistory.getInstance();
  private commandFactory = CommandFactory.getInstance(this);

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  addShapeToState(shape: ShapeComponent): void {
    this.shapes.push(shape);
    console.log(this.shapes);
  }

  removeShapeFromState(id: string): void {
    const index = this.shapes.findIndex((s) => s.getId() === id);
    if (index !== -1) {
      this.shapes.splice(index, 1);
    }
  }

  updateShapeInState(
    shape: ShapeComponent,
    updates: Partial<ShapeProperties>
  ): void {
    const target = this.shapes.find((s) => s.getId() === shape.getId());
    if (!target) return;

    runInAction(() => {
      if (updates.position) {
        target.setPosition(updates.position);
      }
      if (updates.size) {
        target.setSize(updates.size);
      }
      if (updates.rotation !== undefined) {
        target.setRotation(updates.rotation);
      }
      if (updates.zIndex !== undefined) {
        target.setZIndex(updates.zIndex);
      }
      if (updates.text !== undefined && target.setText) {
        target.setText(updates.text);
      }
    });
  }

  addShape(type: ShapeType): void {
    const shape = ShapeFactory.getInstance().createShape(type);
    const command = this.commandFactory.createAddCommand(shape);
    this.executeCommand(command);
  }

  removeShape(id: string): void {
    const shape = this.getShapeById(id);
    if (shape) {
      const command = this.commandFactory.createRemoveCommand(shape);
      this.executeCommand(command);
    }
  }

  updateShape(id: string, updates: Partial<ShapeProperties>): void {
    const shape = this.getShapeById(id);
    if (shape) {
      const command = this.commandFactory.createUpdateCommand(shape, updates);
      this.executeCommand(command);
    }
  }

  updateSelectedShapes(updates: Partial<ShapeProperties>): void {
    const selection = this.selectionManager.getSelection();
    if (!selection) return;

    selection.getComponents().forEach((component) => {
      const command = this.commandFactory.createUpdateCommand(
        component,
        updates
      );
      this.executeCommand(command);
    });
  }

  private executeCommand(command: Command): void {
    console.log("ShapeViewModel executeCommand", command);
    this.commandHistory.execute(command);
  }

  getShapeById(id: string): ShapeComponent | undefined {
    return this.shapes.find((s) => s.getId() === id);
  }

  get selectedShapes(): ShapeComponent[] {
    return this.selectionManager.getSelection()?.getComponents() ?? [];
  }

  get hasSelection(): boolean {
    return this.selectionManager.getSelection() !== null;
  }

  selectShape(id: string): void {
    console.log("ShapeViewModel.selectShape:", id);
    const shape = this.getShapeById(id);
    if (shape) {
      this.selectionManager.select(shape);
    }
  }

  addToSelection(id: string): void {
    const shape = this.getShapeById(id);
    if (shape) {
      this.selectionManager.addToSelection(shape);
    }
  }

  removeFromSelection(id: string): void {
    this.selectionManager.removeFromSelection(id);
  }

  clearSelection(): void {
    this.selectionManager.clearSelection();
  }

  @computed
  get selectedIds(): string[] {
    return this.selectionManager.selectedIds;
  }

  @computed
  isSelected(id: string): boolean {
    return this.selectedIds.includes(id);
  }

  get commandHistoryList(): Command[] {
    return this.commandHistory.getHistory();
  }

  removeSelectedShapes(): void {
    const selection = this.selectionManager.getSelection();
    if (selection) {
      const command = this.commandFactory.createRemoveCommand(selection);
      this.executeCommand(command);
      this.clearSelection();
    }
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
}
