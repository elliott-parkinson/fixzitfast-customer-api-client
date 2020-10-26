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
import Cleave from 'cleave.js/react';

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";
import { PaymentStatus } from "../../../../../../react-components";
import { OrderSummary } from "./components/OrderSummary";
import { CreateBookingStepper } from "./components/CreateBookingStepper";

export namespace PaymentDetails
{
    export class PaymentDetailsForm
    {
        @observable CardType = "";
        @observable CardName = "";
        @observable CardNumber = "";
        @observable Expiry = "";
        @observable CCV = "";
        
        @observable Errors = [];

        @action async Submit()
        {
            let bookingStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("bookings");
            bookingStore.SetPaymentCard(null, this.CardType, this.CardName, this.CardNumber, this.Expiry, this.CCV);
        }

    }
    @observer
    export class Screen extends React.Component<any>
    {
        @observable Router: any;
        @observable BookingStore: any;
        @observable Status: string = "none";

        @observable Form = new PaymentDetailsForm;

        componentDidMount()
        {
            this.Router =  Dependencies.of("store").get<any>("routes");
            this.BookingStore =  Dependencies.of("fixzitfast-customer-data-store").get<any>("bookings");
        }

    
        render() {
            return <Container>
                <Row>
                    <Column md={9} xs={12}>
                        <CreateBookingStepper.Component position={2} onBack={e => this.Router.Back()}/>

                        <Card className="animate__animated animate__fadeIn animate__delay-02s">
                            <CardBody>
                                <Header size="sm">Choose a payment option</Header>
                                <Form onSubmit={e => { e.preventDefault(); this.Form.Submit(); return false; }}>

                                    <Header size="md">Add Card</Header>

                                    <FormGroup>
                                        <Label>
                                            Card Type:
                                        </Label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <Button disabled>
                                                    <i className="fas fa-credit-card" />
                                                </Button>
                                            </InputGroupAddon>

                                            <Input type="select" onChange={e => this.Form.CardType = e.target.value}>
                                                <option value="visadebit">Visa</option>
                                                <option value="mastercard">Mastercard</option>
                                            </Input>
                                        </InputGroup>
                                    </FormGroup>

                                    <FormGroup tag="fieldset">
                                        <Input type="text" autoComplete="cc-name" required placeholder="The the card holders Name" value={this.Form.CardName} onChange={ e => this.Form.CardName = e.target.value } />{' '}
                                    </FormGroup>

                                    <FormGroup tag="fieldset">
                                        <Cleave
                                            className="form-control"
                                            placeholder="Type card number"
                                            autoComplete="cc-number" 
                                            required
                                            options={{ creditCard: true }}
                                            value={this.Form.CardNumber} onChange={ e => this.Form.CardNumber = e.target.value }
                                        />{' '}
                                    </FormGroup>
                                    <Row>
                                        <Column xs={4} md={3}>
                                            <FormGroup tag="fieldset">
                                                <Cleave
                                                    className="form-control"
                                                    placeholder="MM/YY"
                                                    autoComplete="cc-number"
                                                    required
                                                    options={{ date: true, datePattern: ['m', 'y'] }}
                                                    value={this.Form.Expiry} onChange={ e => this.Form.Expiry = e.target.value }
                                                />{' '}
                                            </FormGroup>
                                        </Column>
                                        <Column xs={4} md={3}>
                                            <FormGroup tag="fieldset">
                                                <Input type="tel" maxLength="3" autoComplete="cc-csc" required placeholder="CCV" value={this.Form.CCV} onChange={ e => this.Form.CCV = e.target.value } />{' '}
                                            </FormGroup>
                                        </Column>
                                    </Row>

                                    <Button color="primary" block>Confirm Payment</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Column>
                    <Column md={3} xs={12}>
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