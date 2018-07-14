import React from 'react';
import styled from 'styled-components';
import { PlusIcon } from 'src/components/icons';
import {Song, Reading, Plain, Cover} from 'src/components/models';

const Event = styled.li`
  /* display: inline; */
`;

const InlineH1 = styled.h1`
    display: inline;
`;

interface ProgramEventProps {
  item: Plain | Song | Reading | Cover;
  onClick?: any;
}

export class ProgramEvent extends React.Component<ProgramEventProps, {}> {
    getIcon() {
        
    }

  render() {
    if (this.props.item.data === Song) {
      return (
        <Event>
          <InlineH1>{this.props.item.title + this.props.item.songtitle}</InlineH1>
          <PlusIcon onClick={this.props.onClick} />
        </Event>
      );
    }
    if (this.props.item.type === 'reading') {
      return (
        <Event>
          <InlineH1>{this.props.item.title + this.props.item.readingtitle}</InlineH1>
          <PlusIcon onClick={this.props.onClick} />
        </Event>
      );
    }
    if (this.props.item.type === 'cover') {
      return (
        <Event>
          <InlineH1>{this.props.item.title}</InlineH1>
          <PlusIcon onClick={this.props.onClick} />
        </Event>
      );
    }
    if (this.props.item.type === 'plain') {
      return (
        <Event>
          <InlineH1>{this.props.item.title}</InlineH1>
        </Event>
      );
    }
    
    
  }
}
