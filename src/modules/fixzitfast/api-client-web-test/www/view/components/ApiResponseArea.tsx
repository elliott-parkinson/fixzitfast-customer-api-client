import * as React from "react";
import Services from "typedi";

import { 
    Alert,
	AppLayout, Titlebar, Fragment,
    Button,
    Badge,
    Block,
    Container,
	Card, CardBody, CardHeader,
	Form, FormGroup, Input, InputGroup,
	Header,
	NewLine,
    Nav, NavItem, NavLink,
} from "../Theme";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

export namespace ApiResponseArea
{
    export interface IViewProps
    {
        performed: boolean;
        loading: boolean;
        success: boolean;
        errorMessage: string;
        data: any;
    }

    export const Component = (props: IViewProps) => <Container>
        { props.loading == true && <Alert color="info">Loading ...</Alert> }
        { props.performed == false && <Alert color="info">Please perform request to see response data here.</Alert> }
        { props.performed == true && <Fragment>
            <Header size="xs">
                <i
                    className={
                        (props.success == true ? "fas fa-check" : "fas fa-times") + " " + 
                        (props.success == true ? "text-success" : "text-danger")
                    }
                />&nbsp;Response Data
            </Header>
            <pre>
                <code>
                    { props.data && JSON.stringify(props.data) }
                </code>
            </pre>
                { props.success == false && <Fragment>
                    <Header size="xs">
                    Error Message
                </Header>
                { props.errorMessage != "" && <Alert color="danger">Error: { props.errorMessage }</Alert> }
            </Fragment>}
        </Fragment>}
    </Container>;
}