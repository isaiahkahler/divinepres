import React from 'react';
import { Modal } from 'src/components/modal';
import { Option } from 'src/components/models';
import { Input } from 'src/components/input';

interface MenuProps {
  title: string;
  options: Array<Option>;
}
interface MenuState {}
export class Menu extends React.Component<MenuProps, MenuState> {
  constructor(props: any) {
    super(props);
  }

  generateOptions() {
    this.props.options.map((item, index) => {
      if (item.type === 'section label') {
        return <h2>{item.value}</h2>;
      }
      if (item.type === 'input') { //finish on submit
        return (
          <React.Fragment>
            <h3>{item.display}</h3>
            <Input defaultValue={item.value} placeholder={item.display} /> 
          </React.Fragment>
        );
      }
      if(item.type === "textarea"){
          return(
              <React.Fragment>
            <h3>{item.display}</h3>
            
                  </React.Fragment>
          );
      }
    });
  }

  render() {
    return <Modal />;
  }
}
