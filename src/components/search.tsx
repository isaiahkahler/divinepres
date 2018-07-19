import React, { FormEvent } from 'react';
import styled from 'styled-components';
import { Form } from 'src/components/form';

const StyledSearch = styled.input`
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

interface SearchProps {
  placeholder?: string;
  defaultValue?: string;
  onSubmit?: any;
  submitOnChange?: boolean;
  update: boolean;
}
interface SearchState {
  value: string;
}
export class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: any) {
    super(props);
    let startingValue = this.props.defaultValue || '';
    this.state = { value: startingValue };
  }

  handleSubmit = () => {
    this.props.onSubmit && this.props.onSubmit(this.state.value);
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.currentTarget.value });
  };

  componentDidUpdate(previousProps: SearchProps, previousState: SearchState) {
    this.props.submitOnChange && this.props.onSubmit(this.state.value);
    if(this.props.update){
        this.handleSubmit();
      }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} submitButton={true} submitButtonValue="search">
        <StyledSearch
          onChange={this.handleChange}
          defaultValue={this.state.value}
          placeholder={this.props.placeholder || ''}
        />
      </Form>
    );
  }
}
