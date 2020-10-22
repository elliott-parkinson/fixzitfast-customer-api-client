import * as React from "react";
import Dependencies from "typedi";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

import { 
	AppLayout, Titlebar, Fragment,
    Button,
    Container, Block, Row, Column,
	Card, CardBody, CardHeader,
	Form, FormGroup, Input, InputGroup,
	Header,
	NewLine,
    Nav, NavItem, NavLink,
} from "../../Theme";
import { Alert } from "reactstrap";


export namespace Login
{
    class LoginForm
    {
        @observable ResponseData = {};
        @observable Email: string = "";
        @observable Password: string = "";

        @observable Error: string = "";

        @action async Submit()
        {
            
            const authStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("account");
            const routeStore = Dependencies.of("store").get<any>("routes");

            let success = await authStore.Login(this.Email, this.Password);
            if (success == true)
            {
                routeStore.Go("/");
                return;
            }
            else
            {
                this.Error = authStore.Error;
            }
        }

        @action async LoginWithGoogle()
        {
            const modalStore = Dependencies.of("store").get<any>("modals");
            modalStore.Open("Error: API Not Provided", "There is no documented API for Google login at this time.");
        }

        @action async LoginWithFacebook()
        {
            const modalStore = Dependencies.of("store").get<any>("modals");
            modalStore.Open("Error: API Not Provided", "There is no documented API for Facebook login at this time.");
        }
    }

    @observer
    export class Screen extends React.Component<any>
    {
        @observable Store: any;
        @observable Routes: any;

        @observable Form = new LoginForm;

        @observable SelectedTab = "account";

        componentDidMount()
        {
            this.Store = Dependencies.of("fixzitfast-customer-data-store").get<any>("account");
            this.Routes =  Dependencies.of("store").get<any>("routes");
        }
    
        render() {
            return <div className="background-white">
                <Container>
                    <NewLine />
                    <Row>
                        <Column sm={12} md={6} className="auth-column">
                            <Form className="fixzitfast-form login-form" onSubmit={e => { this.Form.Submit(); e.preventDefault(); return false; }}>
                                <Header size="lg">Sign in with email</Header>

                                <FormGroup>
                                    <Input placeholder="Type email address" type="email" required value={this.Form.Email} onChange={e => this.Form.Email = e.target.value} />
                                </FormGroup>
                                <FormGroup>
                                    <Input placeholder="Password" type="password" required value={this.Form.Password} onChange={e => this.Form.Password = e.target.value} />
                                </FormGroup>
                                
                                <FormGroup className="text-right">
                                    <a href="./forgot-password" onClick={ e => { e.preventDefault(); this.Routes.Go("./forgot-password"); return false; }}>Forgot Password?</a>
                                </FormGroup>

                                { this.Form.Error != "" && <Alert color="danger">
                                    <strong>Error: </strong> { this.Form.Error } 
                                </Alert> }
                                <NewLine />
                                <NewLine />

                                <Button color="primary" block>Sign in</Button>
                            </Form>
                        </Column>
                        <Column sm={12} md={6}>
                            <Block className="full-center w-100 h-100">
                                <div className="g-signin2" data-onsuccess="onSignIn"></div>
                                <div className="fb-login-button" data-size="large" data-button-type="login_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false" data-width="280px"></div>
                                <NewLine />
                                
                                {/*
                                <Button block onClick={e => this.Form.LoginWithGoogle() }>Sign in with Google</Button>
                                <Button block onClick={e => this.Form.LoginWithFacebook() }>Sign in with Facebook</Button>
                                */}
                            </Block>
                        </Column>
                    </Row>
                    <NewLine />
                </Container>
            </div>;
        }
    }
}