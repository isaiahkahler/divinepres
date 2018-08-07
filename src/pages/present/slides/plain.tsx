import React from 'react';
import styled from 'styled-components';
import {Plain, Song, Reading, Cover} from '../../../components/models';

interface PlainProps {
    program: Array<Plain | Song | Reading | Cover>;
    event: number;
}
export function PlainSlide(props: PlainProps){
    let items:Array<JSX.Element> = [];
    for(let item of props.program){
        items.push(<li><h1>{item.title}</h1></li>);
    }
    return(
        <div className="slide">
            <ul>
                {items}
            </ul>
        </div>
    );
}