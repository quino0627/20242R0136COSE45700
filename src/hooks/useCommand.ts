import { ShapeType } from "@/constants/ShapeType";
import { ShapeProperties } from "@/models/Shape";
import { ShapeComponent } from "@/models/ShapeComponent";
import { CommandService } from "@/services/CommandService";
import { ShapeService } from "@/services/ShapeService";
import { SelectionManager } from "@/managers/SelectionManager";

const shapeService = ShapeService.getInstance();
const commandService = CommandService.getInstance(shapeService);
const selectionManager = SelectionManager.getInstance();

export const useCommand = () => {
  const addShape = (type: ShapeType) => {
    commandService.addShape(type);
  };

  const removeShape = (shape: ShapeComponent) => {
    commandService.removeShape(shape);
  };

  const updateShape = (
    shape: ShapeComponent,
    updates: Partial<ShapeProperties>
  ) => {
    commandService.updateShape(shape, updates);
  };

  const undo = () => {
    commandService.undo();
  };

  const redo = () => {
    commandService.redo();
  };

  const canUndo = () => {
    return commandService.canUndo();
  };

  const canRedo = () => {
    return commandService.canRedo();
  };

  const getCommandHistory = () => {
    return commandService.getCommandHistory();
  };

  const removeSelectedShapes = () => {
    const selection = selectionManager.getSelection();
    if (selection) {
      commandService.removeShape(selection);
      selectionManager.clearSelection();
    }
  };

  return {
    addShape,
    removeShape,
    updateShape,
    undo,
    redo,
    canUndo,
    canRedo,
    getCommandHistory,
    removeSelectedShapes,
  };
};
