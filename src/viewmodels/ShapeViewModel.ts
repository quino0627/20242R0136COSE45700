import { ShapeComponent } from "@/models/ShapeComponent";
import { SelectionManager } from "@/managers/SelectionManager";
import { ShapeService } from "@/services/ShapeService";
import { computed, makeAutoObservable } from "mobx";

export class ShapeViewModel {
  private shapeService: ShapeService;
  private selectionManager: SelectionManager;

  constructor(shapeService: ShapeService, selectionManager: SelectionManager) {
    this.shapeService = shapeService;
    this.selectionManager = selectionManager;
    makeAutoObservable(this);
  }

  get shapes(): ShapeComponent[] {
    return this.shapeService.getShapes();
  }

  selectShape(id: string): void {
    const shape = this.shapeService.getShapeById(id);
    if (shape) {
      this.selectionManager.select(shape);
    }
  }

  addToSelection(id: string): void {
    const shape = this.shapeService.getShapeById(id);
    if (shape) {
      this.selectionManager.addToSelection(shape);
    }
  }

  clearSelection(): void {
    this.selectionManager.clearSelection();
  }

  isSelected(id: string): boolean {
    return this.selectedIds.includes(id);
  }

  @computed
  get selectedShapes(): ShapeComponent[] {
    return this.selectionManager.getSelection()?.getComponents() ?? [];
  }

  @computed
  get hasSelection(): boolean {
    return this.selectionManager.getSelection() !== null;
  }

  @computed
  get selectedIds(): string[] {
    return this.selectionManager.selectedIds;
  }
}
