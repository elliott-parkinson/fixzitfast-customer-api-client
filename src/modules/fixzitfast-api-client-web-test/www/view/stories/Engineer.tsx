import * as React from "react";
import Dependencies from "typedi";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

import { 
    Alert, Fragment,
    Container,
    Form, FormGroup, Input, InputGroup,
    NewLine
} from "../Theme";

import { ApiResponseData } from "../model/ApiResponseData";
import { TestCard } from "../components/TestCard";

export namespace Engineer
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
                i => apiStore.Engineer.List()
            );
        }
    }

    class ListAvailableForm
    {
        @observable ResponseData = new ApiResponseData;

        @observable Date: string = "";
        @observable StartTime: string = "";
        @observable FinishTime: string = "";

        @action Submit()
        {
            this.ResponseData.Reset();
            this.ResponseData.Loading = true;

            const apiStore =  Dependencies.of("store").get<any>("api");
            const authStore =  Dependencies.of("store").get<any>("auth");
            let userId =  authStore.Id;

            this.ResponseData.ProcessFor(
                i => apiStore.Engineer.ListAvailable(this.Date, this.StartTime, this.FinishTime)
            );
        }
    }

    class LocationForm
    {
        @observable ResponseData = new ApiResponseData;
        @observable EngineerId = -1;

        @action Submit()
        {
            this.ResponseData.Reset();
            this.ResponseData.Loading = true;

            const apiStore =  Dependencies.of("store").get<any>("api");
            const authStore =  Dependencies.of("store").get<any>("auth");
            let userId =  authStore.Id;

            this.ResponseData.ProcessFor(
                i => apiStore.Engineer.GetLocation(this.EngineerId)
            );
        }
    }
    class JobCountForm
    {
        @observable ResponseData = new ApiResponseData;
        @observable EngineerId = -1;

        @action Submit()
        {
            this.ResponseData.Reset();
            this.ResponseData.Loading = true;

            const apiStore =  Dependencies.of("store").get<any>("api");
            const authStore =  Dependencies.of("store").get<any>("auth");
            let userId =  authStore.Id;

            this.ResponseData.ProcessFor(
                i => apiStore.Engineer.GetJobCount(this.EngineerId)
            );
        }
    }

    @observer
    export class Pane extends React.Component<any>
    {
        @observable List = new ListForm;
        @observable ListAvailable = new ListAvailableForm;

        @observable Location = new LocationForm;
        @observable JobCount = new JobCountForm;


        componentDidMount()
        {
            Dependencies.of("store").get<any>("site").Title = "TestBed - Engineer";
        }
    
        render() {
            return <Container>
                <TestCard.Component
                    title="List Engineers"
                    form={this.List}
                />
                <NewLine />

                <TestCard.Component
                    title="List Available Engineers"
                    form={this.ListAvailable}
                    formElements={ <Fragment>
                        <FormGroup>
                            <Input placeholder="Date - eg: 30/08/2020" type="text" value={this.ListAvailable.Date} onChange={e => this.ListAvailable.Date = e.target.value}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Start Time - eg: 10:00" type="text" value={this.ListAvailable.StartTime} onChange={e => this.ListAvailable.StartTime = e.target.value}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Finish Time - eg: 12:00" type="text" value={this.ListAvailable.FinishTime} onChange={e => this.ListAvailable.FinishTime = e.target.value}  />
                        </FormGroup>
                    </Fragment>}
                />
                <NewLine />

                <TestCard.Component
                    title="Get Engineers Location"
                    form={this.Location}

                    formElements={ <Fragment>
                        <FormGroup>
                            <Input placeholder="Engineer ID" type="number" value={this.Location.EngineerId} onChange={e => this.Location.EngineerId = parseInt(e.target.value)} />
                        </FormGroup>
                    </Fragment>}
                />
                <NewLine />
                
                <TestCard.Component
                    title="Get Engineers Job Count"
                    form={this.JobCount}

                    formElements={ <Fragment>
                        <FormGroup>
                            <Input placeholder="Engineer ID" type="number" value={this.JobCount.EngineerId} onChange={e => this.JobCount.EngineerId = parseInt(e.target.value)} />
                        </FormGroup>
                    </Fragment>}
                />
                <NewLine />
            </Container>;
        }
    }
}