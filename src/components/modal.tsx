import React from 'react';
import styled from 'styled-components';

const StyledModal = styled.div`
  position: fixed;
  border-radius: 10px;
  width: 80vw;
  height: 80vh;
  left: 10vw;
  top: 10vh;
  z-index: 2;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(10, 10, 10, 0.1), 0 0 0 2px rgba(10, 10, 10, 0.1);
`;

export class Modal extends React.Component<{ children?: any; title?: string }, {}> {
  render() {
    return (
      <StyledModal>
        {this.props.title && <h1>{this.props.title}</h1>}
        {this.props.children}
      </StyledModal>
    );
  }
}
