import React from 'react';
import styled from 'styled-components';

const StyledPreview = styled.div`

`;

interface HTMLPreviewProps {
    html: any;
}
export class HTMLPreview extends React.Component<HTMLPreviewProps, {}>{
    componentDidMount() {
        let i = document.createElement("iframe");
        let iframeDoc = i.contentDocument ;// || i.contentWindow.document;
        if(iframeDoc !== null){
            iframeDoc.open();
            iframeDoc.write("<html><body></body></html>");
            iframeDoc.close();
            let iframeBody = iframeDoc.body;
            iframeBody.appendChild(this.props.html);
        }
        document.querySelector('.frame').appendChild(i);
    }
    
    render() {
        return(
            <StyledPreview className="frame" />
            // <div>pretend this is an HTML preview</div>
        );
    }
}