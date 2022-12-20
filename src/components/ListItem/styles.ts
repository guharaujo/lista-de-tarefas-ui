import styled from "styled-components";

export const Container = styled.div`
  width: 650px;
  height: 25px;
  padding: 10px;
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  

  input {
    background-color: #ededed;
  }

  button {
    background-color: #1677ff;
    width: 50px;
  }

  input:disabled,
  input[disabled] {
    background-color: #cbcbcb;
    color: black;
  }
`;
