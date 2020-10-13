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


export namespace Siginup
{
    class SiginupForm
    {
        @observable Finished: boolean = false;

        @observable ResponseData = {};
        @observable Name: string = "";
        @observable Email: string = "";
        @observable Password: string = "";
        @observable PasswordConfirm: string = "";
        @observable Phone: string = "";

        @observable Error: string = "";

        @action async Submit()
        {
            const authStore =  Dependencies.of("fixzitfast-customer-store").get<any>("auth");

            if (this.Password !== this.PasswordConfirm)
            {
                this.Error = "Passwords do not match";
                return;
            }

            let success = await authStore.Signup(
                this.Name,
                this.Email,
                this.Password,
                this.Phone
            );

            if (success == true)
            {
                this.Finished = true;
            }

            this.Error = authStore.Error;
        }

        @action async SignupWithGoogle()
        {
            const modalStore = Dependencies.of("store").get<any>("modals");
            modalStore.Open("Error: API Not Provided", "There is no documented API for Google Siginup at this time.");
        }

        @action async SignupWithFacebook()
        {
            const modalStore = Dependencies.of("store").get<any>("modals");
            modalStore.Open("Error: API Not Provided", "There is no documented API for Facebook Siginup at this time.");
        }
    }

    @observer
    export class Screen extends React.Component<any>
    {
        @observable Store: any;
        @observable Routes: any;

        @observable Form = new SiginupForm;

        @observable SelectedTab = "account";

        componentDidMount()
        {
            this.Store = Dependencies.of("fixzitfast-customer-store").get<any>("auth");
            this.Routes =  Dependencies.of("store").get<any>("routes");
        }
    
        render() {
            return <Container>
                    <Row>
                        <Column sm={12} md={6}>
                            { this.Form.Finished == true &&
                                <Alert>
                                    <strong>Success: </strong> You have successfully signed up. Please go to the login page  to carry on.
                                </Alert>
                            }
                            { this.Form.Finished == false &&
                                <Form className="login-form" onSubmit={e => { this.Form.Submit(); e.preventDefault(); return false; }}>
                                    <Header size="lg">Sign up with email</Header>

                                    <FormGroup>
                                        <Input placeholder="Type name" type="text" required value={this.Form.Name} onChange={e => this.Form.Name = e.target.value} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input placeholder="Type email address" type="email" required value={this.Form.Email} onChange={e => this.Form.Email = e.target.value} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input placeholder="Type phone" type="tel" required value={this.Form.Phone} onChange={e => this.Form.Phone = e.target.value} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input placeholder="Type password" type="password" required value={this.Form.Password} onChange={e => this.Form.Password = e.target.value} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input placeholder="Confirm password" type="password" required value={this.Form.PasswordConfirm} onChange={e => this.Form.PasswordConfirm = e.target.value} />
                                    </FormGroup>

                                    { this.Form.Error != "" && <Alert color="danger">
                                        <strong>Error: </strong> { this.Form.Error } 
                                    </Alert> }

                                    <Button color="primary" block>Sign up</Button>
                                </Form>
                            }
                            
                        </Column>
                        <Column sm={12} md={6}>
                            { this.Form.Finished == false && <Block className="full-center w-100 h-100">
                                    <Button block onClick={e => this.Form.SignupWithFacebook() }>Sign up with Facebook</Button>
                                    <Button block onClick={e => this.Form.SignupWithGoogle() }>Sign up with Google</Button>
                            </Block> }
                        </Column>
                    </Row>
            </Container>;
        }
    }
}