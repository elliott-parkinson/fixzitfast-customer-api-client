import * as React from "react";
import Dependencies from "typedi";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

import { 
    Alert, Fragment,
    Container,
    Form, FormGroup, Input, InputGroup,
    NewLine,
} from "../../../Theme";

import { ApiResponseData } from "../../../model/ApiResponseData";
import { TestCard } from "../../../components/TestCard";

export namespace Services
{
    class ListForm
    {
        @observable ResponseData = new ApiResponseData;

        @action Submit()
        {
            this.ResponseData.Reset();
            this.ResponseData.Loading = true;

            const apiStore =  Dependencies.of("store").get<any>("api");
            const authStore =  Dependencies.of("store").get<any>("auth");
            let userId =  authStore.Id;

            this.ResponseData.ProcessFor(
                i => apiStore.Services.List()
            );
        }
    }
    class ListFeaturedForm
    {
        @observable ResponseData = new ApiResponseData;

        @action Submit()
        {
            this.ResponseData.Reset();
            this.ResponseData.Loading = true;

            const apiStore =  Dependencies.of("store").get<any>("api");
            const authStore =  Dependencies.of("store").get<any>("auth");
            let userId =  authStore.Id;

            this.ResponseData.ProcessFor(
                i => apiStore.Services.ListFeatured()
            );
        }
    }
    class ListByCategoryForm
    {
        @observable ResponseData = new ApiResponseData;
        @observable CategoryId = -1;

        @action Submit()
        {
            this.ResponseData.Reset();
            this.ResponseData.Loading = true;

            const apiStore =  Dependencies.of("store").get<any>("api");
            const authStore =  Dependencies.of("store").get<any>("auth");
            let userId =  authStore.Id;

            this.ResponseData.ProcessFor(
                i => apiStore.Services.ListByCategory(this.CategoryId)
            );
        }
    }
    class SearchForm
    {
        @observable ResponseData = new ApiResponseData;
        @observable SearchTerm = "";

        @action Submit()
        {
            this.ResponseData.Reset();
            this.ResponseData.Loading = true;

            const apiStore =  Dependencies.of("store").get<any>("api");
            const authStore =  Dependencies.of("store").get<any>("auth");
            let userId =  authStore.Id;

            this.ResponseData.ProcessFor(
                i => apiStore.Services.Search(this.SearchTerm)
            );
        }
    }
    class HourlyRatesForm
    {
        @observable ResponseData = new ApiResponseData;
        @observable ServiceId = -1;

        @action Submit()
        {
            this.ResponseData.Reset();
            this.ResponseData.Loading = true;

            const apiStore =  Dependencies.of("store").get<any>("api");
            const authStore =  Dependencies.of("store").get<any>("auth");
            let userId =  authStore.Id;

            this.ResponseData.ProcessFor(
                i => apiStore.Services.GetHourlyCosts(this.ServiceId)
            );
        }
    }

    @observer
    export class Pane extends React.Component<any>
    {
        @observable List = new ListForm;
        @observable ListFeatured = new ListFeaturedForm;
        @observable ListByCategory = new ListByCategoryForm;
        @observable Search = new SearchForm;
        @observable HourlyRates = new HourlyRatesForm;


        componentDidMount()
        {
            Dependencies.of("store").get<any>("site").Title = "TestBed - Services";
        }
    
        render() {
            return <Container>
                
                <TestCard.Component
                    title="List Services"
                    form={this.List}
                />
                <NewLine />
                <TestCard.Component
                    title="List Featured Services"
                    form={this.ListFeatured}
                />
                <NewLine />

                <TestCard.Component
                    title="List Services by Category"
                    form={this.ListByCategory}

                    formElements={ <Fragment>
                        <FormGroup>
                            <Input placeholder="Category ID" type="number" value={this.ListByCategory.CategoryId} onChange={e => this.ListByCategory.CategoryId = parseInt(e.target.value)} />
                        </FormGroup>
                    </Fragment>}
                />
                <NewLine />
                
                <TestCard.Component
                    title="Search"
                    form={this.Search}

                    formElements={ <Fragment>
                        <FormGroup>
                            <Input placeholder="Search term..." type="text" value={this.Search.SearchTerm} onChange={e => this.Search.SearchTerm = e.target.value} />
                        </FormGroup>
                    </Fragment>}
                />
                <NewLine />

                <TestCard.Component
                    title="Get Hourly Rates"
                    form={this.HourlyRates}

                    formElements={ <Fragment>
                        <FormGroup>
                            <Input placeholder="Service ID" type="number" value={this.HourlyRates.ServiceId} onChange={e => this.HourlyRates.ServiceId = parseInt(e.target.value)} />
                        </FormGroup>
                    </Fragment>}
                />
                <NewLine />
            </Container>;
        }
    }
}