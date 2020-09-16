import * as React from "react";
import Dependencies from "typedi";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

import { 
	AppLayout, Titlebar, Fragment,
    Button,
    Container,
	Card, CardBody, CardHeader,
	Form, FormGroup, Input, InputGroup,
	Header,
	NewLine,
    Nav, NavItem, NavLink,
    
} from "../../reactstrap/building-blocks";

export namespace Login
{
    export interface IViewProps
    {
        submitAction: Function;

        forgotPasswordUrl: string;
        forgotPasswordAction: Function;
    }

    class LoginForm
    {
        @observable Email: string = "";
        @observable Password: string = "";

        @action async Submit()
        {
            
        }
    }

    @observer
    export class Component extends React.Component<any>
    {
        @observable Store: any;
        @observable Router: any;

        @observable Login = new LoginForm;


        componentDidMount()
        {
            this.Store = Dependencies.of("store").get<any>("auth");
            this.Router =  Dependencies.of("store").get<any>("routes");
        }
    
        render() {
            return <Fragment>
                <Form className="login-form" onSubmit={e => { props.form.Submit(); e.preventDefault(); return false; }}>
                    <Header size="lg">Sign in with email</Header>
                    <FormGroup>
                        <Input placeholder="Type email address" type="email" value={this.Login.Email} onChange={e => this.Login.Email = e.target.value} />
                    </FormGroup>
                    <FormGroup>
                        <Input placeholder="Password" type="password" value={this.Login.Password} onChange={e => this.Login.Password = e.target.value} />
                    </FormGroup>

                    <a className="forgot-password-link" href="#">Forgot Password?</a>

                    <Button block>Sign in</Button>
                </Form>
            </Fragment>;
        }
    }
}