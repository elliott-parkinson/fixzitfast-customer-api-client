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
        @observable BookingStore: any;

        @observable Search: string = "";
        @observable Location: any;

        componentDidMount()
        {
            this.BookingStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("bookings");
        }

        @computed get CanGetStarted(): boolean
        {
            return this.Search == "";
        }

        @action GetStarted()
        {
            this.BookingStore.SetBookingLocation();
        }

        @action async FindLocation()
        {
            let postcode = await this.BookingStore.FindUserAddress();
            this.Search = postcode;
        }
    
        render() {
            return <Container>
                <Row>
                    <Column sm={12} md={6}>
                        <Header size="xl">Enter your location</Header>
                        <NewLine />
                        <Form className="animate__animated animate__fadeIn animate__delay-02s">
                            <FormGroup>
                                <InputGroup>
                                    <Input type="text" placeholder="Enter address or postcode here" value={this.Search} onChange={e => this.Search = e.target.value} />
                                    <InputGroupAddon addonType="prepend">
                                        <Button color="primary"  disabled={ this.CanGetStarted != true ? undefined : true } onClick={e => { e.preventDefault(); this.GetStarted(); return false; }}>Get started</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                        </Form>
                        
                        <NewLine />

                        <Card className="animate__animated animate__fadeIn animate__delay-04s">
                            <CardBody>
                                <Header size="md">Unsure? Let us find you!</Header>
                                <NewLine />
                                <Button color="primary" block onClick={e => this.FindLocation() }>Find my location</Button>
                                <NewLine />
                                <Paragraph>Note: Your browser will ask you for permission to know your location. You will need to press allow for this feature to work.</Paragraph>
                                <Paragraph>Depending on your device this feature may not be accurate. Please verify the postcode is your own before getting your quote.</Paragraph>
                            </CardBody>
                        </Card>
                    </Column>
				<Column sm={12} md={6} className="full-center animate__animated animate__fadeInRight animate__faster d-none d-lg-inline-flex">
					<img className="p-0 m-0" src={require("../../../../../assets/images/bookings-bg.png")} />
				</Column>
                </Row>
            </Container>;
        }
    }
}