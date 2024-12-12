import { Shape } from "@/models/Shape";
import { ShapeProperties } from "@/models/Shape";
import { ShapeType } from "@/constants/ShapeType";
import { KonvaEventObject } from "konva/lib/Node";
import Rectangle from "@/components/shapes/Rectangle";
import Ellipse from "@/components/shapes/Ellipse";
import Line from "@/components/shapes/Line";
import Text from "@/components/shapes/Text";
import { ComponentType } from "react";

interface ShapeRendererProps {
  shape: Shape;
  isSelected: boolean;
  onSelect: (e: KonvaEventObject<MouseEvent | TouchEvent>) => void;
  onChange: (updates: Partial<ShapeProperties>) => void;
}

type ShapeRendererComponent = ComponentType<ShapeRendererProps>;

export class ShapeRendererFactory {
  private static instance: ShapeRendererFactory;
  private rendererMap: Map<ShapeType, ShapeRendererComponent>;

  private constructor() {
    this.rendererMap = new Map([
      [ShapeType.RECTANGLE, Rectangle],
      [ShapeType.ELLIPSE, Ellipse],
      [ShapeType.LINE, Line],
      [ShapeType.TEXT, Text],
    ]);
  }

  public static getInstance(): ShapeRendererFactory {
    if (!ShapeRendererFactory.instance) {
      ShapeRendererFactory.instance = new ShapeRendererFactory();
    }
    return ShapeRendererFactory.instance;
  }

  getRenderer(type: ShapeType): ShapeRendererComponent | null {
    return this.rendererMap.get(type) || null;
  }
}
