import * as React from "react";
import Dependencies from "typedi";

import { 
	Fragment, Container,
    Row, Column, Block, Header, Paragraph, Button
} from "../../../Theme";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

export namespace AppBanner
{
    export interface IViewProps
    {
    }

    @observer
    export class Component extends React.Component<IViewProps>
    {
        @action ViewPlayStore()
        {
            const notificationStore = Dependencies.of("store").get<any>("notifications");
		    notificationStore.Push("Error: Not Implemented", "No app yet exists on the play store.", "danger", 2.5);
        }

        @action ViewAppStore()
        {
            const notificationStore = Dependencies.of("store").get<any>("notifications");
		    notificationStore.Push("Error: Not Implemented", "No app yet exists on the app store.", "danger", 2.5);
        }
        
        render() {
            return <Row>
                <Column lg={6} className="full-center">
                    <Block>
                    <i className="fas fa-mobile fa-5x" />
                    </Block>
                </Column>
                <Column lg={6} className="vertical-center">
                    <Header>IOS and Android ready!</Header>
                    <Paragraph>Just download the app, set up an account and you’re ready to go. You can find and book common repair jobs, or request something different. You’ll get notifications about the location of your tradesperson and you can pay for the repair, straight from your phone.</Paragraph>
                    <Row>
                        <Column lg={6} className="p-1">
                            <Button block onClick={e=> this.ViewPlayStore()}>Get it on Google Play</Button>
                        </Column>
                        <Column lg={6} className="p-1">
                            <Button block onClick={e=> this.ViewAppStore()}>Download on the App Store</Button>
                        </Column>
                    </Row> 
                </Column>
            </Row>;
        }
    }
}