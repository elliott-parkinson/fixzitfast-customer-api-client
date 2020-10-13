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
    
} from "../../../reactstrap/building-blocks";

export namespace ServiceCard
{
    export interface IViewProps
    {
        iconUrl: string;
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
                    <Button color="primary" disabled className="rounded-circle">
                        <i className="fas fa-images" />
                    </Button>
                </CardBody>
                <CardFooter>
                    <strong>{this.props.name}</strong>
                    <NewLine />
                    {this.props.description}
                </CardFooter>
            </Card>;
        }
    }
}