import * as React from 'react';
import { PlusIcon } from './icons';
import { Page, FullButton, Menu, Form } from './building-blocks';
import { timingSafeEqual } from 'crypto';

interface ProgramProps {
  template: Array<any>;
}
interface ProgramState {
  program: Array<any>;
  menu: {
    active: boolean;
    current: number;
    title: string;
    options: Array<{ type: string; display: any; content: any }>;
  };
}
export class Program extends React.Component<ProgramProps, ProgramState> {
  constructor(props: any) {
    super(props);
    this.state = {
      program: this.props.template,
      menu: { active: false, current: -1, title: '', options: [] }
    };
  }

  handleCloseMenu = () => {
    this.setState(previousState => ({
      ...previousState,
      menu: { active: false, current: -1, title: '', options: [] }
    }));
  };

  handleAddClick(id: number) {
    this.setState(previousState => ({
      ...previousState,
      menu: {
        active: true,
        current: id,
        title: `Add ${this.state.program[id].type.substring(0, 1).toUpperCase() +
          this.state.program[id].type.substr(1)}`,
        options: []
      }
    }));
  }

  generateMenu() {
    if (!this.state.menu.active) return <div />;
    return (
      <Menu title={this.state.menu.title} onClose={this.handleCloseMenu}>
        {this.generateMenuOptions()}
      </Menu>
    );
  }

  generateMenuOptions = () => {
    let options: Array<JSX.Element> = [<div key={-1} />];
    switch (this.state.program[this.state.menu.current].type) {
      case 'song':
        options.push(<Form inputs={1} labels={["search for a song #", "blehhh"]} key={0} onSubmit={(inputs: Array<any>) => console.log(inputs)} />);
    }
    for (let i = 0; i < this.state.menu.options.length; i++) {
      
    }
    return options;
  };

  generateProgram() {
    let program: Array<JSX.Element> = [<div key={-1} />];
    let index = 0;
    for (const item of this.state.program) {
      switch (item.type) {
        case 'song':
          program.push(
            <li key={index}>
              <h1 className="add">{item.title + item.songtitle}</h1>
              <PlusIcon
                onClick={() => {
                  this.handleAddClick(item.id);
                }}
              />
            </li>
          );
          break;
        case 'reading':
        case 'cover':
          program.push(
            <li key={index}>
              <h1 className="add">{item.title}</h1>
              <PlusIcon
                onClick={() => {
                  this.handleAddClick(item.id);
                }}
              />
            </li>
          );
          break;
        case 'plain':
          program.push(
            <li key={index}>
              <h1>{item.title}</h1>
            </li>
          );
      }
      index++;
    }
    return program;
  }

  render() {
    let menu = this.generateMenu();
    let program = this.generateProgram();
    return (
      <div>
        {menu}
        <Page title="Create Program" back={true}>
          <div className="program">
            <ul>{program}</ul>
          </div>
        </Page>
      </div>
    );
  }
}
