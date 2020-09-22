import * as React from "react";
import Dependencies from "typedi";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

import { 
	AppLayout, Titlebar, Fragment,
    Button,
    Container,
	Form, FormGroup, Input, InputGroup,
	Header,
	NewLine,
    Nav, NavItem, NavLink,
    
} from "../../../reactstrap/building-blocks";

export namespace ServiceIcon
{
    export interface IViewProps
    {
        iconUrl: string;
        name: string;
        selected: boolean;

        onClick?: Function;
    }

    @observer
    export class Component extends React.Component<any>
    {
        render() {
            return <div className="service-icon">
                <Button color="primary" className="rounded-circle" onClick={this.props.onClick} active={this.props.selected ? true : undefined}>
                    <i className="fas fa-images" />
                </Button>
                <NewLine />
                <strong>{this.props.name}</strong>
            </div>;
        }
    }
}