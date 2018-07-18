import React from 'react';
import { Router, Route, Switch, Redirect, RouteComponentProps } from 'react-router';
import { createHashHistory } from 'history';
import { Home } from '../pages/home/home';
import {Create} from '../pages/create/create';
import 'src/components/app.css';
import {Program} from '../pages/create/program';
import { Song, Plain, Reading, Cover } from 'src/components/models';

const history = createHashHistory();

const template:Array<Song | Plain | Reading | Cover> = [
  {title: "Welcome and Announcements", icon: "add", type: "cover", backgroundURL: "", covertitle: "", subtitle: ""},
  {title: "Hymn -", icon: "add", type: "song", songnumber: "", songtitle: "", lyrics: "", backgroundURL: ""},
  {title: "Scripture - ", icon: "add", type: "reading", readingtitle: "", content: null, page: ""},
  {title: "Pastoral Prayer", icon: "none", type: "plain"},
  {title: "Hymn -", icon: "add", type: "song", songnumber: "", songtitle: "", lyrics: "", backgroundURL: ""},
  {title: "Offertory Prayer", icon: "none", type: "plain"},
  {title: "Offerings Received", icon: "none", type: "plain"},
  {title: "Hymn -", icon: "add", type: "song", songnumber: "", songtitle: "", lyrics: "", backgroundURL: ""},
  {title: "Message - ", icon: "add", type: "reading", readingtitle: "", content: null, page: ""},
  {title: "Hymn -", icon: "add", type: "song", songnumber: "", songtitle: "", lyrics: "", backgroundURL: ""},
  {title: "Benediction", icon: "none", type: "plain"},
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
