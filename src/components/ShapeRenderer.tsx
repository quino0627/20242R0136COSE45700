import { ShapeProperties } from "@/models/Shape";
import { Shape } from "@/models/Shape";
import { KonvaEventObject } from "konva/lib/Node";
import { ShapeRendererFactory } from "@/factories/ShapeRendererFactory";

interface ShapeRendererProps {
  shape: Shape;
  isSelected: boolean;
  onSelect: (e: KonvaEventObject<MouseEvent | TouchEvent>) => void;
  onChange: (updates: Partial<ShapeProperties>) => void;
}

const ShapeRenderer = (props: ShapeRendererProps) => {
  const factory = ShapeRendererFactory.getInstance();
  const Renderer = factory.getRenderer(props.shape.getType());

  if (!Renderer) {
    return null;
  }

  return <Renderer {...props} />;
};

export default ShapeRenderer;
