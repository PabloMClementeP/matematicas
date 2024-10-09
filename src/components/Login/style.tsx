import styled from "styled-components";

export const Form = styled.form`
  max-width: 500px;
  margin: auto;
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const NameInput = styled.input`
  display: block;
  margin-top: 8px;
  padding: 8px;
  width: 64px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 32px;
  text-align: center;
`;
