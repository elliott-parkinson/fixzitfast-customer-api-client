import * as React from "react";
import Dependencies from "typedi";

import { 
	AppLayout, Titlebar, Fragment,
    Button,
    Container, Block,
	Card, CardBody, CardHeader,
	Form, FormGroup, Input, InputGroup, InputGroupAddon, Typeahead,
	Header, Paragraph,
	NewLine,
    Nav, NavItem, NavLink,
    Row, Column
} from "../../Theme";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";
import { ServiceCard, ServiceIcon } from "../../../../../react-components";

export namespace Landing
{
    @observer
    export class Screen extends React.Component<any>
    {
        @observable Router: any;
        @observable ServicesStore: any;
        @observable BookingStore: any;
        @observable SelectedService: any;

        componentDidMount()
        {
            this.Router =  Dependencies.of("store").get<any>("routes");
            this.BookingStore =  Dependencies.of("fixzitfast-customer-store").get<any>("bookings");
            this.ServicesStore =  Dependencies.of("fixzitfast-customer-store").get<any>("services");
        }

        @computed get FeaturedServicesList()
        {
            let list = [];
            if (this.ServicesStore != undefined)
            {
                this.ServicesStore.Featured.forEach( service => service.ParentId !== -1 && list.push(service) );
            }

            return list;
        }

        @computed get FullServicesList()
        {
            let list = [];
            if (this.ServicesStore != undefined)
            {
                let services = [];

                this.ServicesStore.Services.forEach( service => service.ParentId == -1 && services.push(service) );
                this.ServicesStore.Services.forEach( service => {
                    if (service.ParentId !== -1)
                    {
                        let parent = services.find(result => result.Id == service.ParentId);
                        list.push({ Id: service.Id, Name: parent.Name + " - " + service.Name });
                    }
                });
            }

            return list;
        }

        @computed get ServicesTypeaheadList()
        {
            let list = [];
            this.FullServicesList.forEach( service =>
                list.push(service.Id.toString())
            );

            return list;
        }

        GetService(id: string)
        {
            return this.FullServicesList.find( service => service.Id == parseInt(id));
        }

        @action SelectService(id: string)
        {
            this.SelectedService = this.GetService(id);
        }

        @action BookService(id?: string)
        {
            if (id != undefined)
            {
                this.SelectService(id);
            }

            this.BookingStore.Create(this.SelectedService);
        }

        @action ViewServices(id?: string)
        {
            this.BookingStore.Create();
        }

        @action ViewPlayStore()
        {
            const notificationStore = Dependencies.of("store").get<any>("notifications");
		    notificationStore.Push("Error: Not Implemented", "No app yet exists on the play store.", "danger", 2.5);
        }

        @action ViewAppStore()
        {
            const notificationStore = Dependencies.of("store").get<any>("notifications");
		    notificationStore.Push("Error: Not Implemented", "No app yet exists on the app store.", "danger", 2.5);
        }
    
