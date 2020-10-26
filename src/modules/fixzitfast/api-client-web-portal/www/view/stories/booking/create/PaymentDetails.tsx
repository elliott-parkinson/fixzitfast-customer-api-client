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
import { AuthenticationModal } from "../../../components/AuthenticationModal";
import { RequireAuthentication } from "../../../components/RequireAuthentication";

export namespace PaymentDetails
{
    export class PaymentDetailsForm
    {
        @observable CardType = "";
        @observable CardName = "";
        @observable CardNumber = "";
        @observable Expiry = "";
        @observable CCV = "";

        @observable Line1 = "";
        @observable Line2 = "";
        @observable Line3 = "";
        @observable Town = "";
        @observable County = "";
        @observable Postcode = "";
        
        @observable Errors = [];

        @action async Submit()
        {
            let bookingStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("bookings");
            bookingStore.InProgress.SetPaymentCard(null, this.CardType, this.CardName, this.CardNumber, this.Expiry, this.CCV);

            let router = Dependencies.of("store").get<any>("routes");
            router.Go("/booking/create/payment");
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
            Dependencies.of("store").has("site") && (Dependencies.of("store").get<any>("site").Title = "Payment Details");
            this.BookingStore =  Dependencies.of("fixzitfast-customer-data-store").get<any>("bookings");
        }

    
        render() {
            return <Fragment>
                <RequireAuthentication.Component />
                <Form className="fixzitfast-form" onSubmit={e => { e.preventDefault(); this.Form.Submit(); return false; }}>
                    <Header size="sm">Payment Details</Header>

                    {/* <Header size="md">Add Card</Header> */}

                    <FormGroup>
                        <Label>
                            Card Type:
                        </Label>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <div className="addon-icon">
                                    <i className="fas fa-credit-card" />
                                </div>
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
                    
                    <Row>
                        <Column xs={10} md={8}>
                            <FormGroup tag="fieldset">
                                <Input type="text" required placeholder="Address line 1" value={this.Form.Line1} onChange={ e => this.Form.Line1 = e.target.value } />{' '}
                            </FormGroup>
                            <FormGroup tag="fieldset">
                                <Input type="text" placeholder="Address line 2" value={this.Form.Line2} onChange={ e => this.Form.Line2 = e.target.value } />{' '}
                            </FormGroup>
                            <FormGroup tag="fieldset">
                                <Input type="text" placeholder="Address line 3" value={this.Form.Line3} onChange={ e => this.Form.Line3 = e.target.value } />{' '}
                            </FormGroup>
                            <FormGroup tag="fieldset">
                                <Input type="text" required placeholder="Town" value={this.Form.Town} onChange={ e => this.Form.Town = e.target.value } />{' '}
                            </FormGroup>
                            <FormGroup tag="fieldset">
                                <Input type="text" required placeholder="County" value={this.Form.County} onChange={ e => this.Form.County = e.target.value } />{' '}
                            </FormGroup>
                            <FormGroup tag="fieldset">
                                <Input type="text" required placeholder="Postcode" value={this.Form.Postcode} onChange={ e => this.Form.Postcode = e.target.value } />{' '}
                            </FormGroup>
                        </Column>
                        <Column xs={4} md={3}>
                        </Column>
                    </Row>

                    <Button color="primary" block>Confirm Payment</Button>
                </Form>
            </Fragment>;
        }
    }
}