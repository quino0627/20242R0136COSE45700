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

const Canvas = observer(() => {
  const vm = useShapeViewModel();
  console.log("Canvas rendering, shapes:", vm.shapes);

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

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        vm.clearSelection();
      } else if (e.key === "Backspace" && vm.hasSelection) {
        vm.removeSelectedShapes();
      } else if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        if (e.shiftKey) {
          vm.redo();
        } else {
          vm.undo();
        }
        e.preventDefault();
      }
    },
    [vm]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleCanvasClick = (e: KonvaEventObject<MouseEvent>) => {
    if (e.target === e.target.getStage()) {
      console.log("Canvas background clicked");
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
          {shapes.map((shape: Shape) => {
            const isSelected = vm.isSelected(shape.getId());
            console.log("Canvas rendering, shape:", shape.getId(), isSelected);
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
                  vm.updateShape(shape.getId(), updates)
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
