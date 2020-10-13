import * as React from "react";
import Dependencies from "typedi";

import { 
	Fragment, Container,
    Row, Column, Block, Header, Paragraph
} from "../../../Theme";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

export namespace HowItWorks
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
                    <Block>
                    <i className="fas fa-mobile fa-5x" />
                    </Block>
                </Column>
                <Column lg={6} className="vertical-center">
                    <Header>How it works</Header>
                    <Paragraph>With FixzitFast there’s no need to post your request and sift through thousands of tradespeoples’ profiles or quotes - we take the hard work out of getting the job done.</Paragraph>
                    <Paragraph>Just download the app, sign up for an account and enter the service you need. Not sure what the problem is? Include pictures and a description and we’ll send someone round to assess the issue - with the right tools to fix it then and there, if possible.</Paragraph>
                </Column>
            </Row>
        }
    }
}