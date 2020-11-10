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
import { observable, computed, action, toJS } from "mobx";
import { DateSelector } from "./components/DateSelector";

export namespace DateAndTime
{
    export class DateAndTimeForm
    {
        @observable Date = new Date;
        @observable Price = 100;
        @observable Agree = false;
        
        @observable Errors = [];

        @action SetTimeslot(date: any)
        {
            this.Date = date;
        }
        
        @action async Submit()
        {
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

            this.BookingStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("bookings");
            this.BookingStore.InProgress.Load();

            let time = this.BookingStore.InProgress?.Time.Date;
            if (!time)
            {
                time = new Date;
                time.setHours(7, 0, 0);
            }
            this.Form.Date = time;
        }

        get BlockedDates() {
            return [ ];
        }
    
        render() {
            return <Fragment>
                <Form className="fixzitfast-form animate__animated animate__fadeIn animate__delay-02s" onSubmit={e => { e.preventDefault(); this.Form.Submit(); return false; }}>
                    <Header size="sm">Select a date and time</Header>
                    <NewLine />

                    { this.Form.Date && 
                        <DateSelector.Component value={this.Form.Date} onChange={date => this.Form.SetTimeslot(date)} />
                    }

                    <FormGroup tag="fieldset" className="p-4">
                        <Input type="checkbox" id="agree" required value={this.Form.Agree ? "true" : "false"} onChange={ e => this.Form.Agree = (e.target.value == "true" ? true : false) } />{' '}
                        <Label for="agree">
                            I understand this is a quote for the initial visit and that the total cost may increase if the job takes more than one hour or materials are required to complete the work.
                        </Label>
                    </FormGroup>

                    <Button color="primary" block size="lg">Confirm Time</Button>
                </Form>
            </Fragment>;
        }
    }
}