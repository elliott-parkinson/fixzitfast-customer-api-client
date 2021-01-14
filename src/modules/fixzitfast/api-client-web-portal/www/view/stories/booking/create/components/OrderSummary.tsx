import Dependencies, { Service } from "typedi";

import * as React from "react";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

import { 
    Fragment,
    Button,
    Header, NewLine, Paragraph,
    Row, Column,
    Card, CardBody
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

        constructor(props) {
            super(props);

            this.Router = Dependencies.of("store").get<any>("routes");
            this.BookingStore =  Dependencies.of("fixzitfast-customer-data-store").get<any>("bookings");
        }

        componentDidMount()
        {

            this.BookingStore.InProgress.Load();
        }

        render() {
            return <div className="summary-area">
                <Card>
                    <CardBody>
                        <Header size="xs">Your order summary</Header>

                        { this.BookingStore?.InProgress?.Service.CategoryName != "" && <Fragment>
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
                            <Paragraph>{this.BookingStore?.InProgress?.Service.CategoryName} { this.BookingStore?.InProgress?.Service.Name != "" ? ", " + this.BookingStore?.InProgress?.Service.Name : ""}</Paragraph>
                            <Paragraph className="note">Please be aware that you will be charged until the job is completed.</Paragraph>
                            <NewLine />
                            <NewLine />
                        </Fragment> }
                        
                        { this.BookingStore?.InProgress?.Details.Description != "" && <Fragment>
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
                            <Paragraph>{this.BookingStore?.InProgress?.Details.Description}</Paragraph>
                            <NewLine />
                            <NewLine />
                        </Fragment> }

                        { this.BookingStore?.InProgress?.Location.Line1 != "" && <Fragment>
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
                            <Paragraph><i className="fas fa-map-marker-alt" style={{ color: "#ff9505" }}/> &nbsp; { [this.BookingStore?.InProgress?.Location.Line1, this.BookingStore?.InProgress?.Location.Line2, this.BookingStore?.InProgress?.Location.Line3, this.BookingStore?.InProgress?.Location.Town, this.BookingStore?.InProgress?.Location.County, this.BookingStore?.InProgress?.Location.Postcode].filter(n => n).join(", ") }</Paragraph>
                            <NewLine />
                            <NewLine />
                        </Fragment> }

                        { this.BookingStore?.InProgress?.Time.Date && this.BookingStore?.InProgress?.Time.TimeSlotText != "" && <Fragment>
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
                            <Paragraph><i className="fas fa-calendar-alt" style={{ color: "#ff9505" }}/> &nbsp; { this.BookingStore?.InProgress?.Time.TimeSlotText }</Paragraph>
                            <NewLine />
                            <NewLine />
                        </Fragment> }

                        { this.BookingStore?.InProgress?.Contact.Name != "" && <Fragment>
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
                            <Paragraph><i className="fas fa-user" style={{ color: "#ff9505" }}/> &nbsp; {this.BookingStore?.InProgress?.Contact.Name}</Paragraph>
                            <Paragraph><i className="fas fa-envelope" style={{ color: "#ff9505" }}/> &nbsp; {this.BookingStore?.InProgress?.Contact.Email}</Paragraph>
                            <Paragraph><i className="fas fa-phone" style={{ color: "#ff9505" }}/> &nbsp; {this.BookingStore?.InProgress?.Contact.PhoneNumber}</Paragraph>
                            <NewLine />
                            <NewLine />
                        </Fragment> }

                        { true && this.BookingStore?.InProgress?.Time.TimeSlotText != "" && <Fragment>
                            <hr />
                            <Row className="summary-header">
                                <Column xs={12}>
                                    <Header size="md">
                                        Total Amount
                                    </Header>
                                </Column>
                                <Column xs={12} className="text-left">
                                    <Header size="sm" className="text-left" style={{ color: "#ff9505" }}>
                                        £100
                                    </Header>
                                </Column>
                            </Row>
                        </Fragment> }
                    </CardBody>
                </Card>
            </div>;
        }
    }
}