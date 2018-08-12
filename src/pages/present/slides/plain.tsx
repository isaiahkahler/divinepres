import React from 'react';
import styled from 'styled-components';
import { Plain, Song, Reading, Cover } from '../../../components/models';
import { render } from '../../../../node_modules/@types/react-dom';

const StyledPlain = styled.div`
  padding: 0 5vw;
`;

const StyledUL = styled.ul`
  margin: 0 0 0 5vw;
  position: fixed;
  list-style: none;
  transition: 1s;
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
    let event = document.querySelector('.event');
    let arrow = document.querySelector('.arrow');
    let slide = document.querySelector('.slide');
    let top =
      slide.getBoundingClientRect().height / 2 -
      event.getBoundingClientRect().top -
      event.getBoundingClientRect().height / 2 +
      'px';
      let before = parseInt(top) + event.getBoundingClientRect().height + 'px';
    ul.style.top = before;
    (arrow as HTMLElement).style.top =
      slide.getBoundingClientRect().height / 2 - arrow.getBoundingClientRect().height / 2 + 'px';

    // ul.style.marginLeft = arrow.getBoundingClientRect().width + 'px';

    // this.setState({stage: 1, top: top});

    setTimeout(() => {
      ul.style.top = top;
    }, 1000);
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
