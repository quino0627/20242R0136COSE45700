import Konva from "konva";
import { Text as KonvaText, Transformer } from "react-konva";
import { Html } from "react-konva-utils";
import { Shape } from "@/models/Shape";
import { ShapeProperties } from "@/models/Shape";
import { useEffect, useRef } from "react";
import { KonvaEventObject } from "konva/lib/Node";
import { useTextEditor } from "@/hooks/useTextEditor";
import { observer } from "mobx-react-lite";

interface TextProps {
  shape: Shape;
  isSelected: boolean;
  onSelect: (e: KonvaEventObject<MouseEvent | TouchEvent>) => void;
  onChange: (updates: Partial<ShapeProperties>) => void;
}

const Text = observer(
  ({ shape, isSelected, onSelect, onChange }: TextProps) => {
    const shapeRef = useRef<Konva.Text>(null);
    const transformerRef = useRef<Konva.Transformer>(null);
    const { editingId, startEditing, finishEditing } = useTextEditor();
    const isEditing = editingId === shape.getId();

    useEffect(() => {
      if (isSelected && transformerRef.current && shapeRef.current) {
        transformerRef.current.nodes([shapeRef.current]);
        transformerRef.current.getLayer()?.batchDraw();
      }
    }, [isSelected]);

    if (isEditing) {
      return (
        <Html>
          <textarea
            autoFocus
            defaultValue={shape.getText()}
            style={{
              position: "absolute",
              left: `${shape.getPosition().x}px`,
              top: `${shape.getPosition().y}px`,
              width: `${shape.getSize().width}px`,
              height: `${shape.getSize().height}px`,
              border: "none",
              padding: "5px",
              margin: "0px",
              background: "none",
              outline: "1px solid #00A9FF",
              fontSize: "16px",
              fontFamily: "Inter",
              resize: "none",
            }}
            onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {
              finishEditing(shape, e.target.value);
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
              e.stopPropagation();

              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                finishEditing(shape, (e.target as HTMLTextAreaElement).value);
              }
            }}
          />
        </Html>
      );
    }

    return (
      <>
        <KonvaText
          ref={shapeRef}
          x={shape.getPosition().x}
          y={shape.getPosition().y}
          text={shape.getText() || "텍스트를 입력하세요"}
          fontSize={16}
          fill={shape.getColor()}
          width={shape.getSize().width}
          height={shape.getSize().height}
          rotation={shape.getRotation()}
          onClick={onSelect}
          onTap={onSelect}
          onDblClick={() => startEditing(shape.getId())}
          onDblTap={() => startEditing(shape.getId())}
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
  }
);

export default Text;
