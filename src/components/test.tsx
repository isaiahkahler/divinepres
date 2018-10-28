import React from 'react';

export class Button extends React.Component<{}, { value: string; clicks: number }> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: 'click me',
      clicks: 1
    };
  }

  handleClick = () => {
    this.setState({
      value: `clicked ${this.state.clicks} times`,
      clicks: this.state.clicks + 1
    });
  };

  render() {
    return (
      <input
        type="button"
        value={this.state.value}
        onClick={this.handleClick}
        style={{ color: 'red', backgroundColor: '#00ff00', borderRadius: '5px' }}
      />
    );
  }
}
