import React from 'react';
import styled from 'styled-components';
import { PlusIcon, EditIcon } from 'src/components/icons';
import {Section, Song, Reading, Plain, Cover} from 'src/components/models';

const InlineH1 = styled.h1`
    display: inline;
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
          <InlineH1>{this.props.item.title}{this.props.item.songtitle}</InlineH1>
          {/* {this.props.item.icon || <PlusIcon onClick={() => this.props.onClick(this.props.id)} />} */}
          {this.props.item.icon === "add" && <PlusIcon onClick={() => this.props.onClick(this.props.id)} />}
          {this.props.item.icon === "edit" && <EditIcon onClick={() => this.props.onClick(this.props.id)} />}
          
        </li>
      );
    }
    if (this.props.item.type === 'reading') {
      return (
        <li>
          <InlineH1>{this.props.item.title}{this.props.item.readingtitle}</InlineH1>
          {/* {this.props.item.icon || <PlusIcon onClick={() => this.props.onClick(this.props.id)} />} */}
          {this.props.item.icon === "add" && <PlusIcon onClick={() => this.props.onClick(this.props.id)} />}
          {this.props.item.icon === "edit" && <EditIcon onClick={() => this.props.onClick(this.props.id)} />}
        </li>
      );
    }
    if (this.props.item.type === 'cover') {
      return (
        <li>
          <InlineH1>{this.props.item.title}</InlineH1>
          {/* {this.props.item.icon || <PlusIcon onClick={() => this.props.onClick(this.props.id)} />} */}
          {this.props.item.icon === "add" && <PlusIcon onClick={() => this.props.onClick(this.props.id)} />}
          {this.props.item.icon === "edit" && <EditIcon onClick={() => this.props.onClick(this.props.id)} />}
        </li>
      );
    }
    if (this.props.item.type === 'plain') {
      return (
        <li>
          <InlineH1>{this.props.item.title}</InlineH1>
        </li>
      );
    }
    
    
  }
}
