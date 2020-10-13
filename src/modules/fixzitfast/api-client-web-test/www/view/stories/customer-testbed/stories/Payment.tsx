import * as React from "react";
import Dependencies from "typedi";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

import { 
    Alert, Fragment,
    Container,
    Form, FormGroup, Input, InputGroup, Label,
    NewLine,
} from "../../../Theme";

import { ApiResponseData } from "../../../model/ApiResponseData";
import { TestCard } from "../../../components/TestCard";

export namespace Payment
{
    class AddCardDetailsForm
    {
        @observable ResponseData = new ApiResponseData;

        @observable BookingId = -1;
        @observable UserId = -1;
        @observable CardName = "";
        @observable CardNumber = "";
        @observable CardExpiry = "";
        @observable Cvc = "";

        @action async Submit()
        {
            this.ResponseData.Reset();
            this.ResponseData.Loading = true;

            
            const authStore =  Dependencies.of("store").get<any>("auth");

            let response = await this.ResponseData.ProcessFor(

                i => apiStore.Payment.AddCardDetails(this.BookingId, this.UserId, this.CardName, this.CardNumber, this.CardExpiry,this.Cvc)
            );
        }
    }

    class UpdateCardDetailsForm
    {
        @observable ResponseData = new ApiResponseData;

        @observable BookingId = -1;
        @observable UserId = -1;
        @observable CardName = "";
        @observable CardNumber = "";
        @observable CardExpiry = "";
        @observable Cvc = "";

        @action async Submit()
        {
            this.ResponseData.Reset();
            this.ResponseData.Loading = true;

            
            const authStore =  Dependencies.of("store").get<any>("auth");

            let response = await this.ResponseData.ProcessFor(

                i => apiStore.Payment.UpdateCardDetails(this.BookingId, this.UserId, this.CardName, this.CardNumber, this.CardExpiry,this.Cvc)
            );
        }
    }

    class ProcessCardDetailsForm
    {
        @observable ResponseData = new ApiResponseData;

        @observable BookingId = -1;
        @observable UserId = -1;
        @observable CardName = "";
        @observable CardNumber = "";
        @observable CardExpiry = "";
        @observable Cvc = "";

        @action async Submit()
        {
            this.ResponseData.Reset();
            this.ResponseData.Loading = true;

            
            const authStore =  Dependencies.of("store").get<any>("auth");

            let response = await this.ResponseData.ProcessFor(

                i => apiStore.Payment.ProcessCardDetails(this.BookingId, this.UserId, this.CardName, this.CardNumber, this.CardExpiry,this.Cvc)
            );
        }
    }

    @observer
    export class Pane extends React.Component<any>
    {
        @observable AddCardDetails = new AddCardDetailsForm;
        @observable UpdateCardDetails = new UpdateCardDetailsForm;
        @observable ProcessCardDetails = new ProcessCardDetailsForm;


        componentDidMount()
        {
            Dependencies.of("store").get<any>("site").Title = "TestBed - Payment";
        }
    
        render() {
            return <Container>
                <TestCard.Component
                    title="Add Card Details"
                    form={this.AddCardDetails}

                    formElements={ <Fragment>
                        <FormGroup>
                            <Label>Booking ID</Label>
                            <Input type="number" value={this.AddCardDetails.BookingId} onChange={e => this.AddCardDetails.BookingId = parseInt(e.target.value)}  />
                        </FormGroup>
                        <FormGroup>
                            <Label>User ID</Label>
                            <Input type="number" value={this.AddCardDetails.UserId} onChange={e => this.AddCardDetails.UserId = parseInt(e.target.value)}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Name on Card" type="text" value={this.AddCardDetails.CardName} onChange={e => this.AddCardDetails.CardName = e.target.value}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Card Number" type="text" value={this.AddCardDetails.CardNumber} onChange={e => this.AddCardDetails.CardNumber = e.target.value}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Expiry Date - eg: " type="text" value={this.AddCardDetails.CardExpiry} onChange={e => this.AddCardDetails.CardExpiry = e.target.value}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Cvc" type="number" value={this.AddCardDetails.Cvc} onChange={e => this.AddCardDetails.Cvc = e.target.value}  max={999}/>
                        </FormGroup>
                    </Fragment>}
                />
                <NewLine />

                <TestCard.Component
                    title="Update Card Details"
                    form={this.UpdateCardDetails}

                    formElements={ <Fragment>
                        <FormGroup>
                            <Label>Booking ID</Label>
                            <Input type="number" value={this.UpdateCardDetails.BookingId} onChange={e => this.UpdateCardDetails.BookingId = parseInt(e.target.value)}  />
                        </FormGroup>
                        <FormGroup>
                            <Label>User ID</Label>
                            <Input type="number" value={this.UpdateCardDetails.UserId} onChange={e => this.UpdateCardDetails.UserId = parseInt(e.target.value)}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Name on Card" type="text" value={this.UpdateCardDetails.CardName} onChange={e => this.UpdateCardDetails.CardName = e.target.value}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Card Number" type="text" value={this.UpdateCardDetails.CardNumber} onChange={e => this.UpdateCardDetails.CardNumber = e.target.value}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Expiry Date - eg: " type="text" value={this.UpdateCardDetails.CardExpiry} onChange={e => this.UpdateCardDetails.CardExpiry = e.target.value}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Cvc" type="number" value={this.UpdateCardDetails.Cvc} onChange={e => this.UpdateCardDetails.Cvc = e.target.value}  max={999}/>
                        </FormGroup>
                    </Fragment>}
                />
                <NewLine />

                <TestCard.Component
                    title="Process Card Details"
                    form={this.ProcessCardDetails}

                    formElements={ <Fragment>
                        <FormGroup>
                            <Label>Booking ID</Label>
                            <Input type="number" value={this.ProcessCardDetails.BookingId} onChange={e => this.ProcessCardDetails.BookingId = parseInt(e.target.value)}  />
                        </FormGroup>
                        <FormGroup>
                            <Label>User ID</Label>
                            <Input type="number" value={this.ProcessCardDetails.UserId} onChange={e => this.ProcessCardDetails.UserId = parseInt(e.target.value)}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Name on Card" type="text" value={this.ProcessCardDetails.CardName} onChange={e => this.ProcessCardDetails.CardName = e.target.value}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Card Number" type="text" value={this.ProcessCardDetails.CardNumber} onChange={e => this.ProcessCardDetails.CardNumber = e.target.value}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Expiry Date - eg: " type="text" value={this.ProcessCardDetails.CardExpiry} onChange={e => this.ProcessCardDetails.CardExpiry = e.target.value}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Cvc" type="number" value={this.ProcessCardDetails.Cvc} onChange={e => this.ProcessCardDetails.Cvc = e.target.value}  max={999}/>
                        </FormGroup>
                    </Fragment>}
                />
                <NewLine />
            </Container>;
        }
    }
}