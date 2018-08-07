import React, { FormEvent } from 'react';
import styled from 'styled-components';
import { Form } from './form';

const StyledSelect = styled.select`
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

const StyledOption = styled.option`
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
  &:hover {
    background-color: #0080ff50;
  }
`;

interface DropdownProps {
  value: string;
  options: Array<string> | undefined;
  onSubmit?: any;
  submitOnChange?: boolean;
  update: boolean;
}
interface DropdownState {
  value: string;
}
export class Dropdown extends React.Component<DropdownProps, DropdownState> {
  constructor(props: any) {
    super(props);
    this.state = { value: this.props.value };
  }

  handleSubmit = () => {
    this.props.onSubmit && this.props.onSubmit(this.state.value);
  }

  handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ value: event.currentTarget.value });
  };

  componentDidUpdate(previousProps: DropdownProps, previousState: DropdownState) {
    this.props.submitOnChange && this.handleSubmit();
    if(this.props.update){
      this.handleSubmit();
    }
  }

  mapOptions() {
    if(!!this.props.options){
      return this.props.options.map((item, index) => (
        <StyledOption key={index} value={item}>
          {item}
        </StyledOption>
      ))
    } else {
      return undefined;
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.onSubmit}>
        <StyledSelect onChange={this.handleChange} defaultValue={this.state.value}>
          {this.mapOptions()}
        </StyledSelect>
      </Form>
    );
  }
}
