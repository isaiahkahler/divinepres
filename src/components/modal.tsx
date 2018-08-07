import React from 'react';
import styled from 'styled-components';
import { CloseIcon } from './icons';

const StyledModal = styled.div`
  width: 80vw;
  height: 80vh;
  left: 10vw;
  top: 10vh;
  z-index: 3;
  position: fixed;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(10, 10, 10, 0.1), 0 0 0 2px rgba(10, 10, 10, 0.1);
  background-color: #fff;
  overflow: auto;
`;

const PaddedContent = styled.div`
  padding: 50px;
`;

const CenteredTitle = styled.h1`
  text-align: center;
`;

const FixedIcon = styled.span`
  top: 5vh;
  position: absolute;
  padding-right: 0;
`;

export class Modal extends React.Component<{ children?: any; title?: string; onClose?: any }, {}> {
  render() {
    return (
      <StyledModal className="animated slideInUp">
        <PaddedContent>
          <div>
              <FixedIcon>
                <CloseIcon onClick={this.props.onClose} />
              </FixedIcon>
              {this.props.title && <CenteredTitle>{this.props.title}</CenteredTitle>}
              {this.props.children}
            </div>
        </PaddedContent>
      </StyledModal>
    );
  }
}
