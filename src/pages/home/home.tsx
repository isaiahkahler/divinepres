import React from 'react';
import { Page } from 'src/components/page';
import { FullButton } from 'src/components/fullbutton';
import { PlusIcon } from 'src/components/icons';
import { NavLink } from 'react-router-dom';

interface HomeState {
  stored: Array<any>;
}
export class Home extends React.Component<{}, HomeState> {
  constructor(props: any) {
    super(props);
    this.state = {stored: []};
  }
  grabStored() {
    let data: any = window.localStorage.getItem('presentations');
    if (data !== null) {
      let presentations: Array<any> = [];
      if (data instanceof Array) {
        presentations = data;
      }
      this.setState({
        stored: presentations
        //needs to be stored in format
        //[
        // {"title": "the title", "program": [...]}
        //]
      });
    }
  }

  render() {
    return (
      <Page title="DivinePres">
        <NavLink activeClassName="active-link" to="/create">
          <FullButton label="Create New Presentation">
            <PlusIcon />
          </FullButton>
        </NavLink>
        {this.state.stored.map((item, index) => <FullButton label={item.title} />)}
      </Page>
    );
  }
}
