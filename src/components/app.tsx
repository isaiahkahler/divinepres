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

export const tmbctemplate:Array<Song | Plain | Reading | Cover> = [
  {title: "Welcome and Announcements", type: "cover", backgroundURL: "../media/cover.jpg", covertitle: "Sunday Morning Worship", subtitle: "", fontcolor: "#fff"},
  {title: "Hymn - ", type: "song", songnumber: "", songtitle: "", lyrics: "", backgroundURL: "../media/song1.jpg"},
  {title: "Scripture - ", type: "reading", readingtitle: "", content: null, page: ""},
  {title: "Pastoral Prayer", type: "plain"},
  {title: "Hymn - ", type: "song", songnumber: "", songtitle: "", lyrics: "", backgroundURL: "../media/song2.jpg"},
  {title: "Offertory Prayer", type: "plain"},
  {title: "Offerings Received", type: "plain"},
  {title: "Hymn - ", type: "song", songnumber: "", songtitle: "", lyrics: "", backgroundURL: "../media/song3.jpg"},
  {title: "Message - ", type: "reading", readingtitle: "", content: null, page: ""},
  {title: "Hymn - ", type: "song", songnumber: "", songtitle: "", lyrics: "", backgroundURL: "../media/song4.jpg"},
  {title: "Benediction", type: "plain"},
];


export default class App extends React.Component<{}, {}> {
  render() {
    return (
      //<div>hello world</div>
      <Router history={history}>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/create/:id" render={(e: RouteComponentProps<any>) => {
            let temp = [];
            if(e.match.params.id === "TMBC"){
              temp = tmbctemplate;
            } else if (e.match.params.id === "blank") {
            } else if(e.match.params.id === "last") {
              temp = JSON.parse(window.localStorage.getItem("program"));
            }
            return <Program template={temp} />
            }} /> 
          {/* <Route path="/create/:id" render={(e: RouteComponentProps<any>) => <Program template={template} />} />  //TEMPORARY!! */}
          <Route path="/create" component={Create} />
          <Route path ="/present" component={Present}/>
          <Redirect from="/" to="/home" />
        </Switch>
      </Router>
    );
  }
}
