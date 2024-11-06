import { ShapeType } from "@/constants/ShapeType";
import { ShapeComponent, ShapeVisitor } from "./ShapeComponent";
import { Position, Size } from "./types";
import { makeAutoObservable, observable, runInAction } from "mobx";

export interface ShapeProperties {
  id: string;
  type: ShapeType;
  position: Position;
  size: Size;
  rotation: number;
  zIndex: number;
  text?: string;
  color?: string;
}

export class Shape implements ShapeComponent {
  @observable private properties: ShapeProperties;

  constructor(properties: ShapeProperties) {
    this.properties = {
      ...properties,
      position: observable({ ...properties.position }),
      size: observable({ ...properties.size }),
    };
    makeAutoObservable(this, {}, { deep: true });
  }

  accept(visitor: ShapeVisitor): void {
    visitor.visitShape(this);
  }

  getId(): string {
    return this.properties.id;
  }

  getType(): ShapeType {
    return this.properties.type;
  }

  getPosition(): Position {
    return this.properties.position;
  }

  setPosition(position: Position): void {
    runInAction(() => {
      this.properties.position = observable({
        x: position.x,
        y: position.y,
      });
      this.properties = { ...this.properties };
    });
  }

  getSize(): Size {
    return this.properties.size;
  }

  setSize(size: Size): void {
    runInAction(() => {
      this.properties.size = observable({
        width: size.width,
        height: size.height,
      });
    });
  }

  getRotation(): number {
    return this.properties.rotation;
  }

  setRotation(rotation: number): void {
    this.properties.rotation = rotation;
  }

  getZIndex(): number {
    return this.properties.zIndex;
  }

  setZIndex(zIndex: number): void {
    this.properties.zIndex = zIndex;
  }

  getText(): string | undefined {
    return this.properties.text;
  }

  setText(text: string): void {
    this.properties.text = text;
  }

  getColor(): string {
    return this.properties.color ?? "#0051CC";
  }

  setColor(color: string): void {
    this.properties.color = color;
  }

  clone(): ShapeComponent {
    return new Shape({
      id: this.properties.id,
      type: this.properties.type,
      position: { ...this.properties.position },
      size: { ...this.properties.size },
      rotation: this.properties.rotation,
      zIndex: this.properties.zIndex,
      text: this.properties.text,
      color: this.properties.color,
    });
  }
}
