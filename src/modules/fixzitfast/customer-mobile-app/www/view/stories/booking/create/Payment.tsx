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

export namespace Payment
{
    export class PaymentForm
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
            bookingStore.SetBookingContactDetails(this.Name, this.PhoneNumber, this.Email);
        }

    }
    @observer
    export class Screen extends React.Component<any>
    {
        @observable Router: any;
        @observable BookingStore: any;
        @observable Status: string = "none";

        @observable Form = new PaymentForm;

        componentDidMount()
        {
            this.Router =  Dependencies.of("store").get<any>("routes");
            this.BookingStore =  Dependencies.of("fixzitfast-customer-data-store").get<any>("bookings");
        }

        @action EditPaymentDetails()
        {
            this.Status = "none";

            this.Router.Go("./paymentdetails");
        }

        @action ProcessPayment()
        {
            this.Status = "processing";

            setTimeout(() => {
                this.Status = "failed";
            }, 4000);
        }
    
        render() {
            return <Container>
                <Row >
                    <Column md={(this.Status == "none" || this.Status == "failed") ? 9 : 12} xs={12}className="p-5">
                        { (this.Status == "none" || this.Status == "failed") &&
                            <CreateBookingStepper.Component position={3} onBack={e => this.Router.Back()}/>
                        }

                        { this.Status == "processing" || this.Status == "done" ?
                            <Block className="p-5">
                                <PaymentStatus.Component status={this.Status} />
                            </Block>
                        :
                            <Block>
                                { this.Status == "failed" &&
                                    <Block className="p-5">
                                        <PaymentStatus.Component status={this.Status} />
                                    </Block>
                                }
                                <Block className="text-center">
                                    { this.Status == "failed" ?
                                        <Paragraph>Card payment failed, please check your bank details before trying again.</Paragraph>
                                    :
                                        <Paragraph>Your card will be charged if you proceed. Please confirm your order and payment amount before proceeding.</Paragraph>
                                    }
                                    { this.Status == "failed" &&
                                        <Fragment>
                                            <Button onClick={e => this.EditPaymentDetails()}>Edit Payment Details</Button>
                                            &nbsp;
                                        </Fragment>
                                    }
                                    <Button onClick={e => this.ProcessPayment()}>Process Payment</Button>
                                </Block>
                            </Block>
                        }
                    </Column>
                    
                    <Column md={(this.Status == "none" || this.Status == "failed") ? 3 : 0} xs={12} className={(this.Status == "none" || this.Status == "failed") ? "" : "d-none"}>
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