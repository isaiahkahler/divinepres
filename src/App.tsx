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

function PlusIcon() {
  return (
    <svg className="icon" x="0px" y="0px" viewBox="0 0 100 100">
      <rect x="0" y="0" width="100" height="100" />
      <rect x="5" y="5" width="90" height="90" fill="#fff" />
      <rect x="45" y="10" width="10" height="80" />
      <rect x="10" y="45" width="80" height="10" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg className="icon" width="100" height="100" viewBox="0 0 100 100">
      <rect x="0" y="0" width="100" height="100" />
      <rect x="5" y="5" width="90" height="90" fill="#fff" />
      <polygon points="10,50 50,10 57,17 23,50 57,83 50,90" />
      <rect x="15" y="45" height="10" width="75" />
      {/* <path d="M40 22h-24.34l11.17-11.17-2.83-2.83-16 16 16 16 2.83-2.83-11.17-11.17h24.34v-4z"/> */}
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
        <Container className={this.props.className + 'animate fadeInUp page'}>
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

interface ProgramItemProps {
  item: any;
}
function ProgramItem({ item }: ProgramItemProps) {
  if (typeof item === 'string') {
    return (
      <li>
        <h1>{item}</h1>
      </li>
    );
  }

  if (typeof item === 'object') {
    return (
      <li>
        <h1 className="add">{item.name}</h1>
        <PlusIcon />
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
  program: JSX.Element;
}
class Program extends Component<ProgramProps, ProgramState> {
  constructor(props: ProgramProps) {
    super(props);
    this.state = {
      program: <div />,
      programData: []
    };
  }
  async fetchTemplate() {
    const response = await fetch(this.props.template);
    const json = await response.json();
    if (json.program) {
      this.setState({ programData: json.program });
    }
  }

  componentDidMount() {
    this.fetchTemplate();
  }
  render() {
    return (
      <Page title="Create Program" back={true}>
        {/* <FullButton label="(temp) fetch data" onClick={this.fetchTemplate.bind(this)}></FullButton> */}
        <div className="program">
          <ul>
            {this.state.programData.map((item, index) => <ProgramItem key={index} item={item} />)}
          </ul>
        </div>
        {/* <div className="program">
          <ul>
            <li><h1>Welcome and Announcements</h1></li>
            <li><h1 className='add'>Hymn - Placeholder</h1><PlusIcon /></li>
            <li><h1>Prayer</h1></li>
          </ul>
        </div> */}
      </Page>
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
            <form onSubmit={this.handleSubmit}>
              <input type="text" onChange={this.handleChange} />
            </form>
            <pre>{this.state.hymnText}</pre>
          </div>
          <div className="body">
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/create/TMBC" render={() => <Program template="tmbc-template.json" />} />
              <Route path="/create" component={Create} />
              {/* <Route path="/jkl" render={() => <FullButton label="rico is a butt" />} /> */}
              <Redirect from="/" to="/home" />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
