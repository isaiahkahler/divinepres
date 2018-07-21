import React from 'react';
import styled from 'styled-components';
import { Modal } from 'src/components/modal';
import {
  Song,
  Plain,
  Reading,
  Cover,
  Option,
  SongMap,
  ReadingMap,
  CoverMap,
  PlainMap
} from 'src/components/models';
import { Input } from 'src/components/input';
import { TextArea } from 'src/components/textarea';
import { Dropdown } from 'src/components/dropdown';
import { HTMLPreview } from 'src/components/htmlpreview';
import {Search} from 'src/components/search';
import { Form } from 'src/components/form';

const Label = styled.h2`
margin: 10px 0 0 0;
`;

const StyledType = styled.div`
  font-size: 3vh;
  font-family: 'Heebo';
  background-color: #eee;
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  cursor: not-allowed;
`;

const StyledDelete = styled.div`
input{
  font-weight: 500;
  color: #fff;
  margin-top: 15px;
  background-color: #ff5454;
}
`;

interface MenuProps {
  title: string;
  event: Song | Plain | Reading | Cover;
  onClose: any;
  submitHandler: any;
  onDelete: any;
}
interface MenuState {
  options: Array<Option>;
  didMap: boolean;
  update: boolean;
}
export class Menu extends React.Component<MenuProps, MenuState> {
  constructor(props: any) {
    super(props);
    this.state = {
      options: this.mapOptions(),
      didMap: false,
      update: false
    };
  }

  mapOptions() {
    let newOptions: Array<Option> = [];

    if (this.props.event.type === 'song') {
      for (let item of Object.keys(this.props.event)) {
        if (item === 'type') {
          newOptions.push({
            type: SongMap[item].type,
            display: SongMap[item].display,
            value: this.props.event[item],
            options: SongMap[item].options,
            dataname: item
          });
        } else {
          newOptions.push({
            type: SongMap[item].type,
            display: SongMap[item].display,
            value: this.props.event[item],
            dataname: item
          });
        }
      }
    }

    if (this.props.event.type === 'reading') {
      for (let item of Object.keys(this.props.event)) {
        if (item === 'type') {
          newOptions.push({
            type: ReadingMap[item].type,
            display: ReadingMap[item].display,
            value: this.props.event[item],
            options: ReadingMap[item].options,
            dataname: item
          });
        } else {
          newOptions.push({
            type: ReadingMap[item].type,
            display: ReadingMap[item].display,
            value: this.props.event[item],
            dataname: item
          });
        }
      }
    }

    if (this.props.event.type === 'cover') {
      for (let item of Object.keys(this.props.event)) {
        if (item === 'type') {
          newOptions.push({
            type: CoverMap[item].type,
            display: CoverMap[item].display,
            value: this.props.event[item],
            options: CoverMap[item].options,
            dataname: item
          });
        } else {
          newOptions.push({
            type: CoverMap[item].type,
            display: CoverMap[item].display,
            value: this.props.event[item],
            dataname: item
          });
        }
      }
    }
    if (this.props.event.type === 'plain') {
      for (let item of Object.keys(this.props.event)) {
        if (item === 'type') {
          newOptions.push({
            type: PlainMap[item].type,
            display: PlainMap[item].display,
            value: this.props.event[item],
            options: PlainMap[item].options,
            dataname: item
          });
        } else {
          newOptions.push({
            type: PlainMap[item].type,
            display: PlainMap[item].display,
            value: this.props.event[item],
            dataname: item
          });
        }
      }
    }

    return newOptions;
  }

  generateOptions(): Array<JSX.Element> {
    let mappedOptions = this.state.options.map((item, index) => {
      if (item.type === 'input') {
        //finish on submit!!!!!!
        return (
          <React.Fragment key={index}>
            <Label>{item.display}</Label>
            <Input defaultValue={item.value} placeholder={item.display} onSubmit={(value) => this.props.submitHandler(item.dataname, value)} update={this.state.update} />
          </React.Fragment>
        );
      }
      if (item.type === 'textarea') {
        return (
          <React.Fragment key={index}>
            <Label>{item.display}</Label>
            <TextArea defaultValue={item.value} placeholder={item.display} onSubmit={(value) => this.props.submitHandler(item.dataname, value)} update={this.state.update}/>
          </React.Fragment>
        );
      }
      if (item.type === 'dropdown') {
        return (
          <React.Fragment key={index}>
            <Label>{item.display}</Label>
            {/* <Dropdown options={item.options} value={item.value} submitOnChange={true} onSubmit={(value) => this.props.submitHandler(item.dataname, value)} update={this.state.update}/> */}
            <StyledType>{item.value}</StyledType>
          </React.Fragment>
        );
      }
      if (item.type === 'htmlpreview') {
        return(
          <React.Fragment  key={index}>
            <Label>{item.display}</Label>
          <HTMLPreview html={item.value} />;
            </React.Fragment>
        ) 
      }
      if(item.type === "search"){
        return (
          <React.Fragment key={index}>
          <Label>{item.display}</Label>
          <Search defaultValue={item.value} placeholder={item.display} onSubmit={(value) => this.props.submitHandler(item.dataname, value)} update={this.state.update}/>
          </React.Fragment>
        );
      }
      if (item.type === 'none') {
        return undefined;
      }
    });
    mappedOptions.push(<StyledDelete key={mappedOptions.length}><Form onSubmit={this.props.onDelete} submitButton={true} submitButtonValue="Delete Event" /></StyledDelete>);
    return mappedOptions;
  }

  handleClose = () => {
    this.setState(previousState => ({
      ...previousState,
      update: true
    }));
  }

  componentDidUpdate() {
    if(this.state.update){
      this.props.onClose();
    }
  }

  render() {
    return <Modal title={this.props.title} onClose={this.handleClose}>{this.generateOptions()}</Modal>;
  }
}
