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
    Nav, NavItem, NavLink, Navbar, NavbarBrand,
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
import { ServicesTypeAhead } from "../../components/ServicesTypeAhead";

export namespace Landing
{
    @observer
    export class Screen extends React.Component<any>
    {
        @observable Router: any;
        @observable ServicesStore: any;
        @observable BookingStore: any;
        @observable CustomersStore: any;
        @observable TestimonialsStore: any;

        @observable SelectedService: any;

        @observable Services: any = [];
        @observable Categories: any = [];

        componentDidMount()
        {
            this.Router = Dependencies.of("store").get<any>("routes");
            Dependencies.of("store").has("site") && (Dependencies.of("store").get<any>("site").Title = "");

            if (Dependencies.of("fixzitfast-customer-data-store").has<any>("bookings"))
            {
                this.BookingStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("bookings");
            }

            if (Dependencies.of("fixzitfast-customer-data-store").has<any>("services"))
            {
                this.ServicesStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("services");
            }

            if (Dependencies.of("fixzitfast-customer-data-store").has<any>("customers"))
            {
                this.CustomersStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("customers");
            }

            if (Dependencies.of("fixzitfast-customer-data-store").has<any>("testimonials"))
            {
                this.TestimonialsStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("testimonials");
            }

            this.UpdateServiceData();
        }

        @action async UpdateServiceData()
        {
            this.Services = await this.ServicesStore.Services.List;
            this.Categories = await this.ServicesStore.Categories.List;
        }


        GetService(id: string)
        {
            return this.Services.find( service => service.Id == id);
        }

        GetCategory(id: string)
        {
            return this.Categories.find( category => category.Id == id);
        }


        @action BookService(service: any, category: any)
        {
            this.BookingStore?.Create(service.Id, service.Name, category.Id, category.Name);
            this.Router.Go("/booking/create/services");
        }

        @action ViewServices()
        {
            this.BookingStore?.Create();
            this.Router.Go("/booking/create/services");
        }
        
    
        render() {
            return <Fragment>
                <Navbar color="light" className="topnav-mobile animate__animated animate__fadeInDown d-flex d-sm-none text-center">
                    <Container className="text-center">
                        <NavbarBrand className="m-auto" href="/" onClick={ e => { e.preventDefault(); this.Router.Go("/"); return false; }}>
                            <img src={require("../../../../assets/images/site-logo.png")} />
                        </NavbarBrand>
                    </Container>
                </Navbar>
                <div className="main-hero">
                    <Row> 
                        <Column lg={2} xs={1} />
                        <Column lg={6} xs={10} className="vertical-center animate__animated animate__fadeIn">
                            <Header>When it comes to your home, Fixzitfast</Header>
                            <Paragraph>The smart home-repair service that frees up your time for the important things in life.</Paragraph>

                            { this.ServicesStore &&
                                <Form>
                                    <FormGroup>
                                        <ServicesTypeAhead.Component text="Get Started" onClick={ (service, category) => { this.BookService(service, category); }} />
                                    </FormGroup>

                                    <FormGroup>
                                        <Button color="secondary" onClick={e => this.ViewServices()}>See all Services</Button>
                                    </FormGroup>
                                </Form>
                            }
                        </Column>
                        <Column lg={4} className="full-center animate__animated animate__fadeInRight animate__faster d-none d-lg-inline-flex van-image-container">
                            <div className="van-image"></div>
                        </Column>
                    </Row>
                </div>
                
                { this.ServicesStore &&
                    <FeaturedServicesBar.Component onClick={() => this.ViewServices()} />
                }


                { this.CustomersStore &&
                    <YearlyCustomers.Component />
                }

                
                <SellingPoints.Component onClick={() => this.ViewServices()} showButtons={this.ServicesStore && this.BookingStore} />
                
                { this.CustomersStore &&
                    <QuoteArea.Component onClick={() => this.ViewServices()} showButtons={this.ServicesStore && this.BookingStore} />
                }

                <SatisfactionBanner.Component />
                <HowItWorks.Component />
                <ServicesBanner.Component onBook={(service, category) => this.BookService(service, category)} onView={() => this.ViewServices()} />
                <Accredited.Component />

                { this.TestimonialsStore &&
                    <TestimonialsBanner.Component />
                }

                <AppBanner.Component />
            </Fragment>;
        }
    }
}