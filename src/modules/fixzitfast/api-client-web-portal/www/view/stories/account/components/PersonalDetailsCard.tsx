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


export namespace PersonalDetailsCard
{
    class DetailsForm
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
                this.DetailsForm.Name = userDetails.Name;
                this.DetailsForm.Email = userDetails.Email;
                this.DetailsForm.Phone = userDetails.Phone;
            }
        }
    
        render() {
            return <Card className="animate__animated animate__fadeIn">
                <CardBody>
                    <Form className="fixzitfast-form" onSubmit={e => { this.DetailsForm.Submit(); e.preventDefault(); return false; }}>
                        <Header>Personal Details</Header>
                        <FormGroup>
                            <Label>
                                Full name
                            </Label>
                            <Input placeholder="Full name" type="text" required value={this.DetailsForm.Name} onChange={e => this.DetailsForm.Name = e.target.value} />
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                Email
                            </Label>
                            <Input placeholder="Email address" type="email" required value={this.DetailsForm.Email} onChange={e => this.DetailsForm.Email = e.target.value} />
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                Phone Number
                            </Label>
                            <Input placeholder="Phone Number" type="tel" required value={this.DetailsForm.Phone} onChange={e => this.DetailsForm.Phone = e.target.value} />
                        </FormGroup>

                        <FormGroup>
                            <Button color="primary">Update</Button>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>;
        }
    }
}