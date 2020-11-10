import * as React from "react";
import Dependencies, { Service } from "typedi";

import { 
    Alert,
	AppLayout, Titlebar, Fragment,
    Button, Block,
    Container,
	Card, CardBody, CardHeader,
	Form, FormGroup, Input, InputGroup, InputGroupAddon, Typeahead, Label, 
	Header, Paragraph,
	NewLine,
    Nav, NavItem, NavLink,
    Row, Column
} from "../../../Theme";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";
import { ServiceCard, ServiceIcon } from "../../../../../../react-components";

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
        @observable LocationStore: any;

        @observable Error: string = "";
        @observable Search: string = "";
        @observable Location: any;

        @observable Form = new ContactForm;

        componentDidMount()
        {
            this.Router =  Dependencies.of("store").get<any>("routes");
            Dependencies.of("store").has("site") && (Dependencies.of("store").get<any>("site").Title = "Set location");
            this.BookingStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("bookings");

            if (Dependencies.of("fixzitfast-customer-data-store").has<any>("location"))
            {
                this.LocationStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("location");
            }

            let details = this.BookingStore.InProgress.Contact.Get();

            this.Form.Name = details.Name;
            this.Form.PhoneNumber = details.PhoneNumber;
            this.Form.Email = details.Email;
        }

        @computed get CanGetStarted(): boolean
        {
            return this.Search == "";
        }

        @action async GetStarted()
        {

            if (this.Search.toUpperCase().indexOf("EH") === -1)
            {
                this.Error = "Sorry we are not in your area right now, please come back another time.";
            }
            else
            {
                let address = await this.LocationStore.GetAddressesFromPostcode(this.Search);
                this.Error = "";
                this.BookingStore.InProgress.Location.Set(address[0].Line1, address[0].Line2, address[0].Line3, address[0].Town, address[0].County, address[0].Postcode);
                this.BookingStore?.InProgress.Store();
                this.Router.Go("/booking/create/times");
            }
        }

        @action async FindLocation()
        {
            let postcode = await this.LocationStore.FindUserAddress();
            this.Search = postcode;
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
                    <NewLine />
                    <NewLine />

                    <Header size="sm">Enter your location</Header>
                    <FormGroup>
                        <InputGroup>
                            <Input type="text" required placeholder="Enter address or postcode here" value={this.Search} onChange={e => this.Search = e.target.value} />
                            <InputGroupAddon addonType="prepend">
                                <Button color="primary" onClick={e => { e.preventDefault(); this.FindLocation(); return false; }}>Find me</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>

                    { this.Error != "" && <FormGroup>
                        <Alert color="danger">
                            <i className="fas fa-exclamation" /> &nbsp; Sorry we are not in your area right now, please come back another time.
                        </Alert>
                    </FormGroup> }
                    
                    <Alert color="primary">
                        <Paragraph><i className="fas fa-sticky-note" /> &nbsp; <strong>Note</strong></Paragraph>
                        <Paragraph><small>Your browser will ask you for permission to know your location. You will need to press allow for this feature to work.</small></Paragraph>
                        <Paragraph><small>Depending on your device this feature may not be accurate. Please verify the postcode is your own before getting your quote.</small></Paragraph>
                    </Alert>
                    <NewLine />
                    <NewLine />

                    <Button color="primary" block size="lg">Go to Payment</Button>
                </Form>
            </Fragment>;
        }
    }
}