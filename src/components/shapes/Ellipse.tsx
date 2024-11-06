import Konva from "konva";
import { Ellipse as KonvaEllipse, Transformer } from "react-konva";
import { Shape } from "@/models/Shape";
import { ShapeProperties } from "@/models/Shape";
import { useEffect, useRef } from "react";
import { KonvaEventObject } from "konva/lib/Node";

interface EllipseProps {
  shape: Shape;
  isSelected: boolean;
  onSelect: (e: KonvaEventObject<MouseEvent | TouchEvent>) => void;
  onChange: (updates: Partial<ShapeProperties>) => void;
}

const Ellipse = ({ shape, isSelected, onSelect, onChange }: EllipseProps) => {
  const shapeRef = useRef<Konva.Ellipse>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (isSelected && transformerRef.current && shapeRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <KonvaEllipse
        ref={shapeRef}
        x={shape.getPosition().x + shape.getSize().width / 2}
        y={shape.getPosition().y + shape.getSize().height / 2}
        radiusX={shape.getSize().width / 2}
        radiusY={shape.getSize().height / 2}
        rotation={shape.getRotation()}
        fill="#00D5FF"
        onClick={onSelect}
        onTap={onSelect}
        draggable
        onDragEnd={(e) => {
          onChange({
            position: {
              x: e.target.x() - shape.getSize().width / 2,
              y: e.target.y() - shape.getSize().height / 2,
            },
          });
        }}
        onTransformEnd={() => {
          if (!shapeRef.current) return;

          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);

          onChange({
            position: {
              x: node.x() - (node.radiusX() * 2) / 2,
              y: node.y() - (node.radiusY() * 2) / 2,
            },
            size: {
              width: node.radiusX() * 2 * scaleX,
              height: node.radiusY() * 2 * scaleY,
            },
            rotation: node.rotation(),
          });
        }}
      />
      {isSelected && <Transformer ref={transformerRef} />}
    </>
  );
};

export default Ellipse;
