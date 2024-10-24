# 벡터 그래픽 에디터 Term Project

> 2017320124 송동욱

## 목표

디자인 패턴을 적용하여 벡터 그래픽 에디터를 개발합니다.
cavnas object 는 image, text, line, rectangle, ellipse 등을 포함합니다.
Typescript 를 사용하는 경우 반드시 interface를 이용하여 구현해야 합니다.

## 구현 기능 리스트

object 를 type 별로 생성 할 수 있다
object를 multi select 할 수 있다
object가 선택된 경우 속성창에 선택된 object 의 속성을 보여줄 수 있다
선택된 object 가 없는 경우 아무 것도 보여주지 않는다
object 의 위치와 크기를 조절 할 수 있다
속성창에 위치와 크기 값이 즉시 반영 된다
속성창에서 특정 값을 바꾸면 object 에 즉시 반영 된다
object 의 z-order 를 조절할 수 있다
확장 기능:
object 내부에 text 를 표시할 수 있다
object 외부에 액자와 같은 프레임을 표시할 수 있다
object 의 shadow 를 표시 할 수 있다
적용 가능한 디자인 패턴 (예):
Abstract Factory, Singleton, Composite, State, Command, Observer, Decorator, etc
