import React from 'react';
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

interface MenuProps {
  title: string;
  event: Song | Plain | Reading | Cover;
  onClose: any;
}
interface MenuState {
  options: Array<Option>;
  didMap: boolean;
}
export class Menu extends React.Component<MenuProps, MenuState> {
  constructor(props: any) {
    super(props);
    this.state = {
      options: this.mapOptions(),
      didMap: false
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
            options: SongMap[item].options
          });
        } else {
          newOptions.push({
            type: SongMap[item].type,
            display: SongMap[item].display,
            value: this.props.event[item]
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
            options: ReadingMap[item].options
          });
        } else {
          newOptions.push({
            type: ReadingMap[item].type,
            display: ReadingMap[item].display,
            value: this.props.event[item]
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
            options: CoverMap[item].options
          });
        } else {
          newOptions.push({
            type: CoverMap[item].type,
            display: CoverMap[item].display,
            value: this.props.event[item]
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
            options: PlainMap[item].options
          });
        } else {
          newOptions.push({
            type: PlainMap[item].type,
            display: PlainMap[item].display,
            value: this.props.event[item]
          });
        }
      }
    }

    return newOptions;
  }

  generateOptions(): Array<JSX.Element> {
    let mappedOptions = this.state.options.map((item, index) => {
      if (item.type === 'section label') {
        //this might not be a thing
        return <h2 key={index}>{item.value}</h2>;
      }
      if (item.type === 'input') {
        //finish on submit!!!!!!
        return (
          <React.Fragment key={index}>
            <h3>{item.display}</h3>
            <Input defaultValue={item.value} placeholder={item.display} />
          </React.Fragment>
        );
      }
      if (item.type === 'textarea') {
        return (
          <React.Fragment key={index}>
            <h3>{item.display}</h3>
            <TextArea defaultValue={item.value} placeholder={item.display} />
          </React.Fragment>
        );
      }
      if (item.type === 'dropdown') {
        console.log("fdsafdkajfksdla")
        console.log(item)
        return (
          <React.Fragment key={index}>
            <h3>{item.display}</h3>
            <Dropdown options={item.options} value={item.value} />
          </React.Fragment>
        );
      }
      if (item.type === 'htmlpreview') {
        return <HTMLPreview html={item.value} key={index} />;
      }
      if (item.type === 'none') {
        return undefined;
      }
    });
    console.log(this.state.options);
    return mappedOptions;
  }

  render() {
    return <Modal title={this.props.title} onClose={this.props.onClose}>{this.generateOptions()}</Modal>;
  }
}
