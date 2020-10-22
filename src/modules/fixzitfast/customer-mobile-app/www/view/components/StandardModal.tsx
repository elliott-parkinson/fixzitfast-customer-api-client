import * as React from "react";
import Dependencies from "typedi";

import { 
    Fragment,
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
} from "../Theme";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

export namespace StandardModal
{
    export interface IViewProps
    {
        isOpen: boolean;

        toggle: Function;
        close: Function;

        titleText: string;
        descriptionText: string;
    }

    @observer
    export class Component extends React.Component<IViewProps>
    {
        render() {
            return <Modal isOpen={this.props.isOpen} toggle={e => this.props.toggle()} className="">
            <ModalHeader toggle={e => this.props.toggle()}>
                {this.props.titleText}
            </ModalHeader>
            <ModalBody>
                {this.props.descriptionText}
            
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={e => this.props.close()}>Okay</Button>{' '}
            </ModalFooter>
          </Modal>;
        }
    }
}