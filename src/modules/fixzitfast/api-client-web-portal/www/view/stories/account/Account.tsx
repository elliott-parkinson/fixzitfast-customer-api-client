import * as React from "react";
import { Redirect } from "react-router-dom";
import Dependencies from "typedi";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

import {
    Alert,
	AppLayout, Titlebar, Fragment,
    Button,
    Container, Block, Row, Column,
	Card, CardBody, CardHeader,
	Form, FormGroup, Input, InputGroup, Label,
	Header,
	NewLine,
    Nav, NavItem, NavLink,
    InputGroupAddon
} from "../../Theme";
import { PersonalDetailsCard } from "./components/PersonalDetailsCard";
import { CardDetailsCard } from "./components/CardDetailsCard";


export namespace Account
{
    class ResetPasswordForm
    {
        @observable Finished: boolean = false;
        
        @observable ResponseData = {};
        @observable CurrentPassword: string = "";
        @observable Password: string = "";
        @observable PasswordConfirm: string = "";
        
        @observable Error: string = "";

        @action async Submit()
        {
            
            const accountStore =  Dependencies.of("fixzitfast-customer-data-store").get<any>("account");

            let success = await accountStore.ResetPassword(this.CurrentPassword, this.Password, this.PasswordConfirm);

            if (success == true)
            {
                this.Finished = true;
            }

            this.Error = accountStore.Error;
        }
    }

    @observer
    export class Screen extends React.Component<any>
    {
        @observable Store: any;
        @observable Routes: any;

        @observable ResetForm = new ResetPasswordForm;

        @observable SelectedTab = "account";

        async componentDidMount()
        {
            this.Routes = Dependencies.of("store").get<any>("routes");
            Dependencies.of("store").has("site") && (Dependencies.of("store").get<any>("site").Title = "My Account");
            this.Store = Dependencies.of("fixzitfast-customer-data-store").get<any>("account");

            let accountStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("account");
        }
    
        render() {
            return <Container>
                    { this.Store && this.Store.LoggedIn == false && <Redirect to={"/auth/login"} /> }
                    
                    <Header size="xl">Account</Header>
                    <Row>
                        <Column sm={12} md={6}>
                            <NewLine />
                            <PersonalDetailsCard.Component />
                            <NewLine />

                            <CardDetailsCard.Component />
                            <NewLine />
                        </Column>
                        <Column sm={12} md={6}>
                            <NewLine />
                            <Card className="animate__animated animate__fadeIn animate__delay-02s">
                                <CardBody>
                                    <Form className="fixzitfast-form" onSubmit={e => { this.ResetForm.Submit(); e.preventDefault(); return false; }}>
                                        <Header>Reset Password</Header>
                                        <FormGroup>
                                            <Label>
                                                Current Password
                                            </Label>
                                            <Input placeholder="Current Password" type="password" required value={this.ResetForm.CurrentPassword} onChange={e => this.ResetForm.CurrentPassword = e.target.value} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                New Password
                                            </Label>
                                            <Input placeholder="New Password" type="password" required value={this.ResetForm.Password} onChange={e => this.ResetForm.Password = e.target.value} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                Confirm New Password
                                            </Label>
                                            <Input placeholder="Confirm New Password" type="password" required value={this.ResetForm.PasswordConfirm} onChange={e => this.ResetForm.PasswordConfirm = e.target.value} />
                                        </FormGroup>

                                        <FormGroup>
                                            <Button color="primary">Reset Password</Button>
                                        </FormGroup>
                                    </Form>
                                </CardBody>
                            </Card>
                            <NewLine />
                        </Column>
                    </Row>
            </Container>;
        }
    }
}