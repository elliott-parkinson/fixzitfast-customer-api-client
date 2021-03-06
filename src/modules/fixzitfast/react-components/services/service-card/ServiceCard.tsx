import * as React from "react";
import Dependencies from "typedi";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

import { 
	Fragment,
    Button,
    Container,
	Card, CardBody, CardHeader, CardFooter,
	Form, FormGroup, Input, InputGroup,
	Header,
	NewLine,
    Nav, NavItem, NavLink,
    
} from "../../../../reactstrap/building-blocks";

import "./service-card.scss";
import { ServiceCategoryIcon } from "../service-category-icon";

export namespace ServiceCard
{
    export interface IViewProps
    {
        src?: string;
        name: string;
        description: string;

        onClick?: Function;
    }

    @observer
    export class Component extends React.Component<any>
    {
        render() {
            return <Card className="service-card" onClick={this.props.onClick}>
                <CardBody>
                    <Header size="xs">
                        <ServiceCategoryIcon.Component src={this.props.src} isService/>  &nbsp; <span>{this.props.name}</span>
                    </Header>
                    <NewLine />
                    {this.props.description}
                </CardBody>
            </Card>;
        }
    }
}