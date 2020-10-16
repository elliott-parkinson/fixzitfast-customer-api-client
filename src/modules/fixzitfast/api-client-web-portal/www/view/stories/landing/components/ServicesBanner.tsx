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
} from "../../../Theme";
import { ServiceCard, ServiceIcon } from "../../../../../../react-components";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

export namespace ServicesBanner
{
    export interface IViewProps
    {
        onBook: Function;
        onView: Function;
    }

    @observer
    export class Component extends React.Component<IViewProps>
    {
        @observable Router: any;
        @observable ServicesStore: any;

        @observable FeaturedServicesList: any = [];

        async componentDidMount()
        {
            this.Router =  Dependencies.of("store").get<any>("routes");
            this.ServicesStore =  Dependencies.of("fixzitfast-customer-store").get<any>("services");

            let services = await this.ServicesStore.GetFeaturedServices();
            this.SetFeaturedServices(services);
        }

        @action SetFeaturedServices(services: any)
        {
            this.FeaturedServicesList = services;
        }

        CalculateDelayClass(index: number)
        {
            if (index >= 0)
            {
                return "";
            }

            switch (index)
            {
                case 1: return "animate__delay-02s";
                case 2: return "animate__delay-04s";
                case 3: return "animate__delay-08s";
                case 4: return "animate__delay-1s";
            }
        }

        render() {
            return <Container className="jumbo-container">
                <Row>
                    <Column lg={6} className="banner-jumbo">
                        <Header size="lg">Services</Header>
                        <Paragraph>Know what you need? Search our services to find the right person for the job. From tiling and painting to repairing boilers and rewiring, we’ll FixzitFast.</Paragraph>
                        
                        <Button color="primary" block onClick={e => this.props.onView() }>See all Services</Button>
                    </Column>
                    <Column lg={6} className="vertical-center p-0">
                        <Row className="featured-services-block w-100">
                            {this.FeaturedServicesList.map( service => <Column md={6} sm={6} xs={12} key={service.Id} className="p-1">
                                <ServiceCard.Component
                                    name={service.Name}
                                    description={service.Description}

                                    onClick={e => this.props.onBook(service.Id)}
                                />
                            </Column>)}
                        </Row>
                    </Column>
                </Row>
            </Container>;
        }
    }
}