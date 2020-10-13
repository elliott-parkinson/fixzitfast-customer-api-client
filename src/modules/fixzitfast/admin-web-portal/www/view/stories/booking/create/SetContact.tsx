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
            let bookingStore = Dependencies.of("fixzitfast-customer-store").get<any>("bookings");
            bookingStore.SetBookingContactDetails(this.Name, this.PhoneNumber, this.Email);
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
            this.BookingStore =  Dependencies.of("fixzitfast-customer-store").get<any>("bookings");
        }
    
        render() {
            return <Container>
                {/* this.BookingStore && this.BookingStore.CurrentBooking == undefined && <Redirect to={"/booking/create"} /> */}

                <Row>
                    <Column md={9} x={12}>
                        <CreateBookingStepper.Component position={1} onBack={e => this.Router.Back()}/>

                        <Card className="animate__animated animate__fadeIn animate__delay-02s">
                            <CardBody>
                                <Header size="sm">Contact Details</Header>
                                <Form onSubmit={e => { e.preventDefault(); this.Form.Submit(); return false; }}>
     
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
                                        <Input type="text" required placeholder="eg: 07959 484858" value={this.Form.PhoneNumber} onChange={ e => this.Form.PhoneNumber = e.target.value } />{' '}
                                    </FormGroup>

                                    <FormGroup tag="fieldset">
                                        <Label>
                                            Email (Required)
                                        </Label>
                                        <Input type="text" required placeholder="Enter Email" value={this.Form.Email} onChange={ e => this.Form.Email = e.target.value } />{' '}
                                    </FormGroup>

                                    <Button color="primary" block>See Pricing</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Column>
                    <Column md={3} x={12}>
                        <OrderSummary.Component 
                            service={this.BookingStore?.CurrentBooking?.Service}
                            location={this.BookingStore?.CurrentBooking?.Location}
                        />
                    </Column>
                </Row>
            </Container>;
        }
    }
}