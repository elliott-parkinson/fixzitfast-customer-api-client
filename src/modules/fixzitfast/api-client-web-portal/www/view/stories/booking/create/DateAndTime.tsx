import * as React from "react";
import { Redirect } from "react-router-dom";
import Dependencies, { Service } from "typedi";

import BookingSelector from 'react-booking-selector';

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
        @observable Date = new Date;
        @observable Agree = false;
        
        @observable Errors = [];

        @action SetTimeslot(date: any)
        {
            this.Date = new Date(Date.parse(date));
        }
        
        @action async Submit()
        {
            let bookingStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("bookings");
            bookingStore.InProgress.Time.Set(this.Date, this.Agree);
            bookingStore.InProgress.Store();

            let router = Dependencies.of("store").get<any>("routes");
            router.Go("/booking/create/paymentdetails");
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
                    <Column md={9} xs={12}>
                        <CreateBookingStepper.Component position={2} onBack={e => this.Router.Back()}/>

                        <Card className="animate__animated animate__fadeIn animate__delay-02s">
                            <CardBody>
                                <Header size="sm">Select a date and time</Header>
                                <NewLine />
                                <Form onSubmit={e => { e.preventDefault(); this.Form.Submit(); return false; }}>
                                    <BookingSelector
                                        selection={[]}
                                        blocked={[
                                            new Date("Thu Oct 22 2020 08:00:00 GMT+0100"),
                                            new Date("Thu Oct 22 2020 09:00:00 GMT+0100"),
                                            new Date("Thu Oct 22 2020 10:00:00 GMT+0100"),
                                            new Date("Fri Oct 23 2020 16:00:00 GMT+0100"),
                                            new Date("Fri Oct 23 2020 17:00:00 GMT+0100"),
                                            new Date("Fri Oct 23 2020 18:00:00 GMT+0100"),

                                            new Date("Tue Oct 27 2020 16:00:00 GMT+0100"),
                                            new Date("Tue Oct 27 2020 17:00:00 GMT+0100"),
                                            new Date("Tue Oct 27 2020 18:00:00 GMT+0100"),

                                            new Date("Wed Oct 28 2020 16:00:00 GMT+0100"),
                                            new Date("Wed Oct 28 2020 17:00:00 GMT+0100"),
                                            new Date("Wed Oct 28 2020 18:00:00 GMT+0100"),
                                        ]}
                                        numDays={14}
                                        minTime={8}
                                        maxTime={18}
                                        unselectedColor="#ff9505"
                                        selectedColor="#e6e9f0"
                                        onChange={e => this.Form.SetTimeslot(e)}
                                    />

                                    <NewLine />

                                    <Row>
                                        <Column className="text-center">
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
                    <Column md={3} xs={12} className="d-none d-lg-block">
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