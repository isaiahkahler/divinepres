import * as React from 'react';
import { BackIcon, CloseIcon } from './icons';
import { createSelector } from 'reselect';

export function Container(props: { children?: any; className?: string }) {
  return <div className={props.className + ' container'}>{props.children}</div>;
}

interface PageProps {
  title: string;
  children?: any;
  back?: boolean;
  className?: string;
}

export function Page(props: PageProps) {
  let backButton = <div />;
  if (props.back) {
    backButton = (
      <a className="back" onClick={() => history.back()}>
        <BackIcon />
      </a>
    );
  }
  return (
    <div>
      {backButton}
      <Container className={props.className + ' animated fadeInUp page'}>
        <h1 className="title center">{props.title}</h1>
        {props.children}
      </Container>
    </div>
  );
}

interface FullButtonProps {
  label: string;
  onClick?: any;
  children?: any;
}
export function FullButton(props: FullButtonProps) {
  return (
    <div className="box full-button" onClick={props.onClick}>
      {props.children}
      <h1>{props.label}</h1>
    </div>
  );
}

interface SongMenuProps {
  onSubmit: any;
  onClose: any;
}
interface SongMenuState {
  value: string;
}
export class SongMenu extends React.Component<SongMenuProps, SongMenuState> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleChange = (event: any) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    this.props.onSubmit(this.state.value);
    event.preventDefault();
  };

  render() {
    return (
      <div className="menu animated slideInUp">
        <CloseIcon onClick={this.props.onClose} />
        <Page title="Add Song">
          <div className="search">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Search for a song"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </form>
          </div>
          {this.props.children}
        </Page>
      </div>
    );
  }
}

// interface SearchProps {
//   onSubmit?: any;
//   label: string;
//   onChange?: any;
// }
// interface SearchState {
//   value: string;
// }
// export class Search extends React.Component<SearchProps, SearchState> {
//   constructor(props: any) {
//     super(props);
//     this.state = { value: '' };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event: any) {
//     if(this.props.hasOwnProperty('onChange')){
//       this.props.onChange(event.target.value);
//     }
//     this.setState({ value: event.target.value });
//   }

//   handleSubmit(event: any) {
//     if(this.props.hasOwnProperty('onSubmit')){
//       this.props.onSubmit(this.state.value);
//     }
//     event.preventDefault();
//   }
//   render() {
//     return (
//       <div className="search">
//         <form onSubmit={this.handleSubmit}>
//           <input
//             type="text"
//             value={this.state.value}
//             onChange={this.handleChange}
//             placeholder={this.props.label}
//           />
//         </form>
//       </div>
//     );
//   }
// }

// export function Search(props: {label: string, onChange?: (e:React.ChangeEvent<any>) => void}) {
//   return(
//     <div className='search'>
//       <input type="text" placeholder={props.label} onChange={props.onChange}/>
//     </div>
//   );
// }

// interface FormProps {
//   onSubmit?: any;
//   children: Array<JSX.Element> | JSX.Element;
//   // inputs: number;
//   // labels: Array<string>;
// }
// interface FormState {
//   values: Array<string>;
// }
// export class Form extends React.Component<FormProps, FormState> {
//   constructor(props: any) {
//     super(props);
//     this.state = { values: []};

//   }

//   // componentDidMount() {

//   // }

//   handleChange = (event: any) => {
//     // this.setState({ value: event.target.value });
//   }

//   handleSubmit = (event: any) => {
//     if(this.props.hasOwnProperty('onSubmit')){
//       // this.props.onSubmit(this.state.value);
//     }
//     event.preventDefault();
//   }
//   render() {
//     const children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
//     for(const child of children){
//       child
//     }
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           {}
//         </form>
//       </div>
//     );
//   }
// }

interface MenuProps {
  title: string;
  onClose: Function;
}
interface MenuState {
  // options: Array<object>;
}
export class Menu extends React.Component<MenuProps, MenuState> {
  // constructor(props: any){
  // super(props);
  // this.setState({
  // options: []
  // });
  // }
  render() {
    return (
      <div className="menu animated slideInUp">
        <CloseIcon onClick={this.props.onClose} />
        <Page title={this.props.title}>{this.props.children}</Page>
      </div>
    );
  }
}

//##########################################

const inputsSelector = (props: FormProps) => props.inputs;

interface FormProps {
  type: string;
  inputs: number;
  labels: Array<string>;
  onSubmit?: any;
  values: Array<any>;
}
interface FormState {
  values: Array<any>;
}

/**
 * Returns form with specified elements
 * @returns values on submit
 * @example
 * type="text"
 * inputs={1}
 * labels={["search"]}
 * values={[]}
 * @example
 * type="textarea"
 * inputs={2}
 * labels={["essay", "paragraph"]}
 * values={[]}
 * @example
 * type="dropdown"
 * inputs={1}
 * labels={[]}
 * values={["1", "2", "3"]}
 */
export class Form extends React.Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = {
      values: this.props.values
    };
  }

  handleSubmit = (event: React.FormEvent) => {
    if (this.props.hasOwnProperty('onSubmit')) {
      this.props.onSubmit(this.state.values);
    }
    event.preventDefault();
  };

  handleChange(event: any, id: number, callback: any = () => {}) {
    let newValues = [...this.state.values];
    if (id !== -1) {
      newValues[id] = event.target.value;
    } else {
      newValues = [event.target.value];
      console.log('new values ' + newValues);
    }
    this.setState(
      previousState => ({
        ...previousState,
        values: newValues
      }),
      () => {
        callback();
      }
    );
    // console.log("JFSDKLFJDSKL " + newValues);
  }
  generateDropdown() {
    let options: Array<JSX.Element> = [];
    for (let i = 0; i < this.props.values.length; i++) {
      options.push(
        <option key={i} value={this.props.values[i]}>
          {this.props.values[i]}
        </option>
      );
    }
    return options;
  }

  generateInputs = createSelector([inputsSelector], inputsFromProps => {
    let inputs = [<div key={-2} />];
    if (this.props.type == 'text') {
      for (let i = 0; i < inputsFromProps; i++) {
        inputs.push(
          <input
            key={i}
            className="input"
            type="text"
            placeholder={this.props.labels[i]}
            defaultValue={this.state.values[i]}
            onChange={e => this.handleChange(e, i)}
          />
        );
      }
    } else if (this.props.type == 'textarea') {
      for (let i = 0; i < inputsFromProps; i++) {
        inputs.push(
          <textarea key={-1} value={this.state.values[i]} onChange={e => this.handleChange(e, i)} />
        );
      }
    } else if (this.props.type == 'dropdown') {
      inputs.push(
        <select
          key={0}
          onChange={e => {
            this.handleChange(e, -1);
            console.log('hhh ' + e.target.value);
          }}
        >
          {this.generateDropdown()}
        </select>
      );
    }
    if (inputsFromProps > 1 || this.props.type == 'dropdown') {
      inputs.push(<input key={-1} className="submit" type="submit" value="go" />);
    }
    return inputs;
  });

  render() {
    return <form onSubmit={this.handleSubmit}>{this.generateInputs(this.props)}</form>;
  }
}
