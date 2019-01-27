import * as React from 'react';
import { Modal } from '../../components/modal';
import { Dropdown } from '../../components/dropdown';
import styled from 'styled-components';
import { Input } from '../../components/input';
import { Song, Reading, Plain, Cover, Option } from '../../components/models';


const Label = styled.h2`
  margin: 10px 0 0 0;
`;

interface ModifyModalProps {
    type: "add event" | "order events",
    onClose: Function,
    onSubmit: (program) => void,
    program: Array<Reading | Song | Plain | Cover>
}

interface ModifyModalState {
    type: 'reading' | 'song' | 'plain' | 'cover',

}

export class ModifyModal extends React.Component<ModifyModalProps, ModifyModalState> {
    constructor(props: ModifyModalProps) {
        super(props);
        this.state = { type: "plain" }
    }

    componentDidUpdate() {
        console.log(this.state.type)
    }

    render() {
        return (
            <Modal title={this.props.type} onClose={this.props.onClose}>
                {this.props.type === "add event" ? (
                    <React.Fragment>
                        <Label>Choose Event Type</Label>
                        <Dropdown value={this.state.type} options={['plain', 'song', 'reading', 'cover']} onSubmit={(value) => this.setState({ type: value })} submitOnChange />
                        {/* <Input
                            defaultValue={'add'}
                            placeholder={item.display}
                            onSubmit={value => this.props.submitHandler(item.dataname, value)}
                            update={this.state.update}
                        /> */}
                    </React.Fragment>
                ) : (
                        <div></div>
                    )}
            </Modal>

        );
    }
}