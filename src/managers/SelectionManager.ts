import { ShapeComponent } from "@/models/ShapeComponent";
import { ShapeGroup } from "@/models/ShapeGroup";
import { observable, action, computed } from "mobx";
import { makeAutoObservable } from "mobx";

export class SelectionManager {
  private static instance: SelectionManager;
  @observable private selection: ShapeGroup | null = null;

  private constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  static getInstance(): SelectionManager {
    if (!SelectionManager.instance) {
      SelectionManager.instance = new SelectionManager();
    }
    return SelectionManager.instance;
  }

  @action
  select(component: ShapeComponent): void {
    const newGroup = new ShapeGroup([component]);
    this.selection = newGroup;
  }

  @action
  addToSelection(component: ShapeComponent): void {
    if (!this.selection) {
      const newGroup = new ShapeGroup([component]);
      this.selection = newGroup;
      return;
    }

    const components = [...this.selection.getComponents(), component];
    const newGroup = new ShapeGroup(components);
    this.selection = newGroup;
  }

  @action
  removeFromSelection(componentId: string): void {
    if (!this.selection) {
      return;
    }

    const components = this.selection
      .getComponents()
      .filter((c) => c.getId() !== componentId);

    if (components.length === 0) {
      this.selection = null;
    } else {
      const newGroup = new ShapeGroup(components);
      this.selection = newGroup;
    }
  }

  @action
  clearSelection(): void {
    this.selection = null;
  }

  getSelection(): ShapeGroup | null {
    return this.selection;
  }

  @computed
  get selectedIds(): string[] {
    return this.selection?.getComponents().map((c) => c.getId()) ?? [];
  }
}
