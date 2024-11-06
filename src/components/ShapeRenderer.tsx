import { ShapeProperties } from "@/models/Shape";
import { Shape } from "@/models/Shape";
import Rectangle from "./shapes/Rectangle";
import Ellipse from "./shapes/Ellipse";
import Line from "./shapes/Line";
import Text from "./shapes/Text";
// import Image from "./shapes/Image";
import { ShapeType } from "@/constants/ShapeType";
import { KonvaEventObject } from "konva/lib/Node";

interface ShapeRendererProps {
  shape: Shape;
  isSelected: boolean;
  onSelect: (e: KonvaEventObject<MouseEvent | TouchEvent>) => void;
  onChange: (updates: Partial<ShapeProperties>) => void;
}

const ShapeRenderer = ({
  shape,
  isSelected,
  onSelect,
  onChange,
}: ShapeRendererProps) => {
  const renderComponent = () => {
    const commonProps = {
      shape,
      isSelected,
      onSelect,
      onChange,
    };

    switch (shape.getType()) {
      case ShapeType.RECTANGLE:
        return <Rectangle {...commonProps} />;
      case ShapeType.ELLIPSE:
        return <Ellipse {...commonProps} />;
      case ShapeType.LINE:
        return <Line {...commonProps} />;
      case ShapeType.TEXT:
        return <Text {...commonProps} />;
      // case ShapeType.IMAGE:
      //   return <Image {...commonProps} />;
    }
    return null;
  };

  return renderComponent();
};

export default ShapeRenderer;
