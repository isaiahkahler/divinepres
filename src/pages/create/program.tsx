import React from 'react';
import { Page } from 'src/components/page';
import styled from 'styled-components';
import { ProgramEvent } from 'src/pages/create/event';
import { Song, Reading, Plain, Cover, Option } from 'src/components/models';
import { Menu } from 'src/pages/create/menu';
import { fetchHymn, fetchHymnTitle } from 'src/pages/create/fetch-hmyn';
import { unwatchFile } from 'fs';

import { NavLink } from 'react-router-dom';

const ListProgram = styled.ul`
  list-style-type: none;
  border-left: #000 solid 5px;
`;

const Subtitle = styled.h2`
  text-align: center;
  font-size: 4vh;
  margin: 0;
`;

const BarItem = styled.input`
  margin: 0 10px;
  background-color: #ccc;
  font-family: 'Heebo';
  font-size: 4vh;
  font-weight: 500;
  border-style: none;
  border-radius: 10px;
  transition: 0.3s;
  &:hover {
    background-color: #0080ff;
    color: #fff;
  }
`;

interface ProgramProps {
  template: Array<any>;
}
interface ProgramState {
  program: Array<Plain | Song | Reading | Cover>;
  menu: { active: boolean; event: number };
}
export class Program extends React.Component<ProgramProps, ProgramState> {
  constructor(props: any) {
    super(props);
    this.state = {
      program: this.props.template,
      menu: { active: false, event: -1 }
    };
  }

  handleCloseMenu = () => {
    this.setState(previousState => ({
      ...previousState,
      menu: { active: false, event: -1 }
    }));
  };

  generateMenu() {
    if (this.state.menu.active) {
      return (
        <Menu
          title={'modify ' + this.state.program[this.state.menu.event].type}
          event={this.state.program[this.state.menu.event]}
          onClose={this.handleCloseMenu}
          submitHandler={this.handleMenuUpdate}
          onDelete={this.handleEventDelete}
        />
      );
    }
    return <div />;
  }

  handleProgramEventClick = (id: number) => {
    this.setState(previousState => ({
      ...previousState,
      menu: { active: true, event: id }
    }));
  };

  handleEventDelete = () => {
    let newProgram = this.state.program.slice();
    delete newProgram[this.state.menu.event];
    this.setState(previousState => ({
      ...previousState,
      program: newProgram,
      menu: { active: false, event: -1 }
    }));

    this.handleCloseMenu();
  };

  generateProgramEvents() {
    return this.state.program.map((item, index) => (
      <ProgramEvent item={item} key={index} id={index} onClick={this.handleProgramEventClick} />
    ));
  }

  handleMenuUpdate = (dataName, newValue) => {
    if (dataName === 'songnumber') {
      if (this.state.program[this.state.menu.event].type === 'song') {
        // this.handleSongSearch(newValue);
        let newProgram = this.state.program.slice();
        newProgram[this.state.menu.event]["lyrics"] = "yah";
        newProgram[this.state.menu.event]["songtitle"] = "yeet";
        this.setState(previousState => ({
          ...previousState,
          program: newProgram
        }))
      }
      //call server to get lyrics, then update the program in state (should update DOM)
      //also readings
    } else {
      let newProgram = this.state.program.slice();
      newProgram[this.state.menu.event][dataName] = newValue;
      this.setState(previousState => ({
        ...previousState,
        program: newProgram
      }));
    }
  };

  handlePresentationMode = () => {
    localStorage.setItem('program', JSON.stringify(this.state.program));
  };

  handleSongSearch = async (hymn: number) => {
    const event = this.state.menu.event;
    const lyrics = await fetchHymn(hymn.toString());
    const title = await fetchHymnTitle(hymn.toString());
    let newProgram = this.state.program.slice();
    newProgram[event]['lyrics'] = lyrics;
    newProgram[event]['songtitle'] = title;
    newProgram[event]['songnumber'] = hymn.toString();
    this.setState(previousState => ({
      ...previousState,
      program: newProgram
    }));
  };

  render() {
    let menu = this.generateMenu();
    return (
      <React.Fragment>
        {menu}
        <Page title="Create Program">
          <Subtitle>click an event to modify it</Subtitle>
          <div>
            <NavLink to="/present">
              <BarItem
                type="button"
                value="start presentation"
                onClick={this.handlePresentationMode}
              />
            </NavLink>
            <BarItem type="button" value="add event" />

            <BarItem type="button" value="order events" />
          </div>
          <ListProgram>{this.generateProgramEvents()}</ListProgram>
        </Page>
      </React.Fragment>
    );
  }
}
