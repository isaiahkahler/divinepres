import React from 'react';
import { Router, Route, Switch, Redirect, RouteComponentProps } from 'react-router';
import { createHashHistory } from 'history';
import { Home } from '../pages/home/home';
import {Create} from '../pages/create/create';
import 'src/components/app.css';
import {Program} from '../pages/create/program';

const history = createHashHistory();

const template = [
  {type: 'cover', title: 'Welcome and Announcements' },
  {type: 'song', title: 'Hymn - '},
  {type: 'reading', title: 'Scripture - ' },
  {type: 'plain', title: 'Pastoral Prayer' },
  {type: 'song', title: 'Hymn - '},
  {type: 'plain', title: 'Offertory Prayer' },
  {type: 'plain', title: 'Offerings Received' },
  {type: 'song', title: 'Hymn - '},
  {type: 'reading', title: 'Message - ' },
  {type: 'song', title: 'Hymn - '},
  { type: 'plain', title: 'Benediction' }
];


export default class App extends React.Component<{}, {}> {
  render() {
    return (
      //<div>hello world</div>
      <Router history={history}>
        <Switch>
          <Route path="/home" component={Home} />
          {/* <Route path="/create/:id" render={(e: RouteComponentProps<any>) => <Program template={e.match.params.id} />} />  */}
          <Route path="/create/:id" render={(e: RouteComponentProps<any>) => <Program template={template} />} />  //TEMPORARY!!
          <Route path="/create" component={Create} />
          <Redirect from="/" to="/home" />
        </Switch>
      </Router>
    );
  }
}
