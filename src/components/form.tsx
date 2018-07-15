import React from 'react';
import styled from 'styled-components';

const Submit = styled.input`
  margin-left: 40%;
  margin-right: 40%;
  width: 20%;
  font-size: 3vh;
  font-family: 'Heebo';
  border: 0px;
  background-color: #eee;
`;

export function Form(props: {
  children: any;
  onSubmit?: any;
  submitButton?: boolean;
  submitButtonValue?: string;
}) {
  return (
    <form onSubmit={props.onSubmit}>
      {props.children}
      {props.submitButton && <Submit type="submit" value={props.submitButtonValue || 'submit'} />}
    </form>
  );
}
