import { ShapeComponent } from "@/models/ShapeComponent";
import { ShapeProperties } from "@/models/Shape";

export interface ShapeCommandExecutor {
  addShapeToState(shape: ShapeComponent): void;
  removeShapeFromState(id: string): void;
  updateShapeInState(
    shape: ShapeComponent,
    updates: Partial<ShapeProperties>
  ): void;
}
