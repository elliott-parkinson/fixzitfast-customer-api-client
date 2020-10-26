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

export namespace Upcoming
{
   
    @observer
    export class Screen extends React.Component<any>
    {
        @observable Router: any;
        @observable BookingStore: any;
        @observable ServicesStore: any;
        @observable Status: string = "none";

        componentDidMount()
        {
            this.Router =  Dependencies.of("store").get<any>("routes");
            this.BookingStore =  Dependencies.of("fixzitfast-customer-data-store").get<any>("bookings");

            if (Dependencies.of("fixzitfast-customer-data-store").has<any>("services"))
            {
                this.ServicesStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("services");
            }
        }

        @action MakeABooking()
        {
            this.Router.Go("/booking/create/services");
        }


        render() {
            return <Fragment>
                <Card className="animate__animated animate__fadeIn animate__delay-02s">
                    <CardBody className="p-4 m-4 full-center">
                        <img className="p-4 m-0" style={{maxWidth: "260px"}} src={require("../../../../../assets/images/icons/illustration-2.svg")} />
                        <NewLine />
                        <NewLine />
                        <Paragraph className="text-center text-lighter" style={{maxWidth: "260px", marginLeft: "auto", marginRight: "auto"}}>
                            No upcoming bookings.
                            <NewLine />
                            All the bookings you make will be shown here.
                        </Paragraph>
                        <NewLine />

                        { this.ServicesStore != undefined && 
                            <Button block color="primary" onClick={e => this.MakeABooking()}>Make a booking</Button>
                        }
                    </CardBody>
                </Card>
            </Fragment>;
        }
    }
}