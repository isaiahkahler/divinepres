import React from 'react';
import styled from 'styled-components';
import { Box } from 'src/components/box';

const Button = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 1.25rem;
  &:hover{
  background-color: #0080ff50;
  }
`;

interface FullButtonProps {
  label: string;
  onClick?: any;
  children?: any;
}
export function FullButton(props: FullButtonProps) {
  return (
    <Box>
      <Button className="full-button" onClick={props.onClick}>
        {props.children}
        <h1>{props.label}</h1>
      </Button>
    </Box>
  );
}
