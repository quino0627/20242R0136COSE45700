import { Position, Size } from "./types";
import { Shape } from "./Shape";
import { ShapeGroup } from "./ShapeGroup";

/**
 * Visitor 패턴을 위한 인터페이스
 * Shape와 ShapeGroup에 대한 각각의 방문 메서드를 정의
 */
export interface ShapeVisitor {
  visitShape(shape: Shape): void;
  visitShapeGroup(group: ShapeGroup): void;
}

/**
 * Composite 패턴의 Component 역할
 * Shape(Leaf)와 ShapeGroup(Composite)의 공통 인터페이스
 *
 * 기본 속성 관련:
 * - getId: 각 컴포넌트의 고유 식별자
 * - position, size, rotation, zIndex: 도형의 기본 속성들
 *
 * 텍스트 관련 (옵셔널):
 * - getText, setText: 텍스트 도형을 위한 메서드
 *
 * Composite 패턴 관련 (옵셔널):
 * - getComponents: 자식 컴포넌트 목록 반환
 * - addComponent: 자식 컴포넌트 추가
 * - removeComponent: 자식 컴포넌트 제거
 *
 * 기타:
 * - clone: 깊은 복사를 위한 메서드
 * - accept: Visitor 패턴 구현을 위한 메서드
 */
export interface ShapeComponent {
  getId(): string;
  getPosition(): Position;
  setPosition(position: Position): void;
  getSize(): Size;
  setSize(size: Size): void;
  getRotation(): number;
  setRotation(rotation: number): void;
  getZIndex(): number;
  setZIndex(zIndex: number): void;
  getText?(): string | undefined;
  setText?(text: string): void;
  clone(): ShapeComponent;
  accept(visitor: ShapeVisitor): void;
  getComponents?(): ShapeComponent[];
  addComponent?(component: ShapeComponent): void;
  removeComponent?(componentId: string): void;
}
