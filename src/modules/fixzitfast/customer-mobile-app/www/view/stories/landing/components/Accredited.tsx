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
            return <Container className="jumbo-container accredited-banner">
                <Row>
                    <Column lg={6} className="full-center p-0">
                        <Row>
                            <Column md={4} sm={6} xs={12} className="full-center">
                                <img title="How it works" src={require("../../../../../assets/images/landing/accredited/accr1.png")} />
                            </Column>
                            <Column md={4} sm={6} xs={12} className="full-center">
                                <img title="How it works" src={require("../../../../../assets/images/landing/accredited/accr2.png")} />
                            </Column>
                            <Column md={4} sm={6} xs={12} className="full-center">
                                <img title="How it works" src={require("../../../../../assets/images/landing/accredited/accr3.png")} />
                            </Column>
                            <Column md={4} sm={6} xs={12} className="full-center">
                                <img title="How it works" src={require("../../../../../assets/images/landing/accredited/accr4.png")} />
                            </Column>
                            <Column md={4} sm={6} xs={12} className="full-center">
                                <img title="How it works" src={require("../../../../../assets/images/landing/accredited/accr5.png")} />
                            </Column>
                            <Column md={4} sm={6} xs={12} className="full-center">
                                <img title="How it works" src={require("../../../../../assets/images/landing/accredited/accr6.png")} />
                            </Column>
                        </Row>
                    </Column>
                    <Column lg={6} className="banner-jumbo">
                        <Header size="sm">Tradesmen</Header>
                        <Header size="lg">Fully Accredited</Header>
                        <Paragraph>All our tradespeople work directly for us. They are background checked, qualified, certified and experienced, so you know you and your home are in safe hands.</Paragraph>
                    </Column>
                </Row>
            </Container>;
        }
    }
}