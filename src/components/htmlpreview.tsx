import React from 'react';
import styled from 'styled-components';

const StyledPreview = styled.div`
    margin: 10px 0;
    border: 5px solid #000;
    width: 100%;
    height: 50vh;
    overflow: auto;
`;

interface HTMLPreviewProps {
    html: any;
}
export class HTMLPreview extends React.Component<HTMLPreviewProps, {}>{
    componentDidMount() {
        console.log(this.props.html);
        if(!!this.props.html){
            document.querySelector('.frame').innerHTML = this.props.html;
        }
    }
    
    render() {
        return(
            <StyledPreview className="frame" />
        );
    }
}