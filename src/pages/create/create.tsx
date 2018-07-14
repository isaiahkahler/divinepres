import React from 'react';
import { Page } from 'src/components/page';
import { FullButton } from 'src/components/fullbutton';
import { NavLink } from 'react-router-dom';

export class Create extends React.Component<{}, {}> {
  render() {
    return (
      <Page title="Pick a Template" back={true}>
        <NavLink to="/create/TMBC">
          <FullButton label="TMBC" />
        </NavLink>
        <FullButton label="Blank" />
      </Page>
    );
  }
}
