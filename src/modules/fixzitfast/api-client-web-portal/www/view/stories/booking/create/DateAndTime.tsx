import * as React from "react";
import { Redirect } from "react-router-dom";
import Dependencies, { Service } from "typedi";

import BookingSelector from 'react-booking-selector';

import { 
    Alert,
    AppLayout, Titlebar, Fragment,
    Badge,
    Button, Block,
    Container,
	Card, CardBody, CardHeader,
	Form, FormGroup, Input, InputGroup, InputGroupAddon, Typeahead, Label, Dropzone,
	Header, Paragraph,
	NewLine,
    Nav, NavItem, NavLink,
    Row, Column
} from "../../../Theme";

import moment from "moment";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";
import { PaymentStatus } from "../../../../../../react-components";
import { OrderSummary } from "./components/OrderSummary";
import { CreateBookingStepper } from "./components/CreateBookingStepper";

export namespace DateAndTime
{
    export class DateAndTimeForm
    {
        @observable Date = null;
        @observable Price = 100;
        @observable Agree = false;
        
        @observable Errors = [];

        @action SetTimeslot(date: any)
        {
            if (date instanceof Array)
            {
                if (date.length == 0)
                {
                    this.Date = null;
                }
                else
                {
                    this.Date = new Date(Date.parse(date[date.length-1]));
                }
            }
            else
            {
                this.Date = new Date(Date.parse(date));
            }
            if (this.Date instanceof Date && isNaN(this.Date as any))
            {
                this.Date = null;
            }
            console.log(date instanceof Array, date.length, date, this.Date);
        }
        
        @action async Submit()
        {
            console.warn(this.Date);
            if (this.Date == null)
            {
                return alert("You must selected a date to proceed.");
            }

            let bookingStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("bookings");
            bookingStore.InProgress.Time.Set(this.Date, this.Agree);
            bookingStore.InProgress.Store();

            let router = Dependencies.of("store").get<any>("routes");
            router.Go("/booking/create/contact");
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
            Dependencies.of("store").has("site") && (Dependencies.of("store").get<any>("site").Title = "Date and Time");
        }

        get BlockedDates() {
            return [
                new Date("Tue Oct 27 2020 16:00:00 GMT+0100").getTime(),
                new Date("Tue Oct 27 2020 17:00:00 GMT+0100").getTime(),
                new Date("Tue Oct 27 2020 18:00:00 GMT+0100").getTime(),

                new Date("Wed Oct 28 2020 16:00:00 GMT+0100").getTime(),
                new Date("Wed Oct 28 2020 17:00:00 GMT+0100").getTime(),
                new Date("Wed Oct 28 2020 18:00:00 GMT+0100").getTime(),
            ];
        }

        renderDateCell(time: Date, selected: boolean, refSetter: Function)
        {
            if (new Date(time.toDateString()) < new Date(new Date().toDateString()))
            {
                return <Badge color="dark" style={{ width: "100%", height: "26px", paddingTop: "7px" }}>
                    -
                </Badge>;
            }

            if (this.BlockedDates.indexOf(time.getTime()) !== -1)
            {
                return <Badge color="danger" style={{ width: "100%", height: "26px", paddingTop: "7px" }}>
                    booked
                </Badge>;
            }

            if (selected == true)
            {
                return <Badge className="selectable" color="success" style={{ width: "100%", height: "26px", paddingTop: "7px" }}>
                    <i className="fas fa-check" />
                </Badge>
            }

            return <Badge className="selectable" color="light" style={{ width: "100%", height: "26px", paddingTop: "7px" }}>
                £100
            </Badge>;
        }
    
        render() {
            return <Fragment>
                <Form className="fixzitfast-form animate__animated animate__fadeIn animate__delay-02s" onSubmit={e => { e.preventDefault(); this.Form.Submit(); return false; }}>
                    <Header size="sm">Select a date and time</Header>
                    <NewLine />
                    <BookingSelector
                        selection={[this.Form.Date]}
                        blocked={this.BlockedDates}
                        numDays={7}
                        minTime={8}
                        maxTime={18}
                        onChange={e => this.Form.SetTimeslot(e)}
                        renderDateCell={(time: Date, selected: boolean, refSetter: Function) => this.renderDateCell(time, selected, refSetter)}
                    />

                    { this.Form.Date && <Fragment>
                        <NewLine />
                        <Row>
                            <Column className="text-center">
                                <Header size="sm"><small><i className="fas fa-calendar" style={{ color: "#ff9505" }} /> &nbsp; { moment(this.Form.Date).format('MMMM, Do YYYY') }</small></Header>
                                <Header size="sm"><small><i className="fas fa-clock" style={{ color: "#ff9505" }} /> &nbsp; { moment(this.Form.Date).format('h:mm A') }</small></Header>
                                <NewLine />
                                <Header size="md"><i className="fas fa-pound-sign" /> { this.Form.Price }</Header>
                            </Column>
                        </Row>
                    </Fragment> }


                    <FormGroup tag="fieldset" className="p-4">
                        <Input type="checkbox" id="agree" required value={this.Form.Agree ? "true" : "false"} onChange={ e => this.Form.Agree = (e.target.value == "true" ? true : false) } />{' '}
                        <Label for="agree">
                            I understand this is a quote for the initial visit and that the total cost may increase if the job takes more than one hour or materials are required to complete the work.
                        </Label>
                    </FormGroup>

                    <Button color="primary" block>Confirm Time</Button>
                </Form>
            </Fragment>;
        }
    }
}