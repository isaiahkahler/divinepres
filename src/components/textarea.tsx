import React, { FormEvent } from 'react';
import styled from 'styled-components';
import { Form } from 'src/components/form';

const StyledTextArea = styled.textarea`
  width: 100%;
  font-size: 3vh;
  font-family: 'Heebo';
  border: 0px;
  background-color: #eee;
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

interface TextAreaProps{
    placeholder?: string;
    defaultValue?: string;
    onSubmit?: any;
    submitOnChange?: boolean;
    update: boolean;
}
interface TextAreaState{
    value: string;
}
export class TextArea extends React.Component<TextAreaProps, TextAreaState>{
    constructor(props: any){
        super(props);
        let startingValue = this.props.defaultValue || "";
        this.state = {value: startingValue}
    }

    handleSubmit = () => {
        this.props.onSubmit && this.props.onSubmit(this.state.value);
    }

    handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => { 
        this.setState({value: event.currentTarget.value});
    }

    componentDidUpdate(previousProps: TextAreaProps, previousState: TextAreaState) {
        this.props.submitOnChange && this.props.onSubmit(this.state.value);
        if(this.props.update){
            this.handleSubmit();
          }
    }

    render() {
        return(
            <Form onSubmit={this.handleSubmit} >
                <StyledTextArea onChange={this.handleChange} defaultValue={this.state.value} placeholder={this.props.placeholder || ""}/>
            </Form>
        );
    }
}