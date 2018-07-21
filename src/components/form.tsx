import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  text-align: center;
`;

 const Submit = styled.input`
  font-size: 3vh;
  font-family: 'Heebo';
  border: 0px;
  background-color: #eee;
`;

export function Form(props: {
  children?: any;
  onSubmit?: any;
  submitButton?: boolean;
  submitButtonValue?: string;
}) {
  return (
    <StyledForm onSubmit={props.onSubmit}>
      {props.children}
      {props.submitButton && <Submit type="submit" value={props.submitButtonValue || 'submit'} />}
    </StyledForm>
  );
}
