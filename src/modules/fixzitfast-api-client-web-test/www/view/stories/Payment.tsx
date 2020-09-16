import * as React from "react";
import Dependencies from "typedi";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

import { 
    Alert, Fragment,
    Container,
	Form, FormGroup, Input, InputGroup,
} from "../Theme";

import { ApiResponseData } from "../model/ApiResponseData";
import { TestCard } from "../components/TestCard";

export namespace Payment
{
    class ListForm
    {
        @observable ResponseData = new ApiResponseData;

        @action Submit()
        {
            const authStore =  Dependencies.of("store").get<any>("auth");
            let userId =  authStore.Id;
            this.ResponseData.Reset();
            
            this.ResponseData.Performed = true;
            this.ResponseData.Success = true;
            this.ResponseData.Data = {
                "test": "this is a test"
            };
        }
    }

    @observer
    export class Pane extends React.Component<any>
    {
        @observable List = new ListForm;


        componentDidMount()
        {
            Dependencies.of("store").get<any>("site").Title = "TestBed - Payment";
        }
    
        render() {
            return <Container>
                <Alert color="warning">No Tests yet written</Alert>
            </Container>;
        }
    }
}