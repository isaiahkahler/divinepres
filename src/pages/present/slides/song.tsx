import React from 'react';
import styled from 'styled-components';

const StyledSong = styled.div`
  margin: 0 5vw;
  padding: 5vw 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledFixedLayer = styled.div`
  position: fixed;
  width: 100%;
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
    let slides = document.getElementsByClassName('slide');
    console.log(this.state.slideprogress)

    if (this.state.slideindex < this.props.slideindex) {
      if (this.state.slideprogress + 1 === this.state.slidetotal) {
        this.props.nextSection();
      } else {
        this.setState(previousState => ({
          ...previousState,
          slideindex: previousState.slideindex + 1,
          slideprogress: previousState.slideprogress + 1
        }));

        //ACTUAL SLIDE CHANGE
        (slides[this.state.slideprogress] as HTMLElement).style.opacity = '0';
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
        //ACTUAL SLIDE CHANGE
        (slides[this.state.slideprogress - 1] as HTMLElement).style.opacity = '100';
      }
    }
  }

  //unused
  generateLyrics() {
    let innerHTML = this.state.lyricblocks[this.state.slideprogress].replace(
      /(?:\r\n|\r|\n)/g,
      '<br />'
    );
    return { __html: innerHTML };
  }

  //unused
  generateTitle() {
    if (this.state.slideprogress !== 0) {
      return this.props.songtitle;
    }
  }

  componentDidMount() {
    let slides = document.getElementsByClassName('slide');
    for (let i = 0; i < slides.length; i++) {
      (slides[i] as HTMLElement).style.transition = '0.5s';
    }
    if (!!this.props.backgroundURL) {
      let els = document.querySelectorAll('.slide');
      for (let i = 0; i < els.length; i++) {
        (els[i] as HTMLElement).style.backgroundImage = `url('${this.props.backgroundURL}')`;
      }
    }
  }

  componentWillUnmount() {
    let slides = document.getElementsByClassName('slide');
    for (let i = 0; i < slides.length; i++) {
      (slides[i] as HTMLElement).style.transition = 'none';
    }
    if (!!this.props.backgroundURL) {
      let els = document.querySelectorAll('.slide');
      for (let i = 0; i < els.length; i++) {
        (els[i] as HTMLElement).style.backgroundImage = '';
      }
    }
  }

  generateSongSlide() {
    let index = 0;
    let zindex = 100;
    let slides: Array<JSX.Element> = [];
    for (let item of this.state.lyricblocks) {
      slides.push(
        <StyledFixedLayer style={{ zIndex: zindex }} key={index}>
          <div className="slide">
            <StyledSong className="song">
              <h1 className="title">{index !== 0 ? this.props.songtitle : ''}</h1>
              <h1
                className="lyrics"
                dangerouslySetInnerHTML={{
                  __html: this.state.lyricblocks[index].replace(/(?:\r\n|\r|\n)/g, '<br />')
                }}
              />
            </StyledSong>
          </div>
        </StyledFixedLayer>
      );
      index++;
      zindex--;
    }

    return slides;
  }

  render() {
    return this.generateSongSlide();
    //   <div className="slide">
    //   {/* {this.generateSongSlide()} */}
    // <StyledSong className="song">
    //   <h1 className="title">{this.generateTitle()}</h1>
    //   <h1 className="lyrics" dangerouslySetInnerHTML={this.generateLyrics()} />
    // </StyledSong>
    //   </div>
  }
}
