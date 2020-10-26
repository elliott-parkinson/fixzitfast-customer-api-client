import * as React from "react";
import Dependencies, { Service } from "typedi";

import { 
    Alert,
	AppLayout, Titlebar, Fragment,
    Button,
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
import { ServiceCard, ServiceIcon, ServiceCategoryIcon } from "../../../../../../react-components";
import { ServicesTypeAhead } from "../../../components/ServicesTypeAhead";

export namespace SelectService
{
    @observer
    export class Screen extends React.Component<any>
    {
        @observable Router: any;
        @observable ServicesStore: any;
        @observable BookingStore: any;

        @observable SelectedService: any;
        @observable FilterCategory: any;
        @observable FilterText: string = "";

        @observable Services: any = [];
        @observable Categories: any = [];

        componentDidMount()
        {
            this.Router =  Dependencies.of("store").get<any>("routes");
            Dependencies.of("store").has("site") && (Dependencies.of("store").get<any>("site").Title = "Choose a service");
            this.BookingStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("bookings");

            if (Dependencies.of("fixzitfast-customer-data-store").has<any>("services"))
            {
                this.ServicesStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("services");
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
            this.BookingStore?.InProgress.Store();
            this.Router.Go("/booking/create/details");
        }


        GetPopularServices()
        {
            return this.ServicesStore?.Services.Popular();
        }

        GetServicesForCategory(id: number)
        {
            let list = [];
            if (this.ServicesStore != undefined)
            {
                this.Services.forEach( service =>
                    service.CategoryId == id && list.push(service)
                );
            }

            return list;
        }

        @action SetFilterCategory(service: any)
        {
            if (service && this.FilterCategory?.Id != service.Id)
            {
                this.FilterCategory = service;
            }
            else
            {
                this.FilterCategory = undefined;
            }
        }

        render() {
            return <Container>
                <Header size="xl">Choose a service</Header>
                <Row>
                    <Column md={9} x={12}>
                        <Form className="animate__animated animate__fadeIn animate__delay-02s">
                            <FormGroup>
                                <InputGroup>
                                    <ServicesTypeAhead.Component text="Book" onClick={ (service, category) => { this.BookService(service, category); }} />
                                </InputGroup>
                            </FormGroup>
                        </Form>

                        <div className="service-category-list">
                            { this.FilterCategory == undefined &&
                                <div className="animate__animated animate__fadeIn animate__delay-02s">
                                    <Header size="xs">Most popular services</Header>
                                    <hr />
                                    <Row className="service-list">
                                        { this.GetPopularServices()?.map( service => 
                                            <Column md={4} sm={6} xs={12} key={service.Id} className="p-1">
                                                <ServiceCard.Component
                                                    name={service.Name}
                                                    description={service.Description}
                                                    src={service.ImageUrl}

                                                    onClick={e => this.BookService(service, this.GetCategory(service.CategoryId))}
                                                />
                                            </Column>
                                        )}
                                    </Row>

                                    <NewLine />
                                    <NewLine />
                                    <NewLine />
                                </div>
                            }
                            <div className="animate__animated animate__fadeIn animate__delay-04s">
                                {this.Categories.map( category => <Fragment key={category.Id}>
                                    { (this.FilterCategory == undefined || (this.FilterCategory && this.FilterCategory.Id == category.Id)) && <Fragment>
                                        <Header size="xs"><ServiceCategoryIcon.Component src={category.IconUrl} />  &nbsp; {category.Name}</Header>
                                        <hr />
                                        { this.GetServicesForCategory(category.Id).length == 0 && <Alert color="info">
                                            <strong>Error: </strong> No services exist for this category.
                                        </Alert> }
                                        
                                        <Row className="service-list">
                                            { this.GetServicesForCategory(category.Id).map( service => 
                                                <Column md={4} sm={6} xs={12} key={service.Id} className="p-1">
                                                    <ServiceCard.Component
                                                        name={service.Name}
                                                        description={service.Description}
                                                        src={service.ImageUrl}

                                                        onClick={e => this.BookService(service, category)}
                                                    />
                                                </Column>
                                            )}
                                        </Row>

                                        <NewLine />
                                        <NewLine />
                                        <NewLine />
                                    </Fragment> }
                                </Fragment>)}
                            </div>
                        </div>
                    </Column>
                    <Column md={3} x={12} className="animate__animated animate__fadeIn animate__faster d-none d-lg-inline-flex">
                        <div className="service-category-filter-icons">
                            <Header size="xs">Filter</Header>
                            <Row>
                                { this.Categories.map( category => <Fragment key={category.Id}>
                                    <Column className="m-1">
                                        <ServiceIcon.Component
                                            name={category.Name}
                                            src={category.IconUrl}
                                            selected={this.FilterCategory?.Id == category.Id}

                                            onClick={e => this.SetFilterCategory(category)}
                                        />
                                    </Column> 
                                </Fragment>)}
                            </Row>
                        </div>
                    </Column>
                </Row>

                
            </Container>;
        }
    }
}