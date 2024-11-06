import styled from "styled-components";

export const Panel = styled.div`
  width: 250px;
  height: 100%;
  border-left: 1px solid var(--bg-navi);
  padding: 16px;
  background-color: var(--bg-navi);
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 0;
  border-bottom: 1px solid var(--bz-color-line-default);

  &:last-child {
    border-bottom: none;
  }
`;

export const PropertyItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  input {
    width: 80px;
    height: 32px;
    padding: 0 8px;
    border: 1px solid var(--bz-color-line-default);
    border-radius: 4px;
    background-color: var(--bz-color-white);
    font-size: 14px;

    &:focus {
      outline: none;
      border-color: var(--bz-color-cobalt-50);
    }

    &::placeholder {
      color: var(--bz-color-gray-500);
    }
  }
`;
