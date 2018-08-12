import React from 'react';
import styled from 'styled-components';
import { Plain, Song, Reading, Cover } from '../../../components/models';
import { render } from '../../../../node_modules/@types/react-dom';

const StyledPlain = styled.div`
  padding: 0 5vw;
`;

const StyledUL = styled.ul`
  margin: 0;
  position: fixed;
  list-style: none;
`;

const StyledArrow = styled.span`
  position: fixed;
  font-size: 10vh;
  font-family: 'Heebo';
`;

interface PlainProps {
  program: Array<Plain | Song | Reading | Cover>;
  event: number;
}

interface PlainState {
  // items: Array<JSX.Element>;
}

export class PlainSlide extends React.Component<PlainProps, {}> {
  constructor(props) {
    super(props);
  }

  //there is probably a more efficient way to do this
  generateEvents = () => {
    return this.props.program.map((item, index) => {
      if (index === this.props.event) {
        if (item.type === 'song') {
          return (
            <li key={index} className="event">
              <h1>{item.title + item.songtitle}</h1>
            </li>
          );
        } else if (item.type === 'reading') {
          return (
            <li key={index} className="event">
              <h1>{item.title + item.readingtitle}</h1>
            </li>
          );
        } else {
          return (
            <li key={index} className="event">
              <h1>{item.title}</h1>
            </li>
          );
        }
      } else {
        if (item.type === 'song') {
          return (
            <li key={index}>
              <h1>{item.title + item.songtitle}</h1>
            </li>
          );
        } else if (item.type === 'reading') {
          return (
            <li key={index}>
              <h1>{item.title + item.readingtitle}</h1>
            </li>
          );
        } else {
          return (
            <li key={index}>
              <h1>{item.title}</h1>
            </li>
          );
        }
      }
    });
  };

  componentDidMount() {
    let ul = document.querySelector('ul');
    let top = document.querySelector('.slide').getBoundingClientRect().height / 2 -
    document.querySelector('.event').getBoundingClientRect().top / 2 +
    'px';
    // let smalltop = parseInt(top) - document.querySelector('.event').getBoundingClientRect().height + 'px';
    // ul.style.top = smalltop;
    ul.style.top = top;
    (document.querySelector('.arrow') as HTMLElement).style.top = top;
      
    ul.style.marginLeft = document.querySelector('.arrow').getBoundingClientRect().width + 'px';
    // ul.style.transition = '1s';
    // ul.style.top = top;
  }

  render() {
    return (
      <div className="slide">
        <StyledPlain>
          <StyledArrow className="arrow">&raquo;</StyledArrow>
          <StyledUL>{this.generateEvents()}</StyledUL>
        </StyledPlain>
      </div>
    );
  }
}
