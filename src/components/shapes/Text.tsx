import Konva from "konva";
import { Text as KonvaText, Transformer } from "react-konva";
import { Shape } from "@/models/Shape";
import { ShapeProperties } from "@/models/Shape";
import { useEffect, useRef } from "react";
import { KonvaEventObject } from "konva/lib/Node";

interface TextProps {
  shape: Shape;
  isSelected: boolean;
  onSelect: (e: KonvaEventObject<MouseEvent | TouchEvent>) => void;
  onChange: (updates: Partial<ShapeProperties>) => void;
}

const Text = ({ shape, isSelected, onSelect, onChange }: TextProps) => {
  const shapeRef = useRef<Konva.Text>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (isSelected && transformerRef.current && shapeRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <KonvaText
        ref={shapeRef}
        x={shape.getPosition().x}
        y={shape.getPosition().y}
        text={shape.getText() || "텍스트를 입력하세요"}
        fontSize={16}
        fill="#00D5FF"
        width={shape.getSize().width}
        height={shape.getSize().height}
        rotation={shape.getRotation()}
        onClick={onSelect}
        onTap={onSelect}
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

export default Text;
