import * as React from "react";
import { Redirect } from "react-router-dom";
import Dependencies from "typedi";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

import { 
	AppLayout, Titlebar, Fragment,
    Button,
    Container, Block, Row, Column,
	Card, CardBody, CardHeader,
	Form, FormGroup, Input, InputGroup, Label,
	Header,
	NewLine,
    Nav, NavItem, NavLink,
} from "../../Theme";
import { Alert } from "reactstrap";


export namespace CancellationPolicy
{
    @observer
    export class Screen extends React.Component<any>
    {
        async componentDidMount()
        {
            
        }
    
        render() {
            return <Container>
                <Alert color="warning">
                    No copy provided for cancellation policy.
                </Alert>
            </Container>;
        }
    }
}