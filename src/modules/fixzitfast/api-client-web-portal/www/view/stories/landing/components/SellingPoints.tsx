import * as React from "react";
import Dependencies from "typedi";

import { 
	Fragment, Container,
    Row, Column, Block, Header, Paragraph, Button
} from "../../../Theme";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

export namespace SellingPoints
{
    export interface IViewProps
    {
        onClick?: Function;
        showButtons: boolean;
    }

    @observer
    export class Component extends React.Component<IViewProps>
    {
        render() {
            return <div className="selling-points">
                <Container>
                    <Row>
                        <Column md={4} xs={12} className="selling-point animate__animated animate__fadeIn animate__delay-00s">
                            <div className="content">
                                <div className="icon-container">
                                    <img src={require("../../../../../assets/images/icons/selling-point1.svg")} />
                                </div>
                                <Header size="md">Trusted tradespeople</Header>
                                <Paragraph>
                                    Our fixers work for us, so we can guarantee they are reliable and fully certified.
                                </Paragraph>
                            </div>

                            { this.props.showButtons &&
                                <Button color="primary" onClick={this.props.onClick}>Book</Button>
                            }
                        </Column>
                        <Column md={4} xs={12} className="selling-point animate__animated animate__fadeIn animate__delay-01s">
                            <div className="content">
                                <div className="icon-container">
                                    <img src={require("../../../../../assets/images/icons/selling-point2.svg")} />
                                </div>
                                <Header size="md">Same-day service</Header>
                                <Paragraph>
                                    Emergency? Schedule a same-day visit anywhere in Edinburgh and we’ll be there.
                                </Paragraph>
                            </div>

                            { this.props.showButtons &&
                                <Button color="primary" onClick={this.props.onClick}>Book</Button>
                            }
                        </Column>
                        <Column md={4} xs={12} className="selling-point animate__animated animate__fadeIn animate__delay-02s">
                            <div className="content">
                                <div className="icon-container">
                                    <img src={require("../../../../../assets/images/icons/selling-point3.svg")} />
                                </div>
                                <Header size="md">Make it snappy</Header>
                                <Paragraph>
                                    Kick off with a one-hour time slot to identify / fix the problem.
                                </Paragraph>
                            </div>

                            { this.props.showButtons &&
                                <Button color="primary" onClick={this.props.onClick}>Book</Button>
                            }
                        </Column>
                    </Row>
                </Container>
            </div>
        }
    }
}