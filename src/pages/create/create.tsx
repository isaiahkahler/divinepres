import React from 'react';
import { Page } from '../../components/page';
import { FullButton } from '../../components/fullbutton';
import { NavLink } from 'react-router-dom';

export class Create extends React.Component<{}, {}> {
  render() {
    return (
      <Page title="Pick a Template" back={true}>
        <NavLink to="/create/TMBC">
          <FullButton label="TMBC" />
        </NavLink>
        <NavLink to="/create/blank">
          <FullButton label="Blank" />
        </NavLink>
      </Page>
    );
  }
}
