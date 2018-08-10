import React from 'react';
import { Plain, Song, Reading, Cover } from '../../components/models';
import { CoverSlide } from './slides/cover';
import { PlainSlide } from './slides/plain';
import { SongSlide } from './slides/song';
import { ReadingSlide } from './slides/reading';
import { eventNames } from 'cluster';

interface PresentState {
  program: Array<Plain | Song | Reading | Cover>;
  event: number;
  slideindex: number;
}
export class Present extends React.Component<{}, PresentState> {
  constructor(props) {
    super(props);
    this.state = { program: JSON.parse(localStorage.getItem('program')), event: 0, slideindex: 0 };
    document.addEventListener('keypress', event => {
      switch (event.key) {
        case 'ArrowLeft':
          this.previousSlide();
          break;
        case 'ArrowRight':
          this.nextSlide();
          break;
        case 'ArrowUp':
          this.nextEvent();
          break;
        case 'ArrowDown':
          this.previousEvent();
          break;
        default:
      }
    });
  }

  nextSlide = () => {
    if (this.state.program[this.state.event].type === 'song' || this.state.program[this.state.event].type === 'reading') {
      this.setState(previousState => ({
        ...previousState,
        slideindex: previousState.slideindex + 1
      }));
    } else {
      this.nextEvent();
    }
  };

  previousSlide = () => {
    if (this.state.program[this.state.event].type === 'song' || this.state.program[this.state.event].type === 'reading') {
      this.setState(previousState => ({
        ...previousState,
        slideindex: previousState.slideindex - 1
      }));
    } else {
      this.previousEvent();
    }

  };

  nextEvent = () => {
    if (this.state.event < this.state.program.length - 1) {
      this.setState(previousState => ({
        ...previousState,
        event: previousState.event + 1
      }));
    }
  };

  previousEvent = () => {
    if (this.state.event >= 1) {
      this.setState(previousState => ({
        ...previousState,
        event: previousState.event - 1
      }));
    }
  }

  generateSlide(eventID: number): JSX.Element {
    let event = this.state.program[eventID];
    if (event.type === 'cover') {
      return (
        <CoverSlide
          title={event.covertitle}
          subtitle={event.subtitle}
          backgroundURL={event.backgroundURL}
          fontcolor={event.fontcolor}
        />
      );
    }
    if (event.type === 'song') {
      return (
        <SongSlide
          songtitle={event.songtitle}
          lyrics={event.lyrics}
          songnumber={event.songnumber}
          backgroundURL={event.backgroundURL}
          nextSection={this.nextEvent}
          previousSection={this.previousEvent}
          slideindex={this.state.slideindex}
        />
      );
    }
    if (event.type === 'reading') {
      return (
        <ReadingSlide
          readingtitle={event.readingtitle}
          pagenumner={event.page}
          content={event.content}
          slideindex={this.state.slideindex}
          nextSection={this.nextEvent}
          previousSection={this.previousEvent}
        />
      );
    }
    if (event.type === 'plain') {
      return <PlainSlide program={this.state.program} event={eventID} />;
    }
  }

  generateNumberSlides() {
    let number = 0;
    for (let item of this.state.program) {
      if (item.type === 'song') {
      } else if (item.type === 'reading') {
      } else {
        number++;
      }
    }
  }

  render() {
    // let slide = this.generateSlide(this.state.event);
    return <div className="present">{this.generateSlide(this.state.event)}</div>;
  }
}
