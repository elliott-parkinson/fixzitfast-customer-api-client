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
        @observable Status: string = "none";

        componentDidMount()
        {
            this.Router =  Dependencies.of("store").get<any>("routes");
            this.BookingStore =  Dependencies.of("fixzitfast-customer-store").get<any>("bookings");
        }

        @action MakeABooking()
        {
            this.Router.Go("/booking/create/services");
        }


        render() {
            return <Container>
                <Card className="animate__animated animate__fadeIn animate__delay-02s">
                    <CardBody className="p-4 m-4 text-center">
                        <Header size="xl">
                            <i className="fas fa-tools" />
                        </Header>
                            <NewLine />
                        <Paragraph className="text-center">
                            No upcoming bookings.
                            <NewLine />
                            All the bookings you make will be shown here.
                        </Paragraph>
                        <NewLine />
                        <Button block onClick={e => this.MakeABooking()}>Make a booking</Button>
                    </CardBody>
                </Card>
            </Container>;
        }
    }
}