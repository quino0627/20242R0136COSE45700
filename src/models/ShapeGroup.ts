import { ShapeComponent, ShapeVisitor } from "./ShapeComponent";
import { Position, Size } from "./types";
import { makeAutoObservable, observable, computed, action } from "mobx";

export class ShapeGroup implements ShapeComponent {
  @observable.shallow private components: ShapeComponent[] = [];

  constructor(components: ShapeComponent[] = []) {
    this.components = [...components];
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get id(): string {
    return `group-${this.components.map((c) => c.getId()).join("-")}`;
  }

  getId(): string {
    return this.id;
  }

  getPosition(): Position {
    if (this.components.length === 0) {
      return { x: 0, y: 0 };
    }
    const positions = this.components.map((c) => c.getPosition());
    const minX = Math.min(...positions.map((p) => p.x));
    const minY = Math.min(...positions.map((p) => p.y));
    return { x: minX, y: minY };
  }

  setPosition(position: Position): void {
    if (this.components.length === 0) return;

    const oldPosition = this.getPosition();
    const dx = position.x - oldPosition.x;
    const dy = position.y - oldPosition.y;

    this.components.forEach((component) => {
      const pos = component.getPosition();
      component.setPosition({
        x: pos.x + dx,
        y: pos.y + dy,
      });
    });
  }

  getSize(): Size {
    if (this.components.length === 0) {
      return { width: 0, height: 0 };
    }
    const positions = this.components.map((c) => c.getPosition());
    const sizes = this.components.map((c) => c.getSize());

    const minX = Math.min(...positions.map((p) => p.x));
    const maxX = Math.max(...positions.map((p, i) => p.x + sizes[i].width));
    const minY = Math.min(...positions.map((p) => p.y));
    const maxY = Math.max(...positions.map((p, i) => p.y + sizes[i].height));

    return {
      width: maxX - minX,
      height: maxY - minY,
    };
  }

  setSize(size: Size): void {
    if (this.components.length === 0) return;

    const oldSize = this.getSize();
    const scaleX = size.width / oldSize.width;
    const scaleY = size.height / oldSize.height;
    const groupPos = this.getPosition();

    this.components.forEach((component) => {
      const pos = component.getPosition();
      const componentSize = component.getSize();

      component.setPosition({
        x: groupPos.x + (pos.x - groupPos.x) * scaleX,
        y: groupPos.y + (pos.y - groupPos.y) * scaleY,
      });

      component.setSize({
        width: componentSize.width * scaleX,
        height: componentSize.height * scaleY,
      });
    });
  }

  getRotation(): number {
    return this.components.length > 0 ? this.components[0].getRotation() : 0;
  }

  setRotation(rotation: number): void {
    this.components.forEach((component) => component.setRotation(rotation));
  }

  getZIndex(): number {
    return this.components.length > 0 ? this.components[0].getZIndex() : 0;
  }

  setZIndex(zIndex: number): void {
    this.components.forEach((component) => component.setZIndex(zIndex));
  }

  @action
  accept(visitor: ShapeVisitor): void {
    visitor.visitShapeGroup(this);
    this.components.forEach((component) => {
      component.accept(visitor);
    });
  }

  getComponents(): ShapeComponent[] {
    return [...this.components];
  }

  @action
  addComponent(component: ShapeComponent): void {
    this.components.push(component);
  }

  @action
  removeComponent(componentId: string): void {
    const index = this.components.findIndex((c) => c.getId() === componentId);
    if (index !== -1) {
      this.components.splice(index, 1);
    }
  }

  clone(): ShapeComponent {
    return new ShapeGroup(
      this.components.map((component) => component.clone())
    );
  }
}
