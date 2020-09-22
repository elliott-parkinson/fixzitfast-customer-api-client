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
import { ServiceCard, ServiceIcon } from "../../../../../../react-components";

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

        componentDidMount()
        {
            this.Router =  Dependencies.of("store").get<any>("routes");
            this.BookingStore =  Dependencies.of("fixzitfast-customer-store").get<any>("bookings");
            this.ServicesStore =  Dependencies.of("fixzitfast-customer-store").get<any>("services");
        }

        @computed get ServiceCategories()
        {
            let list = [];
            if (this.ServicesStore != undefined)
            {
                this.ServicesStore.Services.forEach( service =>
                    service.ParentId == -1 && list.push(service)
                );
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

        GetServicesForCategory(id: number)
        {
            let list = [];
            if (this.ServicesStore != undefined)
            {
                this.ServicesStore.Services.forEach( service =>
                    service.ParentId == id && list.push(service)
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

        GetService(id: string)
        {
            return this.FullServicesList.find( service => service.Id == parseInt(id));
        }

        @action SelectService(service: any)
        {
            this.SelectedService = service;
        }

        @action Book()
        {
            this.BookService(this.SelectedService);
        }

        @action BookService(service: any)
        {
            this.BookingStore.BookService(service);
        }
    
        render() {
            return <Container>
                <Header>Choose a service</Header>
                <Row>
                    <Column md={9} x={12}>
                        <Form>
                            <FormGroup>
                                <InputGroup>
                                    <Typeahead
                                        onChange={e => this.SelectService( this.GetService(e) ) }
                                        options={this.ServicesTypeaheadList}
                                        placeholder="What service are you looking for?"
                                        selected={null}
                                        labelKey={service => this.GetService(service).Name}
                                        renderMenuItemChildren={props => this.GetService(props).Name}
                                    />
                                    <InputGroupAddon addonType="prepend">
                                        <Button color="primary"  disabled={ this.SelectedService != undefined ? undefined : true } onClick={e => { e.preventDefault(); this.Book(); return false; }}>Book</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                        </Form>

                        <div className="service-category-list">
                            <Header size="xs">Most popular services</Header>
                            <Alert color="danger">
                                <strong>API Error: </strong> No popular services api exists.
                            </Alert>
                            <div className="service-list">

                            </div>
                            
                            {this.ServiceCategories.map( category => <Fragment key={category.Id}>
                                { (this.FilterCategory== undefined || (this.FilterCategory && this.FilterCategory.Id == category.Id)) && <Fragment>
                                    <Header size="xs">{category.Name}</Header>
                                    { this.GetServicesForCategory(category.Id).length == 0 && <Alert color="info">
                                        <strong>Error: </strong> No services exist for this category.
                                    </Alert> }
                                    
                                    <Row className="service-list">
                                        { this.GetServicesForCategory(category.Id).map( service => 
                                            <Column md={4} sm={6} xs={12} key={service.Id}>
                                                <ServiceCard.Component
                                                    name={service.Name}
                                                    description={service.Description}

                                                    onClick={e => this.BookService(service)}
                                                />
                                            </Column>
                                        )}
                                    </Row>
                                </Fragment> }
                            </Fragment>)}


                        </div>
                    </Column>
                    <Column md={3} x={12}>
                        <div className="service-category-filter-icons">
                            <Header size="xs">Filter</Header>
                            <Row>
                                { this.ServiceCategories.map( category => <Fragment key={category.Id}>
                                    <Column>
                                        <ServiceIcon.Component
                                            name={category.Name}
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