import React from 'react';
import { Page } from '../../components/page';
import { FullButton } from '../../components/fullbutton';
import { PlusIcon } from '../../components/icons';
import { NavLink } from 'react-router-dom';

export class Home extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);
    this.state = {stored: ''};
  }
  grabStored() {
    let data: string | undefined = window.localStorage.getItem('date');
    console.log(data);
    return data && <NavLink to="/present"><FullButton label={data + " - Last Presentation"} /></NavLink>;
  }

  render() {
    return (
      <Page title="DivinePres">
        <NavLink activeClassName="active-link" to="/create">
          <FullButton label="Create New Presentation">
            <PlusIcon />
          </FullButton>
        </NavLink>
        {this.grabStored()}
      </Page>
    );
  }
}
