import React from "react";
import styled from "styled-components";
import { Section, Song, Reading, Plain, Cover } from "../../components/models";

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
  reorder: (fromID: number, toID: number) => void;
}

export class ProgramEvent extends React.Component<ProgramEventProps, {}> {
  drag = (event: React.DragEvent<any>) => {
    event.dataTransfer.setData("id", this.props.id.toString());
  };

  drop(event, id) {
    event.preventDefault();
    let data = event.dataTransfer.getData("id");
    this.props.reorder(parseInt(data), id)
  }

  allowDrop(event) {
    event.preventDefault();
  }

  render() {
    let event;
    if (this.props.item.type === "song") {
      event = (
        <EventTitle onClick={() => this.props.onClick(this.props.id)}>
          {this.props.item.title}
          {this.props.item.songtitle}
        </EventTitle>
      );
    }
    if (this.props.item.type === "reading") {
      event = (
        <EventTitle onClick={() => this.props.onClick(this.props.id)}>
          {this.props.item.title}
          {this.props.item.readingtitle}
        </EventTitle>
      );
    }
    if (this.props.item.type === "cover") {
      event = (
        <EventTitle onClick={() => this.props.onClick(this.props.id)}>
          {this.props.item.title}
        </EventTitle>
      );
    }
    if (this.props.item.type === "plain") {
      event = (
        <EventTitle onClick={() => this.props.onClick(this.props.id)}>
          {this.props.item.title}
        </EventTitle>
      );
    }

    return (
      <li
        draggable={true}
        onDragStart={event => this.drag(event)}
        onDrop={event => this.drop(event, this.props.id)}
        onDragOver={event => this.allowDrop(event)}
      >
        {event}
      </li>
    );
  }
}
