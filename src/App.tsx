import React, { Component } from 'react';
import { Router, Route, Switch, RouteComponentProps, Redirect } from 'react-router';
import './App.css';
import { createHashHistory } from 'history';
import { fetchHymn, fetchHymnTitle } from './hymn-fetch';
import { PlusIcon, EditIcon } from './components/icons';
import { Home, Create } from './components/pages';
import { Menu, Search, FullButton, Page, Form } from './components/building-blocks';

const history = createHashHistory();

class Slide extends React.Component {
  render() {
    return <div className="slide" />;
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
        <PlusIcon
          onClick={() => {
            props.onClick(props.id);
          }}
        />
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
  menu: { active: boolean; current: number; options: Array<string> };
}
class Program extends Component<ProgramProps, ProgramState> {
  constructor(props: ProgramProps) {
    super(props);
    // this.handleOptionClick = this.handleOptionClick.bind(this);
    this.state = {
      menu: { active: false, current: -1, options: [] },
      programData: []
    };
  }

  componentDidMount() {
    this.fetchTemplate();
  }

  async fetchTemplate() {
    const response = await fetch(this.props.template);
    let json = await response.json();
    if (json.hasOwnProperty('program')) {
      for (const item of json.program) {
        item['attended'] = false;
      }
      this.setState({ programData: json.program });
    }
  }

  handleAddClick = (id: number) => {
    //can update to set options to an empty array
    let newMenu = this.state.menu;
    newMenu.active = true;
    newMenu.current = id;
    this.setState({ menu: newMenu });
  };

  handleCloseMenu = () => {
    this.setState({ menu: { active: false, current: -1, options: [] } });
    console.log('set state close menu');
  };

  handleSubmit = (value: string, id: number) => {
    let newMenu = this.state.menu;
    let type = this.state.programData[id].type;
    newMenu.options = [];
    this.setState({
      menu: newMenu
    });
    switch (type) {
      case 'song':
        if (isNaN(parseInt(value))) {
          //handle error
        } else {
          fetchHymnTitle(parseInt(value).toString())
            .then(x => x.substr(parseInt(value).toString().length + 2))
            .then(x => {
              let newMenu = this.state.menu;
              newMenu.options.push(x);
              this.setState({
                menu: newMenu
              });
              console.log(this.state);
            });
        }
        break;
      case 'reading':
        break;
      case 'cover':
        break;
      default:
    }
  };

  handleOptionClick = (id: number) => {
    //this function is not universal for all types
    //get option name from state -d
    //get current from state -d
    //update title in programData (in state) -d
    //add lyrics in state TO DO
    let option = this.state.menu.options[id];
    let current = this.state.menu.current;
    let newProgramData = this.state.programData;
    newProgramData[current].title += option;
    // let lyrics= '';
    // fetchHymn(parseInt(value).toString()).then(x => {lyrics = x});
    this.setState({
      programData: newProgramData
    });
    this.handleCloseMenu();
  };

  renderMenu() {


    if (!this.state.menu.active) return <div />;
    const current = this.state.menu.current;
    const type = this.state.programData[this.state.menu.current].type;
    if (type == 'song') {
      return (
        <Menu title="Add Song" onClose={this.handleCloseMenu}>
          <Search
            onSubmit={(x: string) => {
              this.handleSubmit(x, current);
            }}
            label="Search For a Song #"
          />
          {this.state.menu.options.map((item, index) => (
            <FullButton
              label={item}
              key={index}
              onClick={() => {
                this.handleOptionClick(index);
              }}
            />
          ))}
        </Menu>
      );
      if (type == 'reading') {
        return (
          <Menu title="Add Reading" onClose={this.handleCloseMenu}>
            {/* <Search
             onSubmit={(x: string) => {
               this.handleSubmit(x, 'reading', current);
             }}
             label="Search For a Passage"
           /> */}
            <Form inputs={2} labels={['label 1', 'label 2', 'label 3']} />
          </Menu>
        );
      }
      if (type == 'cover') {
        return <Menu title="cover menu" onClose={this.handleCloseMenu.bind(this)} />;
      }
      return <div />;
    }
  }

  render() {
    let menu = this.renderMenu();

    return (
      <div>
        {menu}
        <Page title="Create Program" back={true}>
          <div className="program">
            <ul>
              {this.state.programData.map((item, index) => (
                <ProgramItem
                  key={index}
                  item={item}
                  onClick={this.handleAddClick.bind(this)}
                  id={index}
                />
              ))}
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
