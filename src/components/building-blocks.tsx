import * as React from 'react';
import { BackIcon, CloseIcon } from './icons';


export function Container(props: { children?: any; className?: string }) {
  return <div className={props.className + ' container'}>{props.children}</div>;
}

interface PageProps {
  title: string;
  children?: any;
  back?: boolean;
  className?: string;
}

export function Page (props: PageProps) {
    let backButton: any = null;
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

interface SearchProps {
  onSubmit?: any;
  label: string;
  onChange?: any;
}
interface SearchState {
  value: string;
}
export class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: any) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    if(this.props.hasOwnProperty('onChange')){
      this.props.onChange(event.target.value);
    }
    this.setState({ value: event.target.value });
  }

  handleSubmit(event: any) {
    if(this.props.hasOwnProperty('onSubmit')){
      this.props.onSubmit(this.state.value);
    }
    event.preventDefault();
  }
  render() {
    return (
      <div className="search">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder={this.props.label}
          />
        </form>
      </div>
    );
  }
}

interface FormProps {
  onSubmit?: any;
  inputs: number;
  labels: Array<string>;
}
interface FormState {
  values: Array<string>;
}
export class Form extends React.Component<FormProps, FormState> {
  constructor(props: any) {
    super(props);
    this.state = { values: []};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    
  }

  generateInputs(){
    let inputs:JSX.Element;
    // this.props.inputs.map((item, index) => {
      
    // });
  }

  handleChange(event: any) {
    // this.setState({ value: event.target.value });
  }

  handleSubmit(event: any) {
    if(this.props.hasOwnProperty('onSubmit')){
      // this.props.onSubmit(this.state.value);
    }
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Search label={this.props.labels[0]} onChange={() => {}}/>
          <Search label={this.props.labels[1]} onChange={() => {}}/>
          <Search label={this.props.labels[2]} onChange={() => {}}/>
        </form>
      </div>
    );
  }
}



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
