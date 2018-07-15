import React from 'react';
import { Page } from 'src/components/page';
import styled from 'styled-components';
import {ProgramEvent} from 'src/pages/create/event';
import {Song, Reading, Plain, Cover} from 'src/components/models';

const ListProgram = styled.ul`
  list-style-type: none;
  border-left: #000 solid 5px;
`;

interface ProgramProps {
  template: Array<any>;
}
interface ProgramState {
  program: Array<Plain | Song | Reading | Cover>;
  menu: any;
}
export class Program extends React.Component<ProgramProps, ProgramState> {
  constructor(props: any) {
    super(props);
    this.state = {
      program: this.props.template,
      menu: []
    };
  }

  handleProgramEventClick = (event: any) => {
    //bring up menu,,, or change to edit,,, orrrrrrrrrrr??
    console.log(event);
  }

  generateProgramEvents() {
    return this.state.program.map((item, index) => <ProgramEvent item={item} key={index} onClick={this.handleProgramEventClick} />);
  }

  render() {
    return (
      <Page title="Create Program">
        <ListProgram>{this.generateProgramEvents()}</ListProgram>
      </Page>
    );
  }
}
