import * as React from "react";
import Dependencies from "typedi";

import { 
	Fragment, Container,
    Row, Column, Block, Header, Paragraph
} from "../../../Theme";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

export namespace Accredited
{
    export interface IViewProps
    {
    }

    @observer
    export class Component extends React.Component<IViewProps>
    {
        render() {
            return <Container className="jumbo-container accredited-banner background-white">
                <Row>
                    <Column lg={6} className="full-center p-0">
                        <Row>
                            <Column xs={12} className="full-center p-3">
                                <img title="How it works" src={require("../../../../../assets/images/landing/accredited.png")} />
                            </Column>
                        </Row>
                    </Column>
                    <Column lg={6} className="banner-jumbo">
                        <Header size="sm">Tradesmen</Header>
                        <Header size="lg">
                            <span>Fully Accredited</span>
                            <span> &amp; Insured</span>
                            
                            
                        </Header>
                        <Paragraph>All our tradespeople work directly for us. They are background checked, qualified, certified and experienced, so you know you and your home are in safe hands.</Paragraph>
                    </Column>
                </Row>
            </Container>;
        }
    }
}