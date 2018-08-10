import React from 'react';
import styled from 'styled-components';

const StyledReading = styled.div`
  margin: 0 5vw;
`;
const StyledContent = styled.div`
  overflow: auto;
`;

interface ReadingSlideProps {
  readingtitle: string;
  pagenumner: string;
  content: any;
  slideindex: number;
  nextSection: Function;
  previousSection: Function;
}

interface ReadingSlideState {
  slideindex: number;
  slideprogress: number;
  slidetotal: number;
}

export class ReadingSlide extends React.Component<ReadingSlideProps, ReadingSlideState> {
  constructor(props) {
    super(props);
    let dummyEl = document.createElement('div');
    dummyEl.innerHTML = this.props.content;
    let total = dummyEl.getElementsByClassName('text').length + 3;
    this.state = {
      slideindex: this.props.slideindex,
      slideprogress: 0,
      slidetotal: total
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

  componentDidMount() {
      console.log('mount')
    document.getElementById('contentparent').innerHTML = this.props.content;
    document.getElementById('contentparent').querySelector('.passage-display').outerHTML = '';
    document.getElementById('contentparent').style.height =
      document.querySelector('.present').getBoundingClientRect().height -
      document.querySelector('#readingtitle').getBoundingClientRect().height +
      'px';
  }

  render() {
    return (
      <div className="slide">
        <StyledReading className="reading">
          <h1 id="readingtitle">
            {this.props.readingtitle + ` ${this.state.slideprogress}/${this.state.slidetotal}`}
          </h1>
          <StyledContent id="contentparent" />
        </StyledReading>
      </div>
    );
  }
}
