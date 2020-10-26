import * as React from "react";
import Dependencies, { Service } from "typedi";

import { 
    Alert,
	AppLayout, Titlebar, Fragment,
    Button, Block,
    Container,
	Card, CardBody, CardHeader,
	Form, FormGroup, Input, InputGroup, InputGroupAddon, Typeahead,
	Header, Paragraph,
	NewLine,
    Nav, NavItem, NavLink,
    Row, Column
} from "../../../Theme";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";
import { ServiceCard, ServiceIcon } from "../../../../../../react-components";

export namespace SelectLocation
{
    @observer
    export class Screen extends React.Component<any>
    {
        @observable Router: any;
        @observable BookingStore: any;
        @observable LocationStore: any;

        @observable Error: string = "";
        @observable Search: string = "";
        @observable Location: any;

        componentDidMount()
        {
            this.Router =  Dependencies.of("store").get<any>("routes");
            Dependencies.of("store").has("site") && (Dependencies.of("store").get<any>("site").Title = "Set location");
            this.BookingStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("bookings");

            if (Dependencies.of("fixzitfast-customer-data-store").has<any>("location"))
            {
                this.LocationStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("location");
            }
        }

        @computed get CanGetStarted(): boolean
        {
            return this.Search == "";
        }

        @action async GetStarted()
        {

            if (this.Search.toUpperCase().indexOf("EH") === -1)
            {
                this.Error = "Sorry we are not in your area right now, please come back another time.";
            }
            else
            {
                let address = await this.LocationStore.GetAddressesFromPostcode(this.Search);
                this.Error = "";
                this.BookingStore.InProgress.Location.Set(address[0].Line1, address[0].Line2, address[0].Line3, address[0].Town, address[0].County, address[0].Postcode);
                this.BookingStore?.InProgress.Store();
                this.Router.Go("/booking/create/times");
            }
        }

        @action async FindLocation()
        {
            let postcode = await this.LocationStore.FindUserAddress();
            this.Search = postcode;
        }
    
        render() {
            return <Fragment>
                <Form className="fixzitfast-form animate__animated animate__fadeIn animate__delay-02s">
                    <Header size="md">Enter your location</Header>
                    <NewLine />
                    <FormGroup>
                        <InputGroup>
                            <Input type="text" placeholder="Enter address or postcode here" value={this.Search} onChange={e => this.Search = e.target.value} />
                            <InputGroupAddon addonType="prepend">
                                <Button color="primary"  disabled={ this.CanGetStarted != true ? undefined : true } onClick={e => { e.preventDefault(); this.GetStarted(); return false; }}>Get started</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>

                    { this.Error != "" && <FormGroup>
                        <Alert color="danger">
                            <i className="fas fa-exclamation" /> &nbsp; Sorry we are not in your area right now, please come back another time.
                        </Alert>
                    </FormGroup> }
                
                <NewLine />
                </Form>
                
                <Form className="fixzitfast-form animate__animated animate__fadeIn animate__delay-02s">
                    <Header size="md">Unsure? Let us find you!</Header>
                    <NewLine />
                    <Button color="primary" block onClick={e => this.FindLocation() }>Find my location</Button>
                    <NewLine />
                    <Paragraph>Note: Your browser will ask you for permission to know your location. You will need to press allow for this feature to work.</Paragraph>
                    <Paragraph>Depending on your device this feature may not be accurate. Please verify the postcode is your own before getting your quote.</Paragraph>
                </Form>
            </Fragment>;
        }
    }
}