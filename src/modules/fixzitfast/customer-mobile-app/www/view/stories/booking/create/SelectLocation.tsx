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
                <Header>Enter your location</Header>
                <Row>
                    <Column md={9} xs={12}>
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

                        <Card className="animate__animated animate__fadeIn animate__delay-04s">
                            <CardBody>
                                <Header size="sm">Unsure? Let us find you!</Header>
                                <Button color="primary" block onClick={e => this.FindLocation() }>Find my location</Button>
                                <Paragraph>Note: Your browser will ask you for permission to know your location. You will need to press allow for this feature to work.</Paragraph>
                                <Paragraph>Depending on your device this feature may not be accurate. Please verify the postcode is your own before getting your quote.</Paragraph>
                            </CardBody>
                        </Card>
                    </Column>
                    <Column md={3} xs={12} className="vertical-center animate__animated animate__fadeInRight animate__faster d-none d-lg-inline-flex">
                        <Block>
                           <i className="fas fa-images fa-5x" />
                        </Block>
                    </Column>
                </Row>
            </Container>;
        }
    }
}