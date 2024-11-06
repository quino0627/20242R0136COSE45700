import { useRef, useState } from "react";

const useHover = () => {
  const stateRef = useRef({
    isHovered: false,
    enterCount: 0,
    leaveCount: 0,
  });

  const handleMouseEnter = () => {
    stateRef.current.isHovered = true;
    stateRef.current.enterCount++;
  };

  const handleMouseLeave = () => {
    stateRef.current.isHovered = false;
    stateRef.current.leaveCount++;
  };

  return {
    stateRef,
    handleMouseEnter,
    handleMouseLeave,
    get hovered() {
      return stateRef.current.isHovered;
    },
  };
};

function RenderExpensiveTree() {
  return (
    <ul>
      {Array(10000)
        .fill(0)
        .map((e, i) => (
          <li key={i} style={{ display: "none" }}></li>
        ))}
    </ul>
  );
}

function GenericRedBox() {
  return (
    <div
      style={{
        backgroundColor: "red",
        width: "20px",
        height: "20px",
        border: "1px solid black",
      }}
    />
  );
}

function GenericGreenBox() {
  return (
    <div
      style={{
        backgroundColor: "green",
        width: "20px",
        height: "20px",
        border: "1px solid black",
      }}
    />
  );
}

function WorkingExample() {
  return (
    <Example title="Working">
      {(hovered) =>
        hovered ? (
          <div
            style={{
              backgroundColor: "green",
              width: "20px",
              height: "20px",
              border: "1px solid black",
            }}
          />
        ) : (
          <div
            style={{
              backgroundColor: "red",
              width: "20px",
              height: "20px",
              border: "1px solid black",
            }}
          />
        )
      }
    </Example>
  );
}

function NotWorkingExample() {
  return (
    <Example title="Not working :(">
      {(hovered) => (hovered ? <GenericGreenBox /> : <GenericRedBox />)}
    </Example>
  );
}

export default function App() {
  return (
    <>
      <WorkingExample />
      <NotWorkingExample />
    </>
  );
}

function Example({ children, title }) {
  const [, forceUpdate] = useState({});
  const { stateRef, handleMouseEnter, handleMouseLeave, hovered } = useHover();

  // mouseenter/leave 이벤트 발생 시 리렌더링을 위한 핸들러
  const handleEnter = () => {
    handleMouseEnter();
    forceUpdate({});
  };

  const handleLeave = () => {
    handleMouseLeave();
    forceUpdate({});
  };

  return (
    <div>
      <h3>{title}</h3>
      <div
        style={{ width: "24px", height: "24px" }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {children(hovered)}
        <RenderExpensiveTree />
      </div>
      <p>
        Enter count: <span>{stateRef.current.enterCount}</span>
      </p>
      <p>
        Leave count: <span>{stateRef.current.leaveCount}</span>
      </p>
      <p>
        Diff:{" "}
        <span>{stateRef.current.enterCount - stateRef.current.leaveCount}</span>
      </p>
    </div>
  );
}
