import { useState, useCallback } from "react";
import { useCommand } from "./useCommand";
import { Shape } from "@/models/Shape";

export const useTextEditor = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const { updateShape } = useCommand();

  const startEditing = useCallback((id: string) => {
    setEditingId(id);
  }, []);

  const finishEditing = useCallback(
    (shape: Shape, text: string) => {
      updateShape(shape, { text });
      setEditingId(null);
    },
    [updateShape]
  );

  return {
    editingId,
    startEditing,
    finishEditing,
  };
};
