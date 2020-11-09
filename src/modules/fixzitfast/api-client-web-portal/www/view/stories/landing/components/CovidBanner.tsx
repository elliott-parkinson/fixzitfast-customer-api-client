import * as React from "react";
import Dependencies from "typedi";

import { 
	Fragment, Container,
    Row, Column, Block, Header, Paragraph, Button,
    NewLine
} from "../../../Theme";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

export namespace CovidBanner
{
    export interface IViewProps
    {
        onClick?: Function;
        showButtons: boolean;
    }

    @observer
    export class Component extends React.Component<IViewProps>
    {
        @observable CustomersStore: any;

        @observable Quote: any;

        async componentDidMount()
        {
            
        }

        render() {
            return <Row className="covid-banner animate__animated animate__fadeIn animate__delay-1s">
            <Column md={12} xs={12} className="full-center">
                <Header size="lg">Keeping you <span className="orange">safe</span></Header>
                <NewLine />
                
            </Column>
        </Row>
        }
    }
}