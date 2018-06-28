import React, { Component } from 'react';
import { Router, Route, Switch, RouteComponentProps, Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import './App.css';
import { createHashHistory } from 'history';
import { fetchHymn } from './hymn-fetch';

const history = createHashHistory();

class Slide extends React.Component {
  render() {
    return <div className="slide" />;
  }
}

interface FullButtonProps {
  label: string;
  onClick?: any;
  children?: any;
}
function FullButton(props: FullButtonProps) {
  return (
    <div className="box full-button" onClick={props.onClick}>
      {props.children}
      <h1>{props.label}</h1>
    </div>
  );
}

function PlusIcon(props: {onClick?: any}) {
  return (
    <svg className="icon" x="0px" y="0px" viewBox="0 0 100 100" onClick={props.onClick}>
      <rect x="0" y="0" width="100" height="100" />
      <rect x="5" y="5" width="90" height="90" fill="#fff" />
      <rect x="45" y="10" width="10" height="80" />
      <rect x="10" y="45" width="80" height="10" />
    </svg>
  );
}

function BackIcon(props: {onClick?: any}) {
  return (
    <svg className="icon" width="100" height="100" viewBox="0 0 100 100" onClick={props.onClick}>
      <rect x="0" y="0" width="100" height="100" />
      <rect x="5" y="5" width="90" height="90" fill="#fff" />
      <polygon points="10,50 50,10 57,17 23,50 57,83 50,90" />
      <rect x="15" y="45" height="10" width="75" />
    </svg>
  );
}

function CloseIcon(props: {onClick?: any}) {
  return (
    <svg className="icon" width="100" height="100" viewBox="0 0 100 100" onClick={props.onClick}>
      <rect x="0" y="0" width="100" height="100" />
      <rect x="5" y="5" width="90" height="90" fill="#fff" />
      <polygon points="10,15 15,10 90,85 85,90" />
      <polygon points="90,15 85,10 10,85 15,90" />
    </svg>
  );
}

function Container(props: { children?: any; className?: string }) {
  return <div className={props.className + ' container'}>{props.children}</div>;
}

interface PageProps {
  title: string;
  children?: any;
  back?: boolean;
  className?: string;
}
interface PageState {}

class Page extends React.Component<PageProps, PageState> {
  render() {
    let backButton: any = null;
    if (this.props.back) {
      backButton = (
        <a className="back" onClick={() => history.goBack()}>
          <BackIcon />
        </a>
      );
    }
    return (
      <div>
        {backButton}
        <Container className={this.props.className + ' animated fadeInUp page'}>
          <h1 className="title center">{this.props.title}</h1>
          {this.props.children}
        </Container>
      </div>
    );
  }
}

function Home(props: any) {
  //ugh will probably have to convert to class to pull past pres. from storage
  return (
    <Page title="DivinePres">
      <NavLink activeClassName="active-link" to="/create">
        <FullButton label="Create New Presentation">
          <PlusIcon />
        </FullButton>
      </NavLink>
    </Page>
  );
}

function Create(props: any) {
  return (
    <Page title="Pick a template" back={true}>
      <NavLink to="/create/TMBC">
        <FullButton label="TMBC" />
      </NavLink>
      <FullButton label="Blank" />
    </Page>
  );
}

interface MenuProps {
  title: string;
  onClose: Function;
}
interface MenuState {}
class Menu extends Component<MenuProps, MenuState> {
  render() {
    return (
      <div className="menu animated slideInUp">
        <Page title={this.props.title}>
        <CloseIcon onClick={this.props.onClose}/>{this.props.children}</Page>
      </div>
    );
  }
}

interface ProgramItemProps {
  item: any;
  onClick: any; //change
  id: number;
}
function ProgramItem(props: ProgramItemProps) {
  if (props.item.type === 'plain') {
    return (
      <li>
        <h1>{props.item.title}</h1>
      </li>
    );
  }

  if (props.item.type !== 'plain') {
    return (
      <li>
        <h1 className="add">{props.item.title}</h1>
        <PlusIcon onClick={() => {props.onClick(props.id)}}/>
      </li>
    );
  }

  throw new Error('invalid template');
}

interface ProgramProps {
  template: string;
}
interface ProgramState {
  programData: Array<any>;
  menu: {active: boolean, current: number};
}
class Program extends Component<ProgramProps, ProgramState> {
  constructor(props: ProgramProps) {
    super(props);
    this.state = {
      menu: {active: false, current: -1},
      programData: []
    };
  }
  async fetchTemplate() {
    const response = await fetch(this.props.template);
    let json = await response.json();
    if (json.hasOwnProperty('program')) {
      for(const item of json.program){
        item["attended"] = false;
      }
      console.log(json.program);
      this.setState({ programData: json.program });
    }
  }

  handleAddClick = (id: number) => {
    this.setState({menu: {active: true, current: id}});
  }

  componentDidMount() {
    this.fetchTemplate();
  }

  handleCloseMenu(){
    this.setState({menu: {active: false, current: -1}});
    console.log('set state close menu');
  }

  render() {
    let menu: JSX.Element = <div />;
    if(this.state.menu.active){
      switch(this.state.programData[this.state.menu.current].type){
        case "song": menu = <Menu title="song menu" onClose={this.handleCloseMenu.bind(this)} />;
        break;
        case "cover": menu = <Menu title="cover menu" onClose={this.handleCloseMenu.bind(this)}  />
        break;
        case "reading": menu = <Menu title="reading menu" onClose={this.handleCloseMenu.bind(this)}  />
        break;
        default: throw new Error("Program State stored incorrectly.");
      }
    }

    return (
      <div>
        {menu}
        <Page title="Create Program" back={true}>
          <div className="program">
            <ul>
              {this.state.programData.map((item, index) => <ProgramItem key={index} item={item} onClick={this.handleAddClick.bind(this)} id={index}/>)}
            </ul>
          </div>
        </Page>
      </div>
    );
  }
}

interface AppProps {}
interface AppState {
  hymnInput: string;
  hymnText: string;
}
class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      hymnInput: '',
      hymnText: ''
    };
  }

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hymnNumber = this.state.hymnInput;
    const hymnText = await fetchHymn(hymnNumber);

    this.setState(previousState => ({
      ...previousState,
      hymnText
    }));
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    this.setState(previousState => ({
      ...previousState,
      hymnInput: value
    }));
  };

  public render() {
    return (
      <Router history={history}>
        <div>
          <div>
            {/* <form onSubmit={this.handleSubmit}>
              <input type="text" onChange={this.handleChange} />
            </form>
            <pre>{this.state.hymnText}</pre> */}
          </div>
          <div className="body">
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/create/TMBC" render={() => <Program template="tmbc-template.json" />} />
              <Route path="/create" component={Create} />
              <Redirect from="/" to="/home" />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
