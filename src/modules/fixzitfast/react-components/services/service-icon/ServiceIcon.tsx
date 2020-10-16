
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
    
} from "../../../../reactstrap/building-blocks";

import "./service-icon.scss";

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
            return <div className={"service-icon text-center clickable" + (this.props.selected ? " active" : "")}>
                <img className="service-category-icon" src={this.props.src} onClick={this.props.onClick}  />

                <NewLine />
                <strong>{this.props.name}</strong>
            </div>;
        }
    }
}