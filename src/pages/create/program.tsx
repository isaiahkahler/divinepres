import React from 'react';
import { Page } from 'src/components/page';
import styled from 'styled-components';
import { ProgramEvent } from 'src/pages/create/event';
import { Song, Reading, Plain, Cover, Option } from 'src/components/models';
import { Menu } from 'src/pages/create/menu';

const ListProgram = styled.ul`
  list-style-type: none;
  border-left: #000 solid 5px;
`;

interface ProgramProps {
  template: Array<any>;
}
interface ProgramState {
  program: Array<Plain | Song | Reading | Cover>;
  menu: {active: boolean, event: number};
}
export class Program extends React.Component<ProgramProps, ProgramState> {
  constructor(props: any) {
    super(props);
    this.state = {
      program: this.props.template,
      menu: {active: false, event: -1}
    };
  }

  handleCloseMenu = () => {
    this.setState(previousState => (
      {...previousState,
      menu: {active: false, event: -1}
    }
    ));
  }

  generateMenu() {
    if(this.state.menu.active){
      return <Menu title={"modify " + this.state.program[this.state.menu.event].type} event={this.state.program[this.state.menu.event]} onClose={this.handleCloseMenu}/>
    }
    return <div />
  }

  handleProgramEventClick = (id: number) => {
    this.setState(previousState => (
      {
        ...previousState,
        menu: {active: true, event: id}
      }
    ));
  };

  generateProgramEvents() {
    return this.state.program.map((item, index) => (
      <ProgramEvent item={item} key={index} id={index} onClick={this.handleProgramEventClick} />
    ));
  }

  render() {
    let menu = this.generateMenu();
    return (
      <React.Fragment>
        {menu}
        <Page title="Create Program">
          <ListProgram>{this.generateProgramEvents()}</ListProgram>
        </Page>
      </React.Fragment>
    );
  }
}
