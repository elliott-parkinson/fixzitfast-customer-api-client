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

            if (Dependencies.of("fixzitfast-customer-data-store").has<any>("services"))
            {
                this.ServicesStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("services");

                let featured = this.ServicesStore.Services.Featured();
                this.SetFeaturedServices(featured);
            }
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
            return <Container className="jumbo-container background-white">
                <Row>
                    <Column lg={6} className="banner-jumbo">
                        <Header size="lg">Services</Header>
                        <Paragraph>Know what you need? Search our services to find the right person for the job. From tiling and painting to repairing boilers and rewiring, we’ll FixzitFast.</Paragraph>
                        
                        <Button color="primary" size="lg" onClick={e => this.props.onView() }>See all Services</Button>
                    </Column>
                    <Column lg={6} className="vertical-center p-0">
                        
                    </Column>
                </Row>
            </Container>;
        }
    }
}