import * as React from 'react';
import { PlusIcon } from './icons';
import { Page, FullButton, Menu, Form } from './building-blocks';
import { fetchHymn, fetchHymnTitle } from './hymn-fetch';
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

  //closes menu
  handleCloseMenu = () => {
    this.setState(previousState => ({
      ...previousState,
      menu: { active: false, current: -1, title: '', options: [] }
    }));
  };

  //opens menu
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

  //renders menu
  generateMenu() {
    if (!this.state.menu.active) return <div />;
    return (
      <Menu title={this.state.menu.title} onClose={this.handleCloseMenu}>
        {/* {this.generateMenuOptions()} */}
        <Form inputs={1} labels={[]} type="dropdown" values={["yig", "yeet", "yote"]} onSubmit={(e:any) => console.log(e)}/>
      </Menu>
    );
  }

  //renders menu options
  generateMenuOptions = () => {
    let options: Array<JSX.Element> = [<div key={-1} />];
    let index = 0;
    for (const item of this.state.menu.options) {
      switch (item.type) {
        case 'search':
          options.push(
            <Form
              values={item.content}
              type="text"
              inputs={1}
              labels={item.display}
              key={index}
              onSubmit={(inputs: Array<any>) => this.handleSubmit(inputs)}
            />
          );
          break;
        case 'button':
          options.push(
            <FullButton
              key={index}
              label={item.display}
              onClick={() => this.handleOptionClick(index)}
            />
          );
          break;
      }
      index++;
    }
    return options;
    // switch (this.state.program[this.state.menu.current].type) {
    //   case 'song':
    //     options.push(
    //       <Form
    //         values={[]}
    //         type='text'
    //         inputs={1}
    //         labels={['search for a song #']}
    //         key={0}
    //         onSubmit={(inputs: Array<any>) => this.handleSubmit(inputs)}
    //       />
    //     );
    //     break;
    //   case 'reading':
    //     options.push(
    //       <Form
    //       values={[]}
    //         type="text"
    //         inputs={2}
    //         labels={['book name', 'chapter(s) and verse(s)']}
    //         key={0}
    //         onSubmit={(inputs: Array<any>) => this.handleSubmit(inputs)}
    //       />
    //     );
    //     break;
    //   case 'cover':
    //     break;
    // }
    // for (let i = 0; i < this.state.menu.options.length; i++) {
    //   switch (this.state.menu.options[i].type) {
    //     case 'button':
    //       options.push(
    //         <FullButton
    //           key={options.length}
    //           label={this.state.menu.options[i].display}
    //           onClick={() => this.handleOptionClick(this.state.menu.options.length - 1)}
    //         />
    //       );
    //       break;
    //   }
    // }
  };

  //when option is clicked
  handleOptionClick = async (id: number) => {
    switch (this.state.program[this.state.menu.current].type) {
      case 'song':
        const lyrics = await fetchHymn(this.state.menu.options[id].content);
        this.setState(previousState => {
          const current = previousState.menu.current;
          const program = previousState.program;
          return {
            ...previousState,
            program: [
              ...program.slice(0, current),
              { ...program[current], lyrics, songtitle: this.state.menu.options[id].display },
              ...program.slice(current + 1, program.length)
            ]
          };
        });
        this.handleCloseMenu();
        console.log(this.state);
        break;
    }
  };

  //when search is sumbitted
  handleSubmit(inputs: Array<any>) {
    switch (this.state.program[this.state.menu.current].type) {
      case 'song':
        let input = parseInt(inputs[0]);
        if (isNaN(input)) {
          //handle error
        } else {
          fetchHymnTitle(input.toString())
            .then(x => x.substr(input.toString().length + 2))
            .then(x => {
              let previousState = { ...this.state };
              previousState.menu.options.push({
                type: 'button',
                display: x,
                content: inputs[0]
              });
              this.setState(previousState);
            });
        }
        console.log(this.state);
        break;
      case 'reading':
        console.log(inputs);
        break;
    }
  }

  //renders program
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
