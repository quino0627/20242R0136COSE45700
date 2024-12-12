# 벡터 그래픽 에디터 Term Project

> 2017320124 송동욱

## 목표

디자인 패턴을 적용하여 벡터 그래픽 에디터를 개발합니다.
cavnas object 는 image, text, line, rectangle, ellipse 등을 포함합니다.
Typescript 를 사용하는 경우 반드시 interface를 이용하여 구현해야 합니다.

## 교재

Design Patterns: Elements of Reusable Object-Oriented Software

## 구현 기능 리스트

- object 를 type 별로 생성 할 수 있다 ✅
- object를 multi select 할 수 있다
- object가 선택된 경우 속성창에 선택된 object 의 속성을 보여줄 수 있다
- 선택된 object 가 없는 경우 아무 것도 보여주지 않는다
- object 의 위치와 크기를 조절 할 수 있다
- 속성창에 위치와 크기 값이 즉시 반영 된다
- 속성창에서 특정 값을 바꾸면 object 에 즉시 반영 된다
- object 의 z-order 를 조절할 수 있다

## 확장 기능:

- object 내부에 text 를 표시할 수 있다
- object 외부에 액자와 같은 프레임을 표시할 수 있다
- object 의 shadow 를 표시 할 수 있다

## 적용 가능한 디자인 패턴 (예):

- Abstract Factory
- Singleton
- Composite
- State
- Command
- Observer
- Decorator

## 구현 시 참고할 사항 들

- MVVM 패턴을 사용해야 한다.
- 과제에서는 앱스트랙트 팩토리를 쓰더라도 하나만 뽑아내는 팩토리가 될 것
- 과제에서는 팩토리는 하나 정도만 사용된다.
- 컴퍼짓을 사용할 일이 반드시 있을것이다
- State, Observer, Abstract Factory, Singleton, Composite, Command 패턴 사용해야 함
- 다중 선택을 list 가 아닌 composite 으로 구현해야 함
- SelectionManager는 싱글톤으로, 커맨드 안에서 싱글톤 서비스 값 가져오기
- 언도 리도는 커맨드를 큐에 집어넣기
- 커맨드를 컴퍼짓 해서 복합 명령이 가능(?)
- 커맨드는 연결이지, 안에서 직접 뭔가 하는건 지양하자
