import * as React from "react";
import Dependencies from "typedi";

import { 
	Fragment, Container,
    Row, Column, Block, Header, Paragraph, Button,
    NewLine
} from "../../../Theme";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

export namespace QuoteArea
{
    export interface IViewProps
    {
        onClick?: Function;
    }

    @observer
    export class Component extends React.Component<IViewProps>
    {
        @observable CustomersStore: any;

        @observable Quote: any;

        async componentDidMount()
        {
            this.CustomersStore = Dependencies.of("fixzitfast-customer-store").get<any>("customers");
            let quote = await this.CustomersStore.GetCustomerQuote();
            this.SetQuote(quote);
        }

        @action SetQuote(quote: any)
        {
            this.Quote = quote;
        }

        render() {
            return <Row className="customer-quote animate__animated animate__fadeIn animate__delay-1s">
            <Column md={12} xs={12} className="full-center">
                <Header size="md">{ this.Quote?.Excerpt }</Header>
                <NewLine />
                <Header size="sm"> -{ this.Quote?.Name }- </Header>

                <Button color="primary" size="lg" onClick={this.props.onClick}>See All Services</Button>
            </Column>
        </Row>
        }
    }
}