import React from 'react';
import styled from 'styled-components';

let StyledCover = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & h1 {
        font-size: 9vh;
    }
    & h2 {
        font-size: 5vh;
    }
`;

interface CoverSlideProps {
    title: string | undefined;
    subtitle: string | undefined;
    backgroundURL: string | undefined;
    fontcolor: string | undefined;
}

export class CoverSlide extends React.Component<CoverSlideProps, {}> {
    
    componentDidMount() {
        if(!!this.props.backgroundURL){
            let el:HTMLElement = document.querySelector('.cover');
            el.style.backgroundImage = `url('${this.props.backgroundURL}')`; 
        }
        if(!!this.props.fontcolor){
            let el:HTMLElement = document.querySelector('.cover');
            el.style.color = this.props.fontcolor; 
        }
    }

    render() {
        return(
            <StyledCover className="slide cover animated fadeIn">
                <h1>{this.props.title}</h1>
                <h2>{this.props.subtitle}</h2>
            </StyledCover>
        );
    }
}