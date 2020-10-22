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
                        <Column md={4} xs={12} className="selling-point animate__animated animate__fadeIn animate__delay-04s">
                            <img src ={require("../../../../../assets/images/selling-points/professionals.png")} />
                            <br />
                            <br />
                            <Header size="md">Trusted tradespeople</Header>
                            <Paragraph>
                                Our fixers work for us, so we can guarantee they are reliable and fully certified.
                            </Paragraph>

                            { this.props.showButtons &&
                                <Button color="primary" outline onClick={this.props.onClick}>Book now</Button>
                            }
                        </Column>
                        <Column md={4} xs={12} className="selling-point animate__animated animate__fadeIn animate__delay-06s">
                            <img src ={require("../../../../../assets/images/selling-points/schedule.png")} />
                            <br />
                            <br />
                            <Header size="md">Same-day service</Header>
                            <Paragraph>
                                Emergency? Schedule a same-day visit anywhere in Edinburgh and we’ll be there.
                            </Paragraph>

                            { this.props.showButtons &&
                                <Button color="primary" outline onClick={this.props.onClick}>Book now</Button>
                            }
                        </Column>
                        <Column md={4} xs={12} className="selling-point animate__animated animate__fadeIn animate__delay-08s">
                            <img src ={require("../../../../../assets/images/selling-points/speed.png")} />
                            <br />
                            <br />
                            <Header size="md">Make it snappy</Header>
                            <Paragraph>
                                Kick off with a one-hour time slot to identify / fix the problem.
                            </Paragraph>

                            { this.props.showButtons &&
                                <Button color="primary" outline onClick={this.props.onClick}>Book now</Button>
                            }
                        </Column>
                    </Row>
                </Container>
            </div>
        }
    }
}