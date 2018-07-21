import React from 'react';
import styled from 'styled-components';
import {Section, Song, Reading, Plain, Cover} from 'src/components/models';

const EventTitle = styled.h1`
  transition: 0.3s;
    &:hover {
      color: #0080ff;
    }
`;

interface ProgramEventProps {
  item: Plain | Song | Reading | Cover;
  id: number;
  onClick?: any;
}

export class ProgramEvent extends React.Component<ProgramEventProps, {}> {

  render() {
    if (this.props.item.type === "song"){
      return (
        <li>
          <EventTitle onClick={() => this.props.onClick(this.props.id)}>{this.props.item.title}{this.props.item.songtitle}</EventTitle>
          
        </li>
      );
    }
    if (this.props.item.type === 'reading') {
      return (
        <li>
          <EventTitle onClick={() => this.props.onClick(this.props.id)}>{this.props.item.title}{this.props.item.readingtitle}</EventTitle>
        </li>
      );
    }
    if (this.props.item.type === 'cover') {
      return (
        <li>
          <EventTitle onClick={() => this.props.onClick(this.props.id)}>{this.props.item.title}</EventTitle>
        </li>
      );
    }
    if (this.props.item.type === 'plain') {
      return (
        <li>
          <EventTitle onClick={() => this.props.onClick(this.props.id)}>{this.props.item.title}</EventTitle>
        </li>
      );
    }
    
    
  }
}
