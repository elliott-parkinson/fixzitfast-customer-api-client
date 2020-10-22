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
	Header, Paragraph,
	NewLine,
    Nav, NavItem, NavLink,
} from "../../Theme";
import { Alert } from "reactstrap";


export namespace ForgotPassword
{
    class ForgotPasswordForm
    {
        @observable Finished: boolean = false;
        
        @observable ResponseData = {};
        @observable Email: string = "";
        
        @observable Error: string = "";

        @action async Submit()
        {
            
            const authStore =  Dependencies.of("fixzitfast-customer-data-store").get<any>("account");

            let success = await authStore.ForgotPassword(this.Email);

            if (success == true)
            {
                this.Finished = true;
            }

            this.Error = authStore.Error;
        }
    }

    @observer
    export class Screen extends React.Component<any>
    {
        @observable Store: any;
        @observable Routes: any;

        @observable Form = new ForgotPasswordForm;

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
                        <Column sm={12} md={6} className="offset-md-3">
                            { this.Form.Finished == true && <Fragment>
                                <Header size="lg">Forgot password</Header>
                                <Alert>
                                    <strong>Success: </strong> Request was successful.
                                </Alert>
                                <Paragraph>
                                    If the username provided is in our database you should recieve an email with further instructions.
                                </Paragraph>
                            </Fragment>
                            }

                            { this.Form.Finished == false && <Form className="fixzitfast-form forgotpassword-form" onSubmit={e => { this.Form.Submit(); e.preventDefault(); return false; }}>
                                <Header size="lg">Forgot password</Header>

                                <FormGroup>
                                    <Input placeholder="Type email address" type="email" required value={this.Form.Email} onChange={e => this.Form.Email = e.target.value} />
                                </FormGroup>

                                { this.Form.Error != "" && <Alert color="danger">
                                    <strong>Error: </strong> { this.Form.Error } 
                                </Alert> }

                                <Button block>Reset</Button>
                            </Form> }
                        </Column>
                    </Row>
                    <NewLine />
                </Container>
            </div>;
        }
    }
}