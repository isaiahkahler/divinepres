import React from 'react';
import styled from 'styled-components';

const StyledReading = styled.div`
  margin: 0 5vw;
`;
const StyledContent = styled.div`
  overflow: auto;
`;

const StyledTitleSlide = styled.div`
  position: fixed;
  z-index: 2;
  height: 100vh;
  width: 100%;
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
      font-size: 8vh;
  }
  h2 {
      font-size: 5vh;
  }
`;

interface ReadingSlideProps {
  readingtitle: string;
  pagenumber: string;
  content: any;
  slideindex: number;
  nextSection: Function;
  previousSection: Function;
}

interface ReadingSlideState {
  slideindex: number;
  slideprogress: number;
  slidetotal: number;
  elements: any;
}

export class ReadingSlide extends React.Component<ReadingSlideProps, ReadingSlideState> {
  constructor(props) {
    super(props);
    let dummyEl = document.createElement('div');
    dummyEl.innerHTML = this.props.content;
    let total = dummyEl.getElementsByClassName('text').length + 1;
    this.state = {
      slideindex: this.props.slideindex,
      slideprogress: 0,
      slidetotal: total,
      elements: null
    };
  }

  scrollTextIntoView = () => {
    if(this.state.slideprogress >= 1 && this.state.slideprogress < this.state.slidetotal) {
        this.state.elements[this.state.slideprogress - 1].scrollIntoView({behavior: "smooth"});
        this.boldActiveVerse();
    }
  }

  boldActiveVerse = () => {
    if(document.querySelector('.activeText') !== null){
        document.querySelector('.activeText').classList.remove("activeText");
    }
    this.state.elements[this.state.slideprogress-1].classList.add('activeText');
  }


  componentDidUpdate() {

    this.scrollTextIntoView();
    

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
    console.log('mount');
    this.setState(previousState => ({
        ...previousState,
        elements: document.getElementsByClassName('text')
    }));
    document.getElementById('contentparent').innerHTML = this.props.content;
    document.getElementById('contentparent').querySelector('.passage-display').outerHTML = '';
    while(document.getElementById('contentparent').querySelector('.footnote') !== null){
        document.querySelector('.footnote').outerHTML ='';
    }
    document.getElementById('contentparent').style.height =
      document.querySelector('.present').getBoundingClientRect().height -
      document.querySelector('#readingtitle').getBoundingClientRect().height +
      'px';
  }

  generateTitleSlide() {
      if(this.state.slideprogress !== 0){return <div/>;}
    return (
      <StyledTitleSlide>
        <h1>{this.props.readingtitle}</h1>
        {this.props.pagenumber && <h2>Church Bible Page #{this.props.pagenumber}</h2>}
      </StyledTitleSlide>
    );
  }

  render() {
    return (
      <div className="slide">
        {this.generateTitleSlide()}
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