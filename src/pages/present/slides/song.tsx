import React from 'react';
import styled from 'styled-components';

const StyledSong = styled.div`
  margin: 0 5vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

interface SongSlideProps {
  songtitle: string;
  lyrics: string;
  songnumber: string;
  backgroundURL: string;
  nextSection: Function;
  previousSection: Function;
  slideindex: number;
}
interface SongSlideState {
  slideindex: number;
  slideprogress: number;
  slidetotal: number;
  lyricblocks: Array<string>;
}

export class SongSlide extends React.Component<SongSlideProps, SongSlideState> {
  constructor(props) {
    super(props);
    let blocks = this.props.lyrics.split('\n\n'); //split lyrics into array of blocks per two enters
    blocks.unshift(`${this.props.songtitle}\nHymn #${this.props.songnumber}`); //add title and song # as first item
    let total = blocks.length;

    this.state = {
      slideindex: this.props.slideindex,
      slideprogress: 0,
      slidetotal: total,
      lyricblocks: blocks
    };
  }

  componentDidUpdate() {
    if (this.state.slideindex < this.props.slideindex) {
      if (this.state.slideprogress + 1 === this.state.slidetotal) {
        this.props.nextSection();
      } else {
        this.setState(previousState => ({
          ...previousState,
          slideindex: previousState.slideindex + 1,
          slideprogress: previousState.slideprogress + 1
        }));
      }
    }
    if (this.state.slideindex > this.props.slideindex) {
      if (this.state.slideprogress === 0) {
        this.props.previousSection();
      } else {
        this.setState(previousState => ({
          ...previousState,
          slideindex: previousState.slideindex - 1,
          slideprogress: previousState.slideprogress - 1
        }));
      }
    }
  }

  generateLyrics() {
    let innerHTML = this.state.lyricblocks[this.state.slideprogress].replace(/(?:\r\n|\r|\n)/g, '<br />');
    return { __html: innerHTML };
  }

  generateTitle() {
    if(this.state.slideprogress !== 0){
        return this.props.songtitle;
    }
  }

  render() {
    return (
        <div className="slide">
      <StyledSong className="song">
        <h1 className="title">{this.generateTitle()}</h1>
        <h1 className="lyrics" dangerouslySetInnerHTML={this.generateLyrics()} />
      </StyledSong>
        </div>
    );
  }
}
