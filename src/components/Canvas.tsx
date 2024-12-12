import { useShapeViewModel } from "@/hooks/useShapeViewModel";
import { ShapeComponent } from "@/models/ShapeComponent";
import { Shape } from "@/models/Shape";
import { ShapeProperties } from "@/models/Shape";
import { useEffect, useCallback } from "react";
import ShapeRenderer from "@/components/ShapeRenderer";
import { ShapeGroup } from "@/models/ShapeGroup";
import { KonvaEventObject } from "konva/lib/Node";
import { observer } from "mobx-react-lite";
import { Group, Layer, Stage } from "react-konva";
import { useCommand } from "@/hooks/useCommand";
import { useTextEditor } from "@/hooks/useTextEditor";

const Canvas = observer(() => {
  const vm = useShapeViewModel();
  const { updateShape, undo, redo, removeSelectedShapes } = useCommand();
  const { editingId } = useTextEditor();

  const getAllShapes = (component: ShapeComponent): Shape[] => {
    if (component instanceof Shape) {
      return [component];
    }
    if (component instanceof ShapeGroup) {
      return component.getComponents().flatMap(getAllShapes);
    }
    return [];
  };

  const shapes = vm.shapes.flatMap(getAllShapes);

  const sortedShapes = shapes
    .slice()
    .sort((a, b) => a.getZIndex() - b.getZIndex());

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (editingId) return;

      if (e.key === "Escape") {
        vm.clearSelection();
      } else if (e.key === "Backspace" && vm.hasSelection) {
        removeSelectedShapes();
      } else if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
        e.preventDefault();
      }
    },
    [vm, undo, redo, removeSelectedShapes, editingId]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleCanvasClick = (e: KonvaEventObject<MouseEvent>) => {
    if (e.target === e.target.getStage()) {
      vm.clearSelection();
    }
  };

  return (
    <Stage
      width={window.innerWidth - 850}
      height={window.innerHeight}
      onClick={handleCanvasClick}
    >
      <Layer>
        <Group>
          {sortedShapes.map((shape: Shape) => {
            const isSelected = vm.isSelected(shape.getId());
            return (
              <ShapeRenderer
                key={shape.getId()}
                shape={shape}
                isSelected={isSelected}
                onSelect={(e: KonvaEventObject<MouseEvent | TouchEvent>) => {
                  if (e.evt.shiftKey) {
                    vm.addToSelection(shape.getId());
                  } else {
                    vm.selectShape(shape.getId());
                  }
                }}
                onChange={(updates: Partial<ShapeProperties>) =>
                  updateShape(shape, updates)
                }
              />
            );
          })}
        </Group>
      </Layer>
    </Stage>
  );
});

export default Canvas;
