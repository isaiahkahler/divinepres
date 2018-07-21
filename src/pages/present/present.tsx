import React from 'react';

export class Present extends React.Component<{}, {}>{
    render() {
        console.log(JSON.parse(localStorage.getItem("program")));
        return(
            <p>{localStorage.getItem("program")}</p>
        );
    };
}