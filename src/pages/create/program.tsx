import React from 'react';
import { Page } from '../../components/page';
import styled from 'styled-components';
import { ProgramEvent } from './event';
import { Song, Reading, Plain, Cover, Option } from '../../components/models';
import { Menu } from './menu';
import { fetchHymn, fetchHymnTitle, fetchReading } from './fetch-resources';
import { ModifyModal } from './modifyModal';
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
  modal: { active: boolean, type: "add event"}
}
export class Program extends React.Component<ProgramProps, ProgramState> {
  constructor(props: any) {
    super(props);
    this.state = {
      program: this.props.template,
      menu: { active: false, event: -1 },
      modal: { active: false, type: null }
    };
  }

  handleCloseMenu = () => {
    this.setState({ menu: { active: false, event: -1 } });
  };

  handleCloseModal = () => {
    this.setState({ modal: { active: false, type: null } })
  }

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

  generateModal() {
    if (this.state.modal.active) {
      return (
        <ModifyModal 
        type={this.state.modal.type} 
        onClose={this.handleCloseModal} 
        onSubmit={(newProgram) => this.setState({program: newProgram})}
        program={this.state.program}
        />
      )
    }
  }

  handleProgramEventClick = (id: number) => {
    this.setState(previousState => ({
      ...previousState,
      menu: { active: true, event: id }
    }));
  };

  handleEventDelete = () => {
    let newProgram = this.state.program.slice();
    newProgram.splice(this.state.menu.event, 1);
    this.setState(previousState => ({
      ...previousState,
      program: newProgram,
      menu: { active: false, event: -1 }
    }));

    this.handleCloseMenu();
  };


  handleCreateEvent = (eventType) => {
    console.log(eventType)
    // this.setState(previousState => ({
    //   ...previousState,
    //   program: [...previousState.program, {}]
    // }))
  }

  generateProgramEvents() {
    return this.state.program.map((item, index) => (
      <ProgramEvent item={item} key={index} id={index} onClick={this.handleProgramEventClick} reorder={this.handleReorderEvents} />
    ));
  }

  handleReorderEvents = (fromID: number, toID: number) => {
    let event = this.state.program[fromID];
    let newProgram = this.state.program;
    newProgram.splice(fromID, 1)
    newProgram.splice(toID, 0, event);
    this.setState({program: newProgram})
  }

  handleMenuUpdate = (dataName, newValue) => {
    if (dataName === 'songnumber') {
      if (this.state.program[this.state.menu.event].type === 'song') {
        this.handleSongSearch(newValue);
      }
    } else if (dataName === "readingtitle") {
      if (this.state.program[this.state.menu.event].type === 'reading') {
        this.handleReadingSearch(newValue);
      }
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
    let d = new Date;
    localStorage.setItem('date', d.toLocaleDateString());
  };

  handleSongSearch = async (hymn: number) => {
    const event = this.state.menu.event;
    const lyrics = await fetchHymn(hymn.toString());
    const title = await fetchHymnTitle(hymn.toString());
    let newProgram = this.state.program.slice();
    newProgram[event]['lyrics'] = lyrics;
    newProgram[event]['songtitle'] = title.substr(hymn.toString().length + 2);
    newProgram[event]['songnumber'] = hymn.toString();
    this.setState(previousState => ({
      ...previousState,
      program: newProgram,
      menu: { event: previousState.menu.event, active: false }
    }));
  };

  handleReadingSearch = async (passage: string) => {
    const event = this.state.menu.event;
    const reading = await fetchReading(passage);
    let newProgram = this.state.program.slice();
    newProgram[event]['content'] = reading;
    newProgram[event]['readingtitle'] = passage;
    this.setState(previousState => ({
      ...previousState,
      program: newProgram,
      menu: { event: previousState.menu.event, active: false }
    }));
  };

  componentDidUpdate() {
    if (!this.state.menu.active && this.state.menu.event !== -1) {
      this.setState(previousState => ({
        ...previousState,
        menu: { active: true, event: previousState.menu.event }
      }));
    }
  }

  render() {
    let menu = this.generateMenu();
    let modal = this.generateModal();
    return (
      <React.Fragment>
        {menu}
        {modal}
        <Page title="Create Program">
          <Subtitle>click an event to modify it. Drag and drop to reorder.</Subtitle>
          <div>
            <NavLink to="/present">
              <BarItem
                type="button"
                value="start presentation"
                onClick={this.handlePresentationMode}
              />
            </NavLink>
            <BarItem type="button" value="add event" onClick={() => this.setState({ modal: { active: true, type: "add event" } })} />

            {/* <BarItem type="button" value="order events" onClick={() => this.setState({modal: {active: true, type: "order events"} })} /> */}
          </div>
          <ListProgram>{this.generateProgramEvents()}</ListProgram>
        </Page>
      </React.Fragment>
    );
  }
}
