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
} from "../../../Theme";


export namespace CardDetailsCard
{
    class DetailsForm
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

    @observer
    export class Component extends React.Component<any>
    {
        @observable Routes: any;

        @observable DetailsForm = new DetailsForm;

        async componentDidMount()
        {
            this.Routes = Dependencies.of("store").get<any>("routes");

            let accountStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("account");
            let userDetails = await accountStore.GetUserDetails();

            if (userDetails != null)
            {
                this.DetailsForm.CardDigits = userDetails.CardDigits ? userDetails.CardDigits : "****";
            }
        }
    
        render() {
            return <Card className="animate__animated animate__fadeIn animate__delay-04s">
            <CardBody>
                <Form className="fixzitfast-form" onSubmit={e => { this.DetailsForm.Submit(); e.preventDefault(); return false; }}>
                    <Header>Card Details</Header>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <div className="addon-icon">
                                    <i className="fas fa-credit-card" />
                                </div>
                            </InputGroupAddon>
                            <Input value={"**** " + this.DetailsForm.CardDigits} type="text" disabled />
                        </InputGroup>

                    </FormGroup>

                    <Button color="primary">Update Card Information</Button>
                </Form>
            </CardBody>
        </Card>;
        }
    }
}