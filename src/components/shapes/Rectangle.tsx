import Konva from "konva";
import { Rect, Transformer } from "react-konva";
import { Shape } from "@/models/Shape";
import { ShapeProperties } from "@/models/Shape";
import { useEffect, useRef } from "react";
import { KonvaEventObject } from "konva/lib/Node";

interface RectangleProps {
  shape: Shape;
  isSelected: boolean;
  onSelect: (e: KonvaEventObject<MouseEvent | TouchEvent>) => void;
  onChange: (updates: Partial<ShapeProperties>) => void;
}

const Rectangle = ({
  shape,
  isSelected,
  onSelect,
  onChange,
}: RectangleProps) => {
  const shapeRef = useRef<Konva.Rect>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  console.log(isSelected);

  useEffect(() => {
    if (isSelected && transformerRef.current && shapeRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Rect
        ref={shapeRef}
        x={shape.getPosition().x}
        y={shape.getPosition().y}
        width={shape.getSize().width}
        height={shape.getSize().height}
        rotation={shape.getRotation()}
        fill="#00D5FF"
        onClick={(e) => {
          console.log("Rectangle clicked:", shape.getId());
          e.cancelBubble = true;
          onSelect(e);
        }}
        stroke={isSelected ? "#00A9FF" : "transparent"}
        strokeWidth={isSelected ? 2 : 0}
        draggable
        onDragEnd={(e) => {
          onChange({
            position: {
              x: e.target.x(),
              y: e.target.y(),
            },
          });
        }}
        onTransformEnd={() => {
          if (!shapeRef.current) return;

          const node = shapeRef.current;
          onChange({
            position: {
              x: node.x(),
              y: node.y(),
            },
            size: {
              width: node.width() * node.scaleX(),
              height: node.height() * node.scaleY(),
            },
            rotation: node.rotation(),
          });
        }}
      />
      {isSelected && <Transformer ref={transformerRef} />}
    </>
  );
};

export default Rectangle;
