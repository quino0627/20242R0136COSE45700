import {
  Stack,
  Text,
  Button,
  Overlay,
  ListItem,
  Select,
  SelectRef,
} from "@channel.io/bezier-react";
import { Panel, Section, PropertyItem } from "./styled";
import { ShapeComponent } from "@/models/ShapeComponent";
import { Position, Size } from "@/models/types";
import { useShapeViewModel } from "@/hooks/useShapeViewModel";
import { useCommand } from "@/hooks/useCommand";
import { observer } from "mobx-react-lite";
import { useState, useRef } from "react";

interface PropertyValue<T> {
  value: T | null;
  isMultiple: boolean;
}

// const COLOR_PRESETS = [
//   { label: "코발트", value: "#0051CC", textColor: "#FFFFFF" },
//   { label: "레드", value: "#DC3545", textColor: "#FFFFFF" },
//   { label: "그린", value: "#28A745", textColor: "#FFFFFF" },
//   { label: "옐로우", value: "#FFC107", textColor: "#000000" },
//   { label: "퍼플", value: "#6F42C1", textColor: "#FFFFFF" },
// ] as const;

// const ColorOption = ({ label, value, onColorChange }) => (
//   <ListItem content={label} onClick={() => onColorChange(value)} />
// );

const PropertyPanel = observer(() => {
  const selectRef = useRef<SelectRef>(null);
  const vm = useShapeViewModel();
  const { updateShape } = useCommand();
  const { selectedShapes, hasSelection } = vm;

  if (!hasSelection) {
    return (
      <Panel>
        <Text typo="14" bold>
          선택된 객체가 없습니다
        </Text>
      </Panel>
    );
  }

  const handlePositionChange = (axis: keyof Position, value: number) => {
    selectedShapes.forEach((shape) => {
      const currentPosition = shape.getPosition();
      updateShape(shape, {
        position: {
          ...currentPosition,
          [axis]: value,
        },
      });
    });
  };

  const handleSizeChange = (dimension: keyof Size, value: number) => {
    selectedShapes.forEach((shape) => {
      const currentSize = shape.getSize();
      updateShape(shape, {
        size: {
          ...currentSize,
          [dimension]: value,
        },
      });
    });
  };

  const position = {
    x: {
      value: selectedShapes[0].getPosition().x,
      isMultiple: selectedShapes.length > 1,
    },
    y: {
      value: selectedShapes[0].getPosition().y,
      isMultiple: selectedShapes.length > 1,
    },
  };

  const size = {
    width: {
      value: selectedShapes[0].getSize().width,
      isMultiple: selectedShapes.length > 1,
    },
    height: {
      value: selectedShapes[0].getSize().height,
      isMultiple: selectedShapes.length > 1,
    },
  };

  // const color = getCommonValue((component) => component.getColor?.());

  const handleColorChange = (value: string) => {
    selectedShapes.forEach((shape) => {
      updateShape(shape, {
        color: value,
      });
    });
  };

  return (
    <Panel>
      <Stack direction="vertical" spacing={16}>
        <Section>
          <Text typo="14" bold>
            선택된 객체: {selectedShapes.length}개
          </Text>
        </Section>

        <Section>
          <Text typo="14" bold>
            위치
          </Text>
          <PropertyItem>
            <Text>X</Text>
            <input
              type="number"
              value={position.x.value ?? ""}
              onChange={(e) =>
                handlePositionChange("x", Number(e.target.value))
              }
              placeholder={position.x.isMultiple ? "여러 값" : undefined}
            />
          </PropertyItem>
          <PropertyItem>
            <Text>Y</Text>
            <input
              type="number"
              value={position.y.value ?? ""}
              onChange={(e) =>
                handlePositionChange("y", Number(e.target.value))
              }
              placeholder={position.y.isMultiple ? "여러 값" : undefined}
            />
          </PropertyItem>
        </Section>

        <Section>
          <Text typo="14" bold>
            크기
          </Text>
          <PropertyItem>
            <Text>너비</Text>
            <input
              type="number"
              value={size.width.value ?? ""}
              onChange={(e) =>
                handleSizeChange("width", Number(e.target.value))
              }
              placeholder={size.width.isMultiple ? "여러 값" : undefined}
            />
          </PropertyItem>
          <PropertyItem>
            <Text>높이</Text>
            <input
              type="number"
              value={size.height.value ?? ""}
              onChange={(e) =>
                handleSizeChange("height", Number(e.target.value))
              }
              placeholder={size.height.isMultiple ? "여러 값" : undefined}
            />
          </PropertyItem>
        </Section>

        <Section>
          <Text typo="14" bold>
            색상
          </Text>
        </Section>
      </Stack>
    </Panel>
  );
});

export default PropertyPanel;
