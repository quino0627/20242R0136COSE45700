import React from "react";
import styled from "styled-components";
import { useShapeViewModel } from "@/hooks/useShapeViewModel";
import { useCommand } from "@/hooks/useCommand";
import { observer } from "mobx-react-lite";

const Panel = styled.div`
  width: 300px;
  height: 100%;
  border-left: 1px solid var(--bg-navi);
  padding: 16px;
  background-color: #f5f5f5;
  overflow: auto;
`;

const DebugPanel = observer(() => {
  const vm = useShapeViewModel();
  const { getCommandHistory } = useCommand();

  const getDebugInfo = () => {
    return {
      shapes: vm.shapes.map((shape) => ({
        id: shape.getId(),
        type: "-",
        position: shape.getPosition(),
        size: shape.getSize(),
        rotation: shape.getRotation(),
        zIndex: shape.getZIndex(),
      })),
      commandHistory: getCommandHistory().map((command) => ({
        type: command.constructor.name,
      })),
    };
  };

  return (
    <Panel>
      <h3>ShapeViewModel 상태</h3>
      <pre>{JSON.stringify(getDebugInfo(), null, 2)}</pre>
    </Panel>
  );
});

export default DebugPanel;
