import * as React from "react";
import Dependencies from "typedi";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

import { 
    Alert, Fragment,
    Container,
    Header, Paragraph,
    Form, FormGroup, Input, InputGroup,
    NewLine,
} from "../../../Theme";

import { ApiResponseData } from "../../../model/ApiResponseData";
import { TestCard } from "../../../components/TestCard";

export namespace PurchaseOrders
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
                <Alert color="info">Create</Alert>
                <Alert color="warning">View</Alert>
                <Alert color="warning">View details</Alert>
                <Paragraph>
                    Question: How are the properties for a purchase order and a purchase orders details different? Why is this in two separate calls?
                </Paragraph>
                <NewLine />

                <Alert color="warning">
                    Get history
                </Alert>
                <Paragraph>
                    Question: What are the details for? Purchase orders are for a supplier by the look of the url, and the body asks for a userId? 
                </Paragraph>
                <NewLine />

                <Alert color="info">View history</Alert>
                <Paragraph>
                    Question: What is the history for? Purchase orders are for a supplier by the look of the url, and the body asks for a userId? 
                </Paragraph>
                <NewLine />
            </Container>;
        }
    }
}