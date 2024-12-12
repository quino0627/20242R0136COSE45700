import Konva from "konva";
import { Line as KonvaLine, Transformer } from "react-konva";
import { Shape } from "@/models/Shape";
import { ShapeProperties } from "@/models/Shape";
import { useEffect, useRef } from "react";
import { KonvaEventObject } from "konva/lib/Node";
import { observer } from "mobx-react-lite";

interface LineProps {
  shape: Shape;
  isSelected: boolean;
  onSelect: (e: KonvaEventObject<MouseEvent | TouchEvent>) => void;
  onChange: (updates: Partial<ShapeProperties>) => void;
}

const Line = observer(
  ({ shape, isSelected, onSelect, onChange }: LineProps) => {
    const shapeRef = useRef<Konva.Line>(null);
    const transformerRef = useRef<Konva.Transformer>(null);

    useEffect(() => {
      if (isSelected && transformerRef.current && shapeRef.current) {
        transformerRef.current.nodes([shapeRef.current]);
        transformerRef.current.getLayer()?.batchDraw();
      }
    }, [isSelected]);

    const points = [0, 0, shape.getSize().width, 0];

    return (
      <>
        <KonvaLine
          ref={shapeRef}
          points={points}
          x={shape.getPosition().x}
          y={shape.getPosition().y}
          stroke={shape.getColor()}
          strokeWidth={2}
          hitStrokeWidth={10}
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
            const scaleX = node.scaleX();

            node.scaleX(1);

            onChange({
              position: {
                x: node.x(),
                y: node.y(),
              },
              size: {
                width: Math.max(5, node.width() * scaleX),
                height: 0,
              },
              rotation: node.rotation(),
            });
          }}
          zIndex={shape.getZIndex()}
        />
        {isSelected && (
          <Transformer
            ref={transformerRef}
            enabledAnchors={["middle-left", "middle-right"]}
            boundBoxFunc={(oldBox, newBox) => {
              newBox.height = 0;
              return newBox;
            }}
          />
        )}
      </>
    );
  }
);

export default Line;
