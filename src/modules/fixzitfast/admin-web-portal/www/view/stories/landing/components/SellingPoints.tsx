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
    }

    @observer
    export class Component extends React.Component<IViewProps>
    {
        render() {
            return <Row className="selling-points">
            <Column md={4} xs={12} className="selling-point animate__animated animate__fadeIn animate__delay-04s">
                <i className="fas fa-images fa-3x" />
                <br />
                <br />
                <Header size="md">Trusted tradespeople</Header>
                <Paragraph>
                    Our fixers work for us, so we can guarantee they are reliable and fully certified.
                </Paragraph>

                <Button color="primary" outline onClick={this.props.onClick}>Book now</Button>
            </Column>
            <Column md={4} xs={12} className="selling-point animate__animated animate__fadeIn animate__delay-06s">
                <i className="fas fa-images fa-3x" />
                <br />
                <br />
                <Header size="md">Same-day service</Header>
                <Paragraph>
                    Emergency? Schedule a same-day visit anywhere in Edinburgh and we’ll be there.
                </Paragraph>

                <Button color="primary" outline onClick={this.props.onClick}>Book now</Button>
            </Column>
            <Column md={4} xs={12} className="selling-point animate__animated animate__fadeIn animate__delay-08s">
                <i className="fas fa-images fa-3x" />
                <br />
                <br />
                <Header size="md">Make it snappy</Header>
                <Paragraph>
                    Kick off with a one-hour slot any time from 4.30pm - 8am to identify/fix the problem.
                </Paragraph>

                <Button color="primary" outline onClick={this.props.onClick}>Book now</Button>
            </Column>
        </Row>
        }
    }
}