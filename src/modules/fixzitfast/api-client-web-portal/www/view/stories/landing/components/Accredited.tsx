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
            return <Row>
                <Column lg={6} className="full-center">
                    <Row>
                        <Column md={4} sm={6} xs={12} className="0-1">
                            <i className="fas fa-images fa-3x" />
                        </Column>
                        <Column md={4} sm={6} xs={12} className="0-1">
                            <i className="fas fa-images fa-3x" />
                        </Column>
                        <Column md={4} sm={6} xs={12} className="0-1">
                            <i className="fas fa-images fa-3x" />
                        </Column>
                        <Column md={4} sm={6} xs={12} className="0-1">
                            <i className="fas fa-images fa-3x" />
                        </Column>
                        <Column md={4} sm={6} xs={12} className="0-1">
                            <i className="fas fa-images fa-3x" />
                        </Column>
                        <Column md={4} sm={6} xs={12} className="0-1">
                            <i className="fas fa-images fa-3x" />
                        </Column>
                    </Row>
                </Column>
                <Column lg={6} className="vertical-center">
                    <Header size="sm">Tradesmen</Header>
                    <Header>Fully Accredited</Header>
                    <Paragraph>All our tradespeople work directly for us. They are background checked, qualified, certified and experienced, so you know you and your home are in safe hands.</Paragraph>
                </Column>
            </Row>;
        }
    }
}