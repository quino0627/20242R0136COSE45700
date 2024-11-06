import { ShapeProperties } from "@/models/Shape";
import { ShapeComponent } from "@/models/ShapeComponent";

export interface ShapeCommandExecutor {
  addShapeToState(shape: ShapeComponent): void;
  removeShapeFromState(id: string): void;
  updateShapeInState(
    shape: ShapeComponent,
    updates: Partial<ShapeProperties>
  ): void;
  getShapeById(id: string): ShapeComponent | undefined;
}
