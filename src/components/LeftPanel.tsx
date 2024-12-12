import { Button, Stack, Text } from "@channel.io/bezier-react";
import { ShapeType } from "@/constants/ShapeType";
import { useCommand } from "@/hooks/useCommand";
import { useShapeViewModel } from "@/hooks/useShapeViewModel";
import styled from "styled-components";
import { observer } from "mobx-react-lite";

const Panel = styled.div`
  width: 250px;
  height: 100%;
  border-right: 1px solid var(--bg-navi);
  padding: 16px;
  background-color: var(--bg-navi);
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 0;
  border-bottom: 1px solid var(--bz-color-line-default);
`;

const LeftPanel = observer(() => {
  const vm = useShapeViewModel();
  const { addShape, undo, redo, canUndo, canRedo, bringToFront, sendToBack } =
    useCommand();
  const { selectedShapes } = vm;

  const handleBringToFront = () => {
    selectedShapes.forEach((shape) => {
      bringToFront(shape);
    });
  };

  const handleSendToBack = () => {
    selectedShapes.forEach((shape) => {
      sendToBack(shape);
    });
  };

  return (
    <Panel>
      <Stack direction="vertical" spacing={16}>
        <Section>
          <Text typo="14" bold>
            편집
          </Text>
          <Stack direction="horizontal" spacing={8}>
            <Button
              size="m"
              colorVariant="cobalt"
              styleVariant="secondary"
              onClick={undo}
              text="실행 취소"
              disabled={!canUndo()}
            >
              실행 취소
            </Button>
            <Button
              size="m"
              colorVariant="cobalt"
              styleVariant="secondary"
              onClick={redo}
              text="다시 실행"
              disabled={!canRedo()}
            >
              다시 실행
            </Button>
          </Stack>
        </Section>

        <Section>
          <Text typo="14" bold>
            도형 추가
          </Text>
          <Stack direction="vertical" spacing={8}>
            <Button
              size="m"
              colorVariant="cobalt"
              styleVariant="secondary"
              onClick={() => addShape(ShapeType.RECTANGLE)}
              text="사각형"
            >
              사각형
            </Button>
            <Button
              size="m"
              colorVariant="cobalt"
              styleVariant="secondary"
              onClick={() => addShape(ShapeType.ELLIPSE)}
              text="원"
            >
              원
            </Button>
            <Button
              size="m"
              colorVariant="cobalt"
              styleVariant="secondary"
              onClick={() => addShape(ShapeType.LINE)}
              text="선"
            >
              선
            </Button>
            <Button
              size="m"
              colorVariant="cobalt"
              styleVariant="secondary"
              onClick={() => addShape(ShapeType.TEXT)}
              text="텍스트"
            >
              텍스트
            </Button>
            {/* <Button
              size="m"
              colorVariant="cobalt"
              styleVariant="secondary"
              onClick={() => onCreateObject(ShapeType.IMAGE)}
              text="이미지"
            >
              이미지
            </Button> */}
          </Stack>
        </Section>

        <Section>
          <Text typo="14" bold>
            정렬
          </Text>
          <Stack direction="vertical" spacing={8}>
            <Button
              size="m"
              colorVariant="cobalt"
              styleVariant="secondary"
              onClick={handleBringToFront}
              text="맨 앞으로"
              disabled={!vm.hasSelection}
            >
              맨 앞으로
            </Button>
            <Button
              size="m"
              colorVariant="cobalt"
              styleVariant="secondary"
              onClick={handleSendToBack}
              text="맨 뒤로"
              disabled={!vm.hasSelection}
            >
              맨 뒤로
            </Button>
          </Stack>
        </Section>

        <Section>
          <Text typo="14" bold>
            효과
          </Text>
          <Stack direction="vertical" spacing={8}>
            <Button
              size="m"
              colorVariant="cobalt"
              styleVariant="secondary"
              onClick={() => console.log("toggle shadow")}
              text="그림자"
            >
              그림자
            </Button>
            <Button
              size="m"
              colorVariant="cobalt"
              styleVariant="secondary"
              onClick={() => console.log("toggle frame")}
              text="프레임"
            >
              프레임
            </Button>
          </Stack>
        </Section>
      </Stack>
    </Panel>
  );
});

export default LeftPanel;
