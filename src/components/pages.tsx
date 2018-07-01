import * as React from 'react';
import { FullButton, Page } from "./building-blocks";
import { NavLink } from 'react-router-dom';
import {PlusIcon} from './icons';

export function Home(props: any) {
  //ugh will probably have to convert to class to pull past pres. from storage
  return (
    <Page title="DivinePres">
      <NavLink activeClassName="active-link" to="/create">
        <FullButton label="Create New Presentation">
          <PlusIcon />
        </FullButton>
      </NavLink>
    </Page>
  );
}

export function Create(props: any) {
  return (
    <Page title="Pick a template" back={true}>
      <NavLink to="/create/TMBC">
        <FullButton label="TMBC" />
      </NavLink>
      <FullButton label="Blank" />
    </Page>
  );
}
