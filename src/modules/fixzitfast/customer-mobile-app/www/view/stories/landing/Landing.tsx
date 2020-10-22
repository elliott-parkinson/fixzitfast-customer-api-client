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
import { HowItWorks } from "./components/HowItWorks";
import { SellingPoints } from "./components/SellingPoints";
import { YearlyCustomers } from "./components/YearlyCustomers";
import { Accredited } from "./components/Accredited";
import { AppBanner } from "./components/AppBanner";
import { SatisfactionBanner } from "./components/SatisfactionBanner";
import { FeaturedServicesBar } from "./components/FeaturedServicesBar";
import { QuoteArea } from "./components/QuoteArea";
import { ServicesBanner } from "./components/ServicesBanner";
import { TestimonialsBanner } from "./components/TestimonialsBanner";

export namespace Landing
{
    @observer
    export class Screen extends React.Component<any>
    {
        @observable Router: any;
        @observable ServicesStore: any;
        @observable BookingStore: any;
        @observable CustomersStore: any;
        @observable SelectedService: any;

        @observable Services: any = [];
        @observable Categories: any = [];

        componentDidMount()
        {
            this.Router = Dependencies.of("store").get<any>("routes");
            this.BookingStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("bookings");
            this.ServicesStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("services");
            this.CustomersStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("customers");

            this.UpdateServiceData();
        }

        @action async UpdateServiceData()
        {
            this.Services = await this.ServicesStore.GetServices();
            this.Categories = await this.ServicesStore.GetServiceCategories();
        }

        @computed get ServicesTypeaheadList()
        {
            let list = [];
            this.ServicesStore?.FullServicesList.forEach( service =>
                list.push(service.Id.toString())
            );

            return list;
        }

        GetService(id: string)
        {
            return this.ServicesStore?.FullServicesList.find( service => service.Id == id);
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

        
    
        render() {
            return <Container fluid>
                <div className="main-hero">
                    <Row> 
                        <Column lg={2} xs={1} />
                        <Column lg={6} xs={10} className="vertical-center animate__animated animate__fadeIn">
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
                                            <Button color="primary" disabled={ this.SelectedService != undefined ? undefined : true } onClick={e => { e.preventDefault(); this.BookService(); return false; }}>Get Started</Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>

                                <FormGroup>
                                    <Button color="secondary" onClick={e => this.ViewServices()}>See all Services</Button>
                                </FormGroup>
                            </Form>
                        </Column>
                        <Column lg={4} className="full-center animate__animated animate__fadeInRight animate__faster d-none d-lg-inline-flex van-image-container">
                            <div className="van-image"></div>
                        </Column>
                    </Row>
                </div>
                

                <FeaturedServicesBar.Component onClick={() => this.ViewServices()} />

                <YearlyCustomers.Component />

                <SellingPoints.Component onClick={() => this.ViewServices()} />
                
                <QuoteArea.Component onClick={() => this.ViewServices()} />

                <SatisfactionBanner.Component />
                <HowItWorks.Component />
                <ServicesBanner.Component onBook={service => this.BookService(service.Id)} onView={() => this.ViewServices()} />
                <Accredited.Component />
                <TestimonialsBanner.Component />
                <AppBanner.Component />
            </Container>;
        }
    }
}