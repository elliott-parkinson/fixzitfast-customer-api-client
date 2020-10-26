import Dependencies, { Service } from "typedi";

import * as React from "react";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

import { 
    Fragment,
    Button,
    Header, NewLine, Paragraph,
    Row, Column
} from "../../../../Theme";


export namespace OrderSummary
{
    export interface IViewProps
    {
        service?: any;
        location?: any;

        total?: string;

        onChangeService?: Function;
        onChangeLocation?: Function;
    }

    @observer
    export class Component extends React.Component<IViewProps>
    {
        @observable Router: any;
        @observable BookingStore: any;
        @observable Booking: any;

        componentDidMount()
        {
            this.Router = Dependencies.of("store").get<any>("routes");
            this.BookingStore =  Dependencies.of("fixzitfast-customer-data-store").get<any>("bookings");

            this.BookingStore.InProgress.Load();
            this.Booking = this.BookingStore.InProgress;
        }


        render() {
            return <div className="summary-area">
                <Header size="xs">Your Order Summary</Header>

                { this.Booking?.Service.Name != "" && <Fragment>
                    <Row className="summary-header">
                        <Column xs={7}>
                            <Header>
                                Service Summary
                            </Header>
                        </Column>
                        <Column xs={5} className="text-right">
                            <Button color="link" onClick={ e => this.Router.Go("/booking/create/contact") }>
                                Change
                            </Button>
                        </Column>
                    </Row>
                    <Paragraph>{this.Booking?.Service.CategoryName}, {this.Booking?.Service.Name}</Paragraph>
                    <Paragraph className="note">Please be aware that you will be charged until the job is completed.</Paragraph>
                    <NewLine />
                    <NewLine />
                </Fragment> }
                
                { this.Booking?.Details.Description != "" && <Fragment>
                    <Row className="summary-header">
                        <Column xs={7}>
                            <Header>
                                Booking Details
                            </Header>
                        </Column>
                        <Column xs={5} className="text-right">
                            <Button color="link" onClick={ e => this.Router.Go("/booking/create/details") }>
                                Change
                            </Button>
                        </Column>
                    </Row>
                    <Paragraph>{this.Booking?.Details.Description}</Paragraph>
                    <NewLine />
                    <NewLine />
                </Fragment> }

                { this.Booking?.Location.Line1 != "" && <Fragment>
                    <Row className="summary-header">
                        <Column xs={7}>
                            <Header>
                                Location
                            </Header>
                        </Column>
                        <Column xs={5} className="text-right">
                            <Button color="link" onClick={ e => this.Router.Go("/booking/create/location") }>
                                Change
                            </Button>
                        </Column>
                    </Row>
                    <Paragraph><i className="fas fa-map-marker-alt" style={{ color: "#ff9505" }}/> &nbsp; { [this.Booking?.Location.Line1, this.Booking?.Location.Line2, this.Booking?.Location.Line3, this.Booking?.Location.Town, this.Booking?.Location.County, this.Booking?.Location.Postcode].filter(n => n).join(", ") }</Paragraph>
                    <NewLine />
                    <NewLine />
                </Fragment> }

                { this.Booking?.Time.Date && this.Booking?.Time.TimeSlotText != "" && <Fragment>
                    <Row className="summary-header">
                        <Column xs={7}>
                            <Header>
                                Date and Time
                            </Header>
                        </Column>
                        <Column xs={5} className="text-right">
                            <Button color="link" onClick={ e => this.Router.Go("/booking/create/times") }>
                                Change
                            </Button>
                        </Column>
                    </Row>
                    <Paragraph><i className="fas fa-calendar-alt" style={{ color: "#ff9505" }}/> &nbsp; { this.Booking?.Time.TimeSlotText }</Paragraph>
                    <NewLine />
                    <NewLine />
                </Fragment> }

                { this.Booking?.Contact.Name != "" && <Fragment>
                    <Row className="summary-header">
                        <Column xs={7}>
                            <Header>
                                Contact Details
                            </Header>
                        </Column>
                        <Column xs={5} className="text-right">
                            <Button color="link" onClick={ e => this.Router.Go("/booking/create/contact") }>
                                Change
                            </Button>
                        </Column>
                    </Row>
                    <Paragraph><i className="fas fa-user" style={{ color: "#ff9505" }}/> &nbsp; {this.Booking?.Contact.Name}</Paragraph>
                    <Paragraph><i className="fas fa-envelope" style={{ color: "#ff9505" }}/> &nbsp; {this.Booking?.Contact.Email}</Paragraph>
                    <Paragraph><i className="fas fa-phone" style={{ color: "#ff9505" }}/> &nbsp; {this.Booking?.Contact.PhoneNumber}</Paragraph>
                    <NewLine />
                    <NewLine />
                </Fragment> }

                { true && this.Booking?.Time.TimeSlotText != "" && <Fragment>
                    <hr />
                    <Row className="summary-header">
                        <Column xs={7}>
                            <Paragraph>
                                Total Amount
                            </Paragraph>
                        </Column>
                        <Column xs={5} className="text-right">
                            <Paragraph className="text-right" style={{ color: "#ff9505" }}>
                                £100
                            </Paragraph>
                        </Column>
                    </Row>
                </Fragment> }
            </div>;
        }
    }
}