        render() {
            return <Container>
                <Header>When it comes to your home, Fixzitfast</Header>
                <Paragraph>The smart home-repair service that frees up your time for the important things in life.</Paragraph>

                <Form>
                    <FormGroup>
                        <InputGroup>
                            <Typeahead
                                id="basic-typeahead-single"
                                onChange={e => this.SelectService(e[0]) }
                                options={this.ServicesTypeaheadList}
                                placeholder="Type the service that you need."
                                selected={null}
                                labelKey={service => this.GetService(service).Name}
                                renderMenuItemChildren={props => this.GetService(props).Name}
                            />
                            <InputGroupAddon addonType="prepend">
                                <Button color="primary" disabled={ this.SelectedService != undefined ? undefined : true } onClick={e => { e.preventDefault(); this.BookService(); return false; }}>Book</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <Button color="secondary" onClick={e => this.ViewServices()}>See all Services</Button>
                    </FormGroup>
                </Form>
                <hr />
                <Row className="featured-services-bar">
                    {this.FeaturedServicesList.map( service => <Column md={3} sm={6} xs={12} key={service.Id}>
                        <Card className="m-1" onClick={e => this.BookService(service.Id)}>
                            <CardBody>
                                <Button color="primary" disabled className="rounded-circle">
                                    <i className="fas fa-images" />
                                </Button>
                                &nbsp;
                                { service.Name }
                            </CardBody>
                        </Card>
                    </Column>)}
                </Row>
                <hr />
                <Row className="selling-points">
                    <Column md={4} xs={12} className="selling-point">
                        <i className="fas fa-images fa-3x" />
                        <br />
                        <br />
                        <Header size="md">Trusted tradespeople</Header>
                        <Paragraph>
                            Our fixers work for us, so we can guarantee they are reliable and fully certified.
                        </Paragraph>

                        <Button color="primary" outline onClick={e => this.ViewServices()}>Book now</Button>
                    </Column>
                    <Column md={4} xs={12} className="selling-point">
                        <i className="fas fa-images fa-3x" />
                        <br />
                        <br />
                        <Header size="md">Same-day service</Header>
                        <Paragraph>
                            Emergency? Schedule a same-day visit anywhere in Edinburgh and we’ll be there.
                        </Paragraph>

                        <Button color="primary" outline onClick={e => this.ViewServices()}>Book now</Button>
                    </Column>
                    <Column md={4} xs={12} className="selling-point">
                        <i className="fas fa-images fa-3x" />
                        <br />
                        <br />
                        <Header size="md">Make it snappy</Header>
                        <Paragraph>
                            Kick off with a one-hour slot any time from 4.30pm - 8am to identify/fix the problem.
                        </Paragraph>

                        <Button color="primary" outline onClick={e => this.ViewServices()}>Book now</Button>
                    </Column>
                </Row>
                <hr />
                <Row>
                    <Column lg={6} className="full-center">
                        <Block>
                           <i className="fas fa-mobile fa-5x" />
                        </Block>
                    </Column>
                    <Column lg={6} className="vertical-center">
                        <Header>How it works</Header>
                        <Paragraph>With FixzitFast there’s no need to post your request and sift through thousands of tradespeoples’ profiles or quotes - we take the hard work out of getting the job done.</Paragraph>
                        <Paragraph>Just download the app, sign up for an account and enter the service you need. Not sure what the problem is? Include pictures and a description and we’ll send someone round to assess the issue - with the right tools to fix it then and there, if possible.</Paragraph>
                    </Column>
                </Row>
                <hr />
                <Row>
                    <Column lg={6} className="vertical-center">
                        <Header>Services</Header>
                        <Paragraph>Know what you need? Search our services to find the right person for the job. From tiling and painting to repairing boilers and rewiring, we’ll FixzitFast.</Paragraph>
                        
                        <Button color="primary" block onClick={e => this.ViewServices() }>See all Services</Button>
                    </Column>
                    <Column lg={6} className="vertical-center">
                            <Row className="featured-services-block w-100">
                                {this.FeaturedServicesList.map( service => <Column md={6} sm={6} xs={12} key={service.Id}>
                                    <ServiceCard.Component
                                        name={service.Name}
                                        description={service.Description}

                                        onClick={e => this.BookService(service.Id)}
                                    />
                                </Column>)}
                            </Row>
                    </Column>
                </Row>
                <hr />
                <Row>
                    <Column lg={6} className="full-center">
                        <Row>
                            <Column md={4} sm={6} xs={12} className="0-1">
                                <i className="fas fa-images fa-3x" />
                            </Column>
                            <Column md={4} sm={6} xs={12} className="0-1">
                                <i className="fas fa-images fa-3x" />
                            </Column>
                            <Column md={4} sm={6} xs={12} className="0-1">
                                <i className="fas fa-images fa-3x" />
                            </Column>
                            <Column md={4} sm={6} xs={12} className="0-1">
                                <i className="fas fa-images fa-3x" />
                            </Column>
                            <Column md={4} sm={6} xs={12} className="0-1">
                                <i className="fas fa-images fa-3x" />
                            </Column>
                            <Column md={4} sm={6} xs={12} className="0-1">
                                <i className="fas fa-images fa-3x" />
                            </Column>
                        </Row>
                    </Column>
                    <Column lg={6} className="vertical-center">
                        <Header size="sm">Tradesmen</Header>
                        <Header>Fully Accredited</Header>
                        <Paragraph>All our tradespeople work directly for us. They are background checked, qualified, certified and experienced, so you know you and your home are in safe hands.</Paragraph>
                    </Column>
                </Row>     
                <hr />
                <Row>
                    <Column lg={6} className="vertical-center">
                        <Header>Your satisfaction, guaranteed</Header>
                    </Column>
                    <Column lg={6} className="vertical-center">
                        <Paragraph>Your satisfaction matters to us. Our guarantee is our name: if you’re not happy, we’ll Fixzitfast.</Paragraph>
                        <Paragraph>From background checking all our tradespeople, to using electric vans, we’re determined to bring you the fastest, greenest and best home-repair service in the city.</Paragraph>
                    </Column>
                </Row>
                <hr />
                <Row>
                    <Column lg={6} className="full-center">
                        <Block>
                           <i className="fas fa-mobile fa-5x" />
                        </Block>
                    </Column>
                    <Column lg={6} className="vertical-center">
                        <Header>IOS and Android ready!</Header>
                        <Paragraph>Just download the app, set up an account and you’re ready to go. You can find and book common repair jobs, or request something different. You’ll get notifications about the location of your tradesperson and you can pay for the repair, straight from your phone.</Paragraph>
                        <Row>
                            <Column lg={6} className="p-1">
                                <Button block onClick={e=> this.ViewPlayStore()}>Get it on Google Play</Button>
                            </Column>
                            <Column lg={6} className="p-1">
                                <Button block onClick={e=> this.ViewAppStore()}>Download on the App Store</Button>
                            </Column>
                        </Row> 
                    </Column>
                </Row>
            </Container>;
        }
    }
}