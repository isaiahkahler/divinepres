import React from 'react';
import styled from 'styled-components';
import { BackIcon } from './icons';
import { Container } from './container';

const Root = styled.div``;
const Title = styled.h1`
  font-family: 'Heebo', sans-serif;
  font-weight: 900;
  font-size: 10vh;
  text-align: center;
`;

interface PageProps {
  title: string;
  children?: any;
  back?: boolean;
  className?: string;
}

export function Page(props: PageProps) {
  return (
    <Root>
      {props.back && <BackIcon onClick={() => history.back()} />}
      <Container className={props.className + ' animated fadeInUp'}>
        <Title>{props.title}</Title>
        {props.children}
      </Container>
    </Root>
  );
}
