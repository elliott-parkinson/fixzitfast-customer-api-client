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


export namespace Account
{
    class PersonalDetailsForm
    {
        @observable Finished: boolean = false;
        
        @observable ResponseData = {};
        @observable Name: string = "";
        @observable Email: string = "";
        @observable Phone: string = "";
        
        @observable Error: string = "";

        @action async Submit()
        {
            
            const accountStore =  Dependencies.of("fixzitfast-customer-data-store").get<any>("account");

            let success = await accountStore.UpdateUserDetails(this.Name, this.Email, this.Phone);

            if (success == true)
            {
                this.Finished = true;
            }

            this.Error = accountStore.Error;
        }
    }

    class CardDetailsForm
    {
        @observable Finished: boolean = false;
        
        @observable ResponseData = {};
        @observable CardType: string = "";
        @observable CardName: string = "";
        @observable CardExpiry: string = "";
        @observable CardNumber: string = "";
        @observable CardDigits: string = "";
        
        @observable Error: string = "";

        @action async Submit()
        {
            
            const accountStore =  Dependencies.of("fixzitfast-customer-data-store").get<any>("account");

            let success = await accountStore.UpdateCardDetails(this.CardDigits, this.CardDigits, this.CardDigits);

            if (success == true)
            {
                this.Finished = true;
            }

            this.Error = accountStore.Error;
        }
    }

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

        @observable PersonalForm = new PersonalDetailsForm;
        @observable CardForm = new CardDetailsForm;
        @observable ResetForm = new ResetPasswordForm;

        @observable SelectedTab = "account";

        async componentDidMount()
        {
            this.Store = Dependencies.of("fixzitfast-customer-data-store").get<any>("account");
            this.Routes = Dependencies.of("store").get<any>("routes");

            let accountStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("account");

            this.PersonalForm.Name = accountStore.Name;
            this.PersonalForm.Email = accountStore.Email;
            this.PersonalForm.Phone = accountStore.Phone;
            this.CardForm.CardDigits = accountStore.CardDigits;
        }
    
        render() {
            return <Container>
                    { this.Store && this.Store.LoggedIn == false && <Redirect to={"/auth/login"} /> }
                    <Row>
                        <Column sm={12} md={8}>
                            <Header size="xl">Account</Header>
                            
                            <NewLine />
                            <Card>
                                <CardBody>
                                    <Header>Personal Details</Header>

                                    <Form onSubmit={e => { this.PersonalForm.Submit(); e.preventDefault(); return false; }}>
                                        <FormGroup>
                                            <Label>
                                                Full name
                                                <Input placeholder="Full name" type="text" required value={this.PersonalForm.Name} onChange={e => this.PersonalForm.Name = e.target.value} />
                                            </Label>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                Email
                                                <Input placeholder="Email address" type="email" required value={this.PersonalForm.Email} onChange={e => this.PersonalForm.Email = e.target.value} />
                                            </Label>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                Phone Number
                                                <Input placeholder="Phone Number" type="tel" required value={this.PersonalForm.Phone} onChange={e => this.PersonalForm.Phone = e.target.value} />
                                            </Label>
                                        </FormGroup>

                                        <Button color="primary">Save</Button>
                                    </Form>
                                </CardBody>
                            </Card>
                            <NewLine />
                            <Card>
                                <CardBody>
                                    <Header>Card Details</Header>

                                    <Form onSubmit={e => { this.PersonalForm.Submit(); e.preventDefault(); return false; }}>
                                        <FormGroup>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <Button disabled>
                                                        <i className="fas fa-credit-card" />
                                                    </Button>
                                                </InputGroupAddon>
                                                <Input placeholder={"**** " + this.CardForm.CardDigits} type="text" disabled value={""} />
                                            </InputGroup>

                                        </FormGroup>

                                        <Button color="primary">Update Card Information</Button>
                                    </Form>
                                </CardBody>
                            </Card>
                            <NewLine />
                            <Card>
                                <CardBody>
                                    <Header>Reset Password</Header>
                                    <Form onSubmit={e => { this.ResetForm.Submit(); e.preventDefault(); return false; }}>
                                        <FormGroup>
                                            <Label>
                                                Current Password
                                                <Input placeholder="Current Password" type="password" required value={this.ResetForm.CurrentPassword} onChange={e => this.ResetForm.CurrentPassword = e.target.value} />
                                            </Label>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                New Password
                                                <Input placeholder="New Password" type="password" required value={this.ResetForm.Password} onChange={e => this.ResetForm.Password = e.target.value} />
                                            </Label>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                Confirm New Password
                                                <Input placeholder="Confirm New Password" type="password" required value={this.ResetForm.PasswordConfirm} onChange={e => this.ResetForm.PasswordConfirm = e.target.value} />
                                            </Label>
                                        </FormGroup>

                                        <Button color="primary">Save</Button>
                                    </Form>
                                </CardBody>
                            </Card>
                            <NewLine />
                        </Column>
                        <Column sm={12} md={4} className="full-center">
                            <Block>
                                <i className="fas fa-images fa-5x" />
                            </Block>
                        </Column>
                    </Row>
            </Container>;
        }
    }
}