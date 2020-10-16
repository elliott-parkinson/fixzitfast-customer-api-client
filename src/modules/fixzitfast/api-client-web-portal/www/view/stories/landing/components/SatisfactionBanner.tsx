import * as React from "react";
import Dependencies from "typedi";

import { 
	Fragment, Container,
    Row, Column, Block, Header, Paragraph, Button
} from "../../../Theme";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

export namespace SatisfactionBanner
{
    export interface IViewProps
    {
    }

    @observer
    export class Component extends React.Component<IViewProps>
    {
        render() {
            return <Container className="jumbo-container">
                <Row>
                    <Column lg={6} className="banner-jumbo">
                        <Header size="lg">Your satisfaction, guaranteed</Header>
                    </Column>
                    <Column lg={6} className="banner-jumbo">
                        <Paragraph>Your satisfaction matters to us. Our guarantee is our name: if you’re not happy, we’ll Fixzitfast.</Paragraph>
                        <Paragraph>From background checking all our tradespeople, to using electric vans, we’re determined to bring you the fastest, greenest and best home-repair service in the city.</Paragraph>
                    </Column>
                </Row>
            </Container>;
        }
    }
}