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

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

export namespace FeaturedServicesBar
{
    export interface IViewProps
    {
        
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

            let services = await this.ServicesStore.GetFeaturedServiceCategories();
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
            return <Row className="featured-services-bar">
                {this.FeaturedServicesList?.map( (service, index) => <Column md={3} sm={6} xs={12} key={service.Id}>
                    <Card className={"m-1 animate__animated animate__fadeIn " + this.CalculateDelayClass(index)}>
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
        }
    }
}