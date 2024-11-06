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
  const { selectedShapes, hasSelection, updateSelectedShapes } = vm;

  if (!hasSelection) {
    return (
      <Panel>
        <Text typo="14" bold>
          선택된 객체가 없습니다
        </Text>
      </Panel>
    );
  }

  const getCommonValue = <T,>(
    getter: (component: ShapeComponent) => T
  ): PropertyValue<T> => {
    const values = selectedShapes.map(getter);
    const firstValue = values[0];
    return {
      value: values.every((v) => v === firstValue) ? firstValue : null,
      isMultiple: !values.every((v) => v === firstValue),
    };
  };

  const handlePositionChange = (axis: keyof Position, value: number) => {
    const currentPosition = selectedShapes[0].getPosition();
    updateSelectedShapes({
      position: {
        ...currentPosition,
        [axis]: value,
      },
    });
  };

  const handleSizeChange = (dimension: keyof Size, value: number) => {
    const currentSize = selectedShapes[0].getSize();
    updateSelectedShapes({
      size: {
        ...currentSize,
        [dimension]: value,
      },
    });
  };

  const position = {
    x: getCommonValue((component) => component.getPosition().x),
    y: getCommonValue((component) => component.getPosition().y),
  };

  const size = {
    width: getCommonValue((component) => component.getSize().width),
    height: getCommonValue((component) => component.getSize().height),
  };

  // const color = getCommonValue((component) => component.getColor?.());

  const handleColorChange = (value: string) => {
    updateSelectedShapes({
      color: value,
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
