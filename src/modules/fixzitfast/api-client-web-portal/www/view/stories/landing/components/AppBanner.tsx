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
            return <Container className="jumbo-container">
                <Row>
                    <Column lg={6}>
                        <div className="apps-image" />
                    </Column>
                    <Column lg={6} className="banner-jumbo">
                        <Header size="lg">IOS and Android ready!</Header>
                        <Paragraph>Just download the app, set up an account and you’re ready to go. You can find and book common repair jobs, or request something different. You’ll get notifications about the location of your tradesperson and you can pay for the repair, straight from your phone.</Paragraph>
                        
                        <Row>
                            <Column lg={5} md={6} sm={6} className="p-1 text-center">
                                <img className="appstore-icon" onClick={e=> this.ViewPlayStore()} title="Get it on Google Play" src={require("../../../../../assets/images/apps/android_store.png")} />
                            </Column>
                            <Column lg={5} md={5} sm={6} className="p-1 text-center">
                                <img className="appstore-icon" onClick={e=> this.ViewAppStore()} title="Download on the App Store" src={require("../../../../../assets/images/apps/ios_store.png")} />
                            </Column>
                        </Row>
                    </Column>
                </Row>
            </Container>;
        }
    }
}