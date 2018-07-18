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
    // if (this.state.didMap) {
    //   return;
    // }
    let newOptions: Array<Option> = [];

    if (this.props.event.type === 'song') {
      for (let item of Object.keys(this.props.event)) {
        if (item === 'type') {
          console.log("dropdown")
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
      console.log(newOptions);
    }

    console.log('this should only run once?');

    // if (this.props.event.type == 'song') {
    //   let index = 0;
    //   for (let property in this.props.event) {
    //     newOptions.push({
    //       type: SongMap[index].type,
    //       value: property,
    //       display: SongMap[index].display
    //     });
    //     index++;
    //   }
    // }
    // if (this.props.event.type == 'reading') {
    //   let index = 0;
    //   for (let property in this.props.event) {
    //     newOptions.push({
    //       type: ReadingMap[index].type,
    //       value: property,
    //       display: ReadingMap[index].display
    //     });
    //     index++;
    //   }
    // }
    // if (this.props.event.type == 'cover') {
    //   let index = 0;
    //   for (let property in this.props.event) {
    //     newOptions.push({
    //       type: CoverMap[index].type,
    //       value: property,
    //       display: CoverMap[index].display
    //     });
    //     index++;
    //   }
    // }
    // if (this.props.event.type == 'plain') {
    //   let index = 0;
    //   for (let property in this.props.event) {
    //     newOptions.push({
    //       type: PlainMap[index].type,
    //       value: property,
    //       display: PlainMap[index].display
    //     });
    //     index++;
    //   }
    // }
    //how does this update??
    // this.setState({
    //   options: newOptions,
    //   didMap: true
    // });
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
    return <Modal title={this.props.title}>{this.generateOptions()}</Modal>;
  }
}
