import { ShapeViewModel } from "../viewmodels/ShapeViewModel";
import { ShapeService } from "@/services/ShapeService";
import { SelectionManager } from "@/managers/SelectionManager";

const shapeService = ShapeService.getInstance();
const selectionManager = SelectionManager.getInstance();

const shapeViewModel = new ShapeViewModel(shapeService, selectionManager);

export const useShapeViewModel = () => {
  return shapeViewModel;
};
