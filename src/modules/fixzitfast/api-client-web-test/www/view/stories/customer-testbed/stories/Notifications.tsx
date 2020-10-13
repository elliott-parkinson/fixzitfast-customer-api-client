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

export namespace Notifications
{
    class ListForm
    {
        @observable ResponseData = new ApiResponseData;

        @action async Submit()
        {
            this.ResponseData.Reset();
            this.ResponseData.Loading = true;

            
            const authStore =  Dependencies.of("store").get<any>("auth");
            let userId =  authStore.Id;

            this.ResponseData.ProcessFor(
                i => apiStore.Notifications.List(userId)
            );
        }
    }

    @observer
    export class Pane extends React.Component<any>
    {
        @observable List = new ListForm;


        componentDidMount()
        {
            Dependencies.of("store").get<any>("site").Title = "TestBed - Notifications";
        }
    
        render() {
            return <Container>
                <TestCard.Component
                    title="List notifications"
                    form={this.List}
                />
            </Container>;
        }
    }
}