import { Stage, Layer } from "react-konva";
import styled from "styled-components";
import { AppProvider, Box } from "@channel.io/bezier-react";
import LeftPanel from "./components/LeftPanel";
import PropertyPanel from "./components/PropertyPanel";
import DebugPanel from "./components/DebugPanel";
import Canvas from "./components/Canvas";
import "@channel.io/bezier-react/styles.css";
import "./styles/reset.css";

const AppContainer = styled(Box)`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const MainContent = styled(Box)`
  flex: 1;
  display: flex;
  height: 100%;
`;

const CanvasContainer = styled(Box)`
  flex: 1;
  height: 100%;
`;

function App() {
  return (
    <AppProvider>
      <AppContainer>
        <LeftPanel />
        <MainContent>
          <CanvasContainer>
            <Canvas />
          </CanvasContainer>
          <PropertyPanel />
          <DebugPanel />
        </MainContent>
      </AppContainer>
    </AppProvider>
  );
}

export default App;
