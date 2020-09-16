import * as React from "react";
import Dependencies from "typedi";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

import { 
    Alert, Fragment,
    Container,
    Header,
    Form, FormGroup, Input, InputGroup,
    NewLine,
} from "../../../Theme";

import { ApiResponseData } from "../../../model/ApiResponseData";
import { TestCard } from "../../../components/TestCard";

export namespace Documents
{
    class ListForm
    {
        @observable ResponseData = new ApiResponseData;

        @action Submit()
        {
            
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
                <NewLine />
                
                <Header size="md">Tests to be written</Header>
                <Alert color="info">Get Documents for booking</Alert>
                <Alert color="info">Add Documents to booking</Alert>
                <Alert color="info">Sign documents for booking</Alert>
            </Container>;
        }
    }
}