import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Plain, Song, Reading, Cover } from '../../../components/models';
import { render } from '../../../../node_modules/@types/react-dom';

const StyledPlain = styled.div`
  padding: 0 5vw;
  & h1 {
    font-size: 8vh;
  }
`;

const StyledUL = styled.ul`
  /* margin: 0 0 0 5vw; */
  margin: 5vh;
  position: fixed;
  list-style: none;
  transition: 1s;
`;

const StyledArrow = styled.span`
  position: fixed;
  font-size: 15vh;
  font-family: 'Heebo';
`;

interface PlainProps {
  program: Array<Plain | Song | Reading | Cover>;
  event: number;
}

interface PlainState {
  event: number;
}


export class PlainSlide extends React.Component<PlainProps, PlainState> {
  constructor(props) {
    super(props);
    this.state = {event: this.props.event};
  }

  //there is probably a more efficient way to do this
  generateEvents = () => {
    return this.props.program.map((item, index) => {
      if(index === this.state.event - 1 ){
        if (item.type === 'song') {
          return (
            <li key={index} className="oldevent">
              <h1>{item.title + item.songtitle}</h1>
            </li>
          );
        } else if (item.type === 'reading') {
          return (
            <li key={index} className="oldevent">
              <h1>{item.title + item.readingtitle}</h1>
            </li>
          );
        } else {
          return (
            <li key={index} className="oldevent">
              <h1>{item.title}</h1>
            </li>
          );
        }
      }
      if (index === this.state.event) {
        if (item.type === 'song') {
          return (
            <li key={index} className="plainevent">
              <h1>{item.title + item.songtitle}</h1>
            </li>
          );
        } else if (item.type === 'reading') {
          return (
            <li key={index} className="plainevent">
              <h1>{item.title + item.readingtitle}</h1>
            </li>
          );
        } else {
          return (
            <li key={index} className="plainevent">
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
    // this.animate()
    let ul = document.querySelector('ul');
    let event = document.querySelector('.plainevent');
    let oldevent = document.querySelector('.oldevent');
    // let arrow = document.querySelector('.arrow');
    let slide = document.querySelector('.slide');
    let top =
      slide.getBoundingClientRect().height / 2 -
      event.getBoundingClientRect().top -
      event.getBoundingClientRect().height / 2 +
      'px';
      let before = parseInt(top) + event.getBoundingClientRect().height + 'px';
    ul.style.top = before;
    // (arrow as HTMLElement).style.top =
      // slide.getBoundingClientRect().height / 2 - arrow.getBoundingClientRect().height / 2 - 40 + 'px';

    // ul.style.marginLeft = arrow.getBoundingClientRect().width + 'px';

    // this.setState({stage: 1, top: top});

    setTimeout(() => {
      ul.style.top = top;
      (event as HTMLElement).style.color = "#0080ff";
      (oldevent as HTMLElement).style.color = "#fff";
    }, 1000);
  }

  animate() {
    let ul = document.querySelector('ul');
    let event = document.querySelector('.plainevent');
    let oldevent = document.querySelector('.oldevent');
    // let arrow = document.querySelector('.arrow');
    // let slide = document.querySelector('.slide');
    // let top =
    //   slide.getBoundingClientRect().height / 2 -
    //   event.getBoundingClientRect().top -
    //   event.getBoundingClientRect().height / 2 +
    //   'px';
    //   let before = parseInt(top) + event.getBoundingClientRect().height + 'px';
    // ul.style.top = before;
    // (arrow as HTMLElement).style.top =
      // slide.getBoundingClientRect().height / 2 - arrow.getBoundingClientRect().height / 2 - 40 + 'px';

    // ul.style.marginLeft = arrow.getBoundingClientRect().width + 'px';

    // this.setState({stage: 1, top: top});

    setTimeout(() => {
      ul.style.top = parseInt(ul.style.top) - event.getBoundingClientRect().height + 'px';
      (event as HTMLElement).style.color = "#0080ff";
      (oldevent as HTMLElement).style.color = "#fff";
    }, 1000);

  }

  componentDidUpdate() {
    if(this.props.event !== this.state.event){
      console.log('this wont ever run, will it?');
      console.log(this.props.event + ' ' + this.state.event);
      this.setState({event: this.props.event});
    } else {
      this.animate();
    }
  }

  render() {
    return (
      <div className="slide animated fadeIn">
        <StyledPlain>
          {/* <StyledArrow className="arrow">&raquo;</StyledArrow> */}
          <StyledUL>{this.generateEvents()}</StyledUL>
        </StyledPlain>
      </div>
    );
  }
}
