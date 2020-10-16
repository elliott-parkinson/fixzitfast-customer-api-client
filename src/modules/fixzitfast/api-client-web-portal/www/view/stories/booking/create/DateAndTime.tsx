import * as React from "react";
import { Redirect } from "react-router-dom";
import Dependencies, { Service } from "typedi";

import { 
    Alert,
	AppLayout, Titlebar, Fragment,
    Button, Block,
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
import { PaymentStatus } from "../../../../../../react-components";
import { OrderSummary } from "./components/OrderSummary";
import { CreateBookingStepper } from "./components/CreateBookingStepper";

export namespace DateAndTime
{
    export class DateAndTimeForm
    {
        @observable Day = "";
        @observable HourBlock = "";
        @observable Agree = false;
        
        @observable Errors = [];

        @action SetName(name: string)
        {
            this.Name = name;
        }
        
        @action async Submit()
        {
            let bookingStore = Dependencies.of("fixzitfast-customer-store").get<any>("bookings");
            bookingStore.SetTimeDetails(this.Day, this.HourBlock, this.Agree);
        }

    }
    @observer
    export class Screen extends React.Component<any>
    {
        @observable Router: any;
        @observable BookingStore: any;
        @observable Status: string = "none";

        @observable Form = new DateAndTimeForm;

        componentDidMount()
        {
            this.Router =  Dependencies.of("store").get<any>("routes");
        }

    
        render() {
            return <Container>
                <Row>
                    <Column md={9} x={12}>
                        <CreateBookingStepper.Component position={2} onBack={e => this.Router.Back()}/>

                        <Card className="animate__animated animate__fadeIn animate__delay-02s">
                            <CardBody>
                                <Header size="sm">Select a date and time</Header>
                                <Form onSubmit={e => { e.preventDefault(); this.Form.Submit(); return false; }}>

                                    <Row>
                                        <Column lg={6} md={5} xs={12}>
                                            <FormGroup>
                                                <Input type="select" onChange={e => this.Form.Day = e.target.value.toString()}>
                                                    <option value="1">Oct 14th</option>
                                                    <option value="2">Oct 15th</option>
                                                    <option value="3">Oct 16th</option>
                                                    <option value="4">Oct 17th</option>
                                                    <option value="5">Oct 18th</option>
                                                    <option value="6">Oct 19th</option>
                                                    <option value="7">Oct 20th</option>
                                                </Input>
                                            </FormGroup>
                                        </Column>
                                        <Column lg={4} md={4} xs={7}>
                                            <FormGroup>
                                                <Input type="select" onChange={e => this.Form.HourBlock = e.target.value.toString()}>
                                                    <option value="1">8 am - 10 am</option>
                                                    <option value="2">9 am - 11 am</option>
                                                    <option value="3" disabled>10 am - 12 pm (fully booked)</option>
                                                    <option value="4" disabled>11 am - 1 pm (fully booked)</option>
                                                    <option value="5">12 pm - 2 pm</option>
                                                    <option value="6">1 pm - 3 pm</option>
                                                    <option value="7" disabled>2 pm - 4 pm (fully booked)</option>
                                                    <option value="8">3 pm - 5 pm</option>
                                                    <option value="9">4 pm - 6 pm</option>
                                                </Input>
                                            </FormGroup>
                                        </Column>
                                        <Column lg={2} md={3} xs={5}>
                                            <Button disabled block>£100</Button>
                                        </Column>
                                    </Row>

                                    <FormGroup tag="fieldset" className="p-4">
                                        <Input type="checkbox" id="agree" required value={this.Form.Agree ? "true" : "false"} onChange={ e => this.Form.Agree = (e.target.value == "true" ? true : false) } />{' '}
                                        <Label for="agree">
                                            I understand this is a quote for the initial visit and that the total cost may increase if the job takes more than one hour or materials are required to complete the work.
                                        </Label>
                                    </FormGroup>

                                    <Button color="primary" block>Go to Payment</Button>
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