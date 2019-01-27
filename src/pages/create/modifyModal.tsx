import * as React from "react";
import { Modal } from "../../components/modal";
import { Dropdown } from "../../components/dropdown";
import styled from "styled-components";
import { Input } from "../../components/input";
import { Song, Reading, Plain, Cover, Option, SongTemplate, ReadingTemplate, CoverTemplate, PlainTemplate } from "../../components/models";
import { Form } from "../../components/form";

const Label = styled.h2`
  margin: 10px 0 0 0;
`;

interface ModifyModalProps {
  type: "add event";
  onClose: Function;
  onSubmit: (program) => void;
  program: Array<Reading | Song | Plain | Cover>;
}

interface ModifyModalState {
  type: "reading" | "song" | "plain" | "cover";
}

export class ModifyModal extends React.Component<
  ModifyModalProps,
  ModifyModalState
> {
  constructor(props: ModifyModalProps) {
    super(props);
    this.state = {
      type: "plain"
    };
  }

  componentDidUpdate() {
    console.log(this.state.type);
  }

  submit = () => {
    let newEvent:Reading | Song | Plain | Cover = null;
    if(this.state.type === "song"){
        newEvent = {...SongTemplate};
    } else if(this.state.type === "reading"){
        newEvent = {...ReadingTemplate};
    } else if(this.state.type === "cover") {
        newEvent = {...CoverTemplate};
    } else {
        newEvent = {...PlainTemplate};
    }
    let newProgram = this.props.program;
    newProgram.push(newEvent);
    this.props.onSubmit(newProgram)
    this.props.onClose()
  };

  render() {
    return (
      <Modal title={this.props.type} onClose={this.props.onClose}>
          <React.Fragment>
            <Label>Choose Event Type</Label>
            <Dropdown
              value={this.state.type}
              options={["plain", "song", "reading", "cover"]}
              onSubmit={value => this.setState({ type: value })}
              submitOnChange
            />
            <Form
              onSubmit={this.submit}
              submitButton={true}
              submitButtonValue="Add Event"
            />
          </React.Fragment>
      </Modal>
    );
  }
}
