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
import { ServiceCategoryIcon } from "../../../../../../react-components";

export namespace FeaturedServicesBar
{
    export interface IViewProps
    {
        onClick?: Function;
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
            if (index <= 0)
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
            return <div className="featured-services-bar">
                <Container>
                    <Row>
                        {this.FeaturedServicesList?.map( (service, index) => <Column lg={3} md={6} xs={12} key={service.Id}>
                            <Card className={"noselect m-1 animate__animated animate__fadeIn " + this.CalculateDelayClass(index)} onClick={this.props.onClick}>
                                <CardBody>
                                    <ServiceCategoryIcon.Component src={service.IconUrl ? service.IconUrl : ""} />

                                    &nbsp;
                                    <span>
                                        { service.Name }
                                    </span>
                                </CardBody>
                            </Card>
                        </Column>)}
                    </Row>
                </Container>
            </div>
        }
    }
}