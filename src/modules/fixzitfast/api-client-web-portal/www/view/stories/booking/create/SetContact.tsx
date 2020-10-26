import * as React from "react";
import { Redirect } from "react-router-dom";
import Dependencies, { Service } from "typedi";

import { 
    Alert,
	AppLayout, Titlebar, Fragment,
    Button,
    Container,
	Card, CardBody, CardHeader,
	Form, FormGroup, Input, InputGroup, InputGroupAddon, Typeahead, Label, Dropzone,
	Header, Paragraph,
	NewLine,
    Nav, NavItem, NavLink,
    Row, Column
} from "../../../Theme";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";
import { ServiceCard, ServiceIcon } from "../../../../../../react-components";
import { OrderSummary } from "./components/OrderSummary";
import { CreateBookingStepper } from "./components/CreateBookingStepper";

export namespace SetContact
{
    export class ContactForm
    {
        @observable Name = "";
        @observable PhoneNumber = "";
        @observable Email = "";
        
        @observable Errors = [];

        @action SetName(name: string)
        {
            this.Name = name;
        }
        
        @action async Submit()
        {
            let bookingStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("bookings");
            bookingStore.InProgress.Contact.Set(this.Name, this.Email, this.PhoneNumber);
            bookingStore?.InProgress.Store();

            let router = Dependencies.of("store").get<any>("routes");
            router.Go("/booking/create/paymentdetails");
        }
    }
    
    @observer
    export class Screen extends React.Component<any>
    {
        @observable Router: any;
        @observable BookingStore: any;

        @observable Form = new ContactForm;

        componentDidMount()
        {
            this.Router =  Dependencies.of("store").get<any>("routes");
            Dependencies.of("store").has("site") && (Dependencies.of("store").get<any>("site").Title = "Contact Details");
            this.BookingStore =  Dependencies.of("fixzitfast-customer-data-store").get<any>("bookings");

            let details = this.BookingStore.InProgress.Contact.Get();

            this.Form.Name = details.Name;
            this.Form.PhoneNumber = details.PhoneNumber;
            this.Form.Email = details.Email;
        }
    
        render() {
            return <Fragment>
                <Form className="fixzitfast-form animate__animated animate__fadeIn animate__delay-02s" onSubmit={e => { e.preventDefault(); this.Form.Submit(); return false; }}>
                    <Header size="sm">Contact Details</Header>
                    <Paragraph>Give us the contact details for this job. This is the number or email we will call if we need to get in touch.</Paragraph>

                    <FormGroup tag="fieldset">
                        <Label>
                            Name (Required)
                        </Label>
                        <Input type="text" required placeholder="Enter Full Name" value={this.Form.Name} onChange={ e => this.Form.Name = e.target.value } />{' '}
                    </FormGroup>

                    <FormGroup tag="fieldset">
                        <Label>
                            Phone Number (Required)
                        </Label>
                        <Input type="tel" required placeholder="eg: 07959 484858" value={this.Form.PhoneNumber} onChange={ e => this.Form.PhoneNumber = e.target.value } />{' '}
                    </FormGroup>

                    <FormGroup tag="fieldset">
                        <Label>
                            Email (Required)
                        </Label>
                        <Input type="email" required placeholder="Enter Email" value={this.Form.Email} onChange={ e => this.Form.Email = e.target.value } />{' '}
                    </FormGroup>

                    <Button color="primary" block>Go to Payment</Button>
                </Form>
            </Fragment>;
        }
    }
}