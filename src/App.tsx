import React, { Component } from 'react';
import { Router, Route, Switch, RouteComponentProps, Redirect } from 'react-router';
import './App.css';
import { createHashHistory } from 'history';
import { fetchHymn, fetchHymnTitle } from './hymn-fetch';
import { PlusIcon, EditIcon } from './components/icons';
import { Home, Create } from './components/pages';
import { FullButton, Page, SongMenu } from './components/building-blocks';
import { Program } from './components/program';
import { parse } from 'querystring';

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

  if (props.item.type == 'song') {
    return (
      <li>
        <h1 className="add">{props.item.title + props.item.songtitle}</h1>
        <PlusIcon
          onClick={() => {
            props.onClick(props.id);
          }}
        />
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

// interface ProgramProps {
//   template: string;
// }
// interface ProgramState {
//   programData: Array<any>;
//   menu: { active: boolean; current: number; options: Array<{ label: string; id: number }> };
//   //but not all options need an id? ;-;
// }
// class Program extends Component<ProgramProps, ProgramState> {
//   constructor(props: ProgramProps) {
//     super(props);
//     // this.handleOptionClick = this.handleOptionClick.bind(this);
//     this.state = {
//       menu: { active: false, current: -1, options: [] },
//       programData: []
//     };
//   }

//   componentDidMount() {
//     this.fetchTemplate();
//   }

//   async fetchTemplate() {
//     const response = await fetch(this.props.template);
//     let json = await response.json();
//     if (json.hasOwnProperty('program')) {
//       for (const item of json.program) {
//         item['attended'] = false;
//       }
//       this.setState({ programData: json.program });
//     }
//   }

//   handleAddClick = (id: number) => {
//     //can update to set options to an empty array
//     let newMenu = this.state.menu;
//     newMenu.active = true;
//     newMenu.current = id;
//     this.setState({ menu: newMenu });
//   };

//   handleCloseMenu = () => {
//     this.setState({ menu: { active: false, current: -1, options: [] } });
//   };

//   handleSubmit = (value: string, id: number) => {
//     if (isNaN(parseInt(value))) {
//       //handle error
//     } else {
//       fetchHymnTitle(parseInt(value).toString())
//         .then(x => x.substr(parseInt(value).toString().length + 2))
//         .then(x => {
//           this.setState({
//             menu: Object.assign({}, this.state.menu, {
//               options: [{ label: x, id: parseInt(value) }]
//             })
//           });
//         });
//     }
//   };

//   handleSongOptionClick = async (id: number) => {
//     const option = this.state.menu.options[id];
//     const lyrics = await fetchHymn(option.id.toString());
//     this.setState(previousState => {
//       const current = previousState.menu.current;
//       const programData = previousState.programData;
//       return {
//         ...previousState,
//         programData: [
//           ...programData.slice(0, current),
//           { ...programData[current], lyrics, songtitle: option.label },
//           ...programData.slice(current + 1, programData.length)
//         ]
//       };
//     });
//     this.handleCloseMenu();
//   };

//   renderMenu() {
//     if (!this.state.menu.active) return <div />;
//     const current = this.state.menu.current;
//     const type = this.state.programData[this.state.menu.current].type;
//     if (type == 'song') {
//       return (
//         <SongMenu onClose={this.handleCloseMenu} onSubmit={this.handleSubmit}>
//           {this.state.menu.options.map((item, index) => (
//             <FullButton
//               label={item.label}
//               key={index}
//               onClick={() => {
//                 this.handleSongOptionClick(index);
//               }}
//             />
//           ))}
//         </SongMenu>
//       );
//     }
//     if (type == 'reading') {
//       return (
//         // <Menu title="Add Reading" onClose={this.handleCloseMenu}>
//         //   <Form onSubmit={() => {}}>
//         //      <Search label='Chapter' />
//         //      <Search label='Chapter' />
//         //      <Search label='Chapter'/>

//         //   </Form>
//         // </Menu>
//         <div />
//       );
//     }
//     if (type == 'cover') {
//       return; //<Menu title="cover menu" onClose={this.handleCloseMenu.bind(this)} />;
//     }
//     return <div />;
//   }

//   render() {
//     let menu = this.renderMenu();

//     return (
//       <div>
//         {menu}
//         <Page title="Create Program" back={true}>
//           <div className="program">
//             <ul>
//               {this.state.programData.map((item, index) => (
//                 <ProgramItem
//                   key={index}
//                   item={item}
//                   onClick={this.handleAddClick.bind(this)}
//                   id={index}
//                 />
//               ))}
//             </ul>
//           </div>
//         </Page>
//       </div>
//     );
//   }
// }

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

  // handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.currentTarget.value;
  //   this.setState(previousState => ({
  //     ...previousState,
  //     hymnInput: value
  //   }));
  // };

  public render() {
    //TEMP #######################################################
    const template = [
      { id: 0, type: 'cover', title: 'Welcome and Announcements' },
      { id: 1, type: 'song', title: 'Hymn - ', songtitle: '' },
      { id: 2, type: 'reading', title: 'Scripture - ' },
      { id: 3, type: 'plain', title: 'Pastoral Prayer' },
      { id: 4, type: 'song', title: 'Hymn - ', songtitle: '' },
      { id: 5, type: 'plain', title: 'Offertory Prayer' },
      { id: 6, type: 'plain', title: 'Offerings Received' },
      { id: 7, type: 'song', title: 'Hymn - ', songtitle: '' },
      { id: 8, type: 'reading', title: 'Message - ' },
      { id: 9, type: 'song', title: 'Hymn - ', songtitle: '' },
      { id: 10, type: 'plain', title: 'Benediction' }
    ];

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
              <Route path="/create/TMBC" render={() => <Program template={template} />} />
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
