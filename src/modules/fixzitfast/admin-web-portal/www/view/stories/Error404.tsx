import * as React from "react";
import Dependencies from "typedi";

import { 
	AppLayout, Titlebar, Fragment,
    Button,
    Container,
	Card, CardBody, CardHeader,
	Form, FormGroup, Input, InputGroup, InputGroupAddon,
	Header, Paragraph,
	NewLine,
    Nav, NavItem, NavLink,
    Row, Column
} from "../Theme";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

export namespace Error404
{
    @observer
    export class Screen extends React.Component<any>
    {
        @observable Router: any;

        componentDidMount()
        {
            this.Router =  Dependencies.of("store").get<any>("routes");
        }
    
        render() {
            return <Container>
                <Header>Error: Could not find route.</Header>
                <Paragraph>That's a 404 error unfortunately. The page you were looking for could not be found.</Paragraph>
                <Paragraph>If you typed the url in yourself, please double check it.</Paragraph>
                <Paragraph>If you came here from another website or page, press the back button.</Paragraph>
            </Container>;
        }
    }
}