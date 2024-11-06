import { ShapeViewModel } from "../viewmodels/ShapeViewModel";

const shapeViewModel = new ShapeViewModel();

export const useShapeViewModel = () => {
  return shapeViewModel;
};
