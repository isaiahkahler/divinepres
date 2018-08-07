import React from 'react';
import { Router, Route, Switch, Redirect, RouteComponentProps } from 'react-router';
import { createHashHistory } from 'history';
import { Home } from '../pages/home/home';
import {Create} from '../pages/create/create';
import 'src/components/app.css';
import {Program} from '../pages/create/program';
import { Present } from '../pages/present/present'
import { Song, Plain, Reading, Cover } from './models';

const history = createHashHistory();

const template:Array<Song | Plain | Reading | Cover> = [
  {title: "Welcome and Announcements", type: "cover", backgroundURL: "", covertitle: "Sunday Morning Worship", subtitle: "", fontcolor: "#fff"},
  {title: "Hymn - ", type: "song", songnumber: "", songtitle: "", lyrics: "", backgroundURL: ""},
  {title: "Scripture - ", type: "reading", readingtitle: "", content: null, page: ""},
  {title: "Pastoral Prayer", type: "plain"},
  {title: "Hymn - ", type: "song", songnumber: "", songtitle: "", lyrics: "", backgroundURL: ""},
  {title: "Offertory Prayer", type: "plain"},
  {title: "Offerings Received", type: "plain"},
  {title: "Hymn - ", type: "song", songnumber: "", songtitle: "", lyrics: "", backgroundURL: ""},
  {title: "Message - ", type: "reading", readingtitle: "", content: null, page: ""},
  {title: "Hymn - ", type: "song", songnumber: "", songtitle: "", lyrics: "", backgroundURL: ""},
  {title: "Benediction", type: "plain"},
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
          <Route path ="/present" component={Present}/>
          <Redirect from="/" to="/home" />
        </Switch>
      </Router>
    );
  }
}
