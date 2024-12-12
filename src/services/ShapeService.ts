import { ShapeComponent } from "@/models/ShapeComponent";
import { ShapeProperties } from "@/models/Shape";
import { ShapeType } from "@/constants/ShapeType";
import { ShapeFactory } from "@/factories/ShapeFactory";
import { makeAutoObservable } from "mobx";
import { ShapeCommandExecutor } from "@/commands/ShapeCommandExecutor";

export class ShapeService implements ShapeCommandExecutor {
  private static instance: ShapeService;
  private shapes: ShapeComponent[] = [];

  private constructor() {
    makeAutoObservable(this);
  }

  static getInstance(): ShapeService {
    if (!this.instance) {
      this.instance = new ShapeService();
    }
    return this.instance;
  }

  getShapes(): ShapeComponent[] {
    return this.shapes;
  }

  addShape(type: ShapeType): ShapeComponent {
    const shape = ShapeFactory.getInstance().createShape(type);
    this.shapes.push(shape);
    return shape;
  }

  removeShape(id: string): void {
    const index = this.shapes.findIndex((s) => s.getId() === id);
    if (index !== -1) {
      this.shapes.splice(index, 1);
    }
  }

  updateShape(shape: ShapeComponent, updates: Partial<ShapeProperties>): void {
    const target = this.shapes.find((s) => s.getId() === shape.getId());
    if (!target) return;

    if (updates.position) target.setPosition(updates.position);
    if (updates.size) target.setSize(updates.size);
    if (updates.rotation !== undefined) target.setRotation(updates.rotation);
    if (updates.zIndex !== undefined) target.setZIndex(updates.zIndex);
    if (updates.text !== undefined && target.setText)
      target.setText(updates.text);
    if (updates.color !== undefined) target.setColor?.(updates.color);
  }

  getShapeById(id: string): ShapeComponent | undefined {
    return this.shapes.find((s) => s.getId() === id);
  }

  addShapeToState(shape: ShapeComponent): void {
    this.shapes.push(shape);
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
    console.log(
      "ShapeService updateShapeInState:",
      shape.getId(),
      updates,
      !!target
    );
    if (!target) return;

    if (updates.position) target.setPosition(updates.position);
    if (updates.size) target.setSize(updates.size);
    if (updates.rotation !== undefined) target.setRotation(updates.rotation);
    if (updates.zIndex !== undefined) target.setZIndex(updates.zIndex);
    if (updates.text !== undefined && target.setText)
      target.setText(updates.text);
    if (updates.color !== undefined && target.setColor) {
      console.log("Setting color:", updates.color);
      target.setColor(updates.color);
    }
  }
}
