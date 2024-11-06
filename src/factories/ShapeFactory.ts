import { ShapeType } from "@/constants/ShapeType";
import { Shape } from "@/models/Shape";
import { Position, Size } from "@/models/types";

interface ShapeCreator {
  createShape(position: Position, size: Size): Shape;
}

class RectangleCreator implements ShapeCreator {
  createShape(position: Position, size: Size): Shape {
    return new Shape({
      id: crypto.randomUUID(),
      type: ShapeType.RECTANGLE,
      position,
      size,
      rotation: 0,
      zIndex: 0,
    });
  }
}

class EllipseCreator implements ShapeCreator {
  createShape(position: Position, size: Size): Shape {
    return new Shape({
      id: crypto.randomUUID(),
      type: ShapeType.ELLIPSE,
      position,
      size,
      rotation: 0,
      zIndex: 0,
    });
  }
}

class LineCreator implements ShapeCreator {
  createShape(position: Position, size: Size): Shape {
    return new Shape({
      id: crypto.randomUUID(),
      type: ShapeType.LINE,
      position,
      size: { width: size.width, height: 0 },
      rotation: 0,
      zIndex: 0,
    });
  }
}

class TextCreator implements ShapeCreator {
  createShape(position: Position, size: Size): Shape {
    return new Shape({
      id: crypto.randomUUID(),
      type: ShapeType.TEXT,
      position,
      size,
      rotation: 0,
      zIndex: 0,
      text: "텍스트를 입력하세요",
    });
  }
}

class ImageCreator implements ShapeCreator {
  createShape(position: Position, size: Size): Shape {
    return new Shape({
      id: crypto.randomUUID(),
      type: ShapeType.IMAGE,
      position,
      size,
      rotation: 0,
      zIndex: 0,
    });
  }
}

export class ShapeFactory {
  private static instance: ShapeFactory;
  private creators: Map<ShapeType, ShapeCreator>;

  private constructor() {
    this.creators = new Map();
    this.creators.set(ShapeType.RECTANGLE, new RectangleCreator());
    this.creators.set(ShapeType.ELLIPSE, new EllipseCreator());
    this.creators.set(ShapeType.LINE, new LineCreator());
    this.creators.set(ShapeType.TEXT, new TextCreator());
    this.creators.set(ShapeType.IMAGE, new ImageCreator());
  }

  public static getInstance(): ShapeFactory {
    if (!ShapeFactory.instance) {
      ShapeFactory.instance = new ShapeFactory();
    }
    return ShapeFactory.instance;
  }

  createShape(
    type: ShapeType,
    position: Position = { x: 100, y: 100 },
    size: Size = { width: 100, height: 100 }
  ): Shape {
    const creator = this.creators.get(type);
    if (!creator) {
      throw new Error(`Unsupported shape type: ${type}`);
    }
    return creator.createShape(position, size);
  }
}
