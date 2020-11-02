import * as React from "react";
import Dependencies from "typedi";

import { 
	Alert,
	Fragment, Container,
	Row, Column,
	Button, Paragraph, Header, Sentence,
	Nav, Navbar, NavItem, NavLink
} from "../Theme";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

export const config  =
{
    contact: {
        phone: "+44 084937 383728",
        email: "customersupport@fixzitfast.com"
    },
    social: {
        facebook: "https://www.facebook.com/FixzitFast-114531293572849",
        instagram: "https://www.facebook.com/FixzitFast-114531293572849",
        linkedin: "https://www.linkedin.com/company/fixzitfast/",
        twitter: "https://twitter.com/FixzitF"
    }

};

export const SocialLinks = {
	Facebook: "https://www.facebook.com/FixzitFast-114531293572849",
	Instagram: "https://www.facebook.com/FixzitFast-114531293572849",
	Linkedin: "https://www.linkedin.com/company/fixzitfast/",
	Twitter: "https://twitter.com/FixzitF",
}


export namespace Footer
{
    export interface IViewProps
    {
        
    }

    @observer
    export class Component extends React.Component<IViewProps>
    {
        @observable Account;
        @observable Auth;
        @observable Routes;

        componentDidMount()
        {
            if (Dependencies.of("fixzitfast-customer-data-store").has<any>("account"))
            {
                this.Auth = this.Account = Dependencies.of("fixzitfast-customer-data-store").get<any>("account");
            }
            
            this.Routes = Dependencies.of("store").get<any>("routes");
        }

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
            return <footer>
            <Container>
                <Row>
                    <Column md={3} sm={6} xs={12} className="p-3 logo">
                        <Header size="sm">FixzitFast</Header>
                        
                    </Column>
                    <Column md={3} sm={6} xs={12} className="p-3">
                        <NavLink href="/booking/create/services" onClick={ e => { e.preventDefault(); this.Routes.Go("/booking/create/services"); return false; }}>
                            Services
                        </NavLink>
                        <NavLink href="/contact" onClick={ e => { e.preventDefault(); this.Routes.Go("/contact"); return false; }}>
                            Contact Us
                        </NavLink>
                    </Column>
                    <Column md={3} sm={6} xs={12} className="p-3">
                        {/*
                        <Header size="sm">Popular Services</Header>
                        <Alert color="danger">
                            <strong>Error: </strong> Popular services API does not exist.
                        </Alert>
                        */}
                    </Column>
                    <Column md={3} sm={6} xs={12} className="p-3 contact-area">
                        <Header size="sm">Contact us</Header>
                        
                        <Paragraph>
                            { config.contact.phone }
                        </Paragraph>
                        <Paragraph>
                            { config.contact.email }
                        </Paragraph>
                    </Column>
                </Row>
                <Row>
                    <Column md={6} sm={6} xs={12} className="p-3">
                        <Paragraph>It only gets faster with our app.</Paragraph>
                        <Row>
                            <Column lg={5} md={6} sm={6} className="p-1 text-center">
                                <img className="appstore-icon" onClick={e=> this.ViewPlayStore()} title="Get it on Google Play" src={require("../../../assets/images/apps/android_store.png")} />
                            </Column>
                            <Column lg={5} md={5} sm={6} className="p-1 text-center">
                                <img className="appstore-icon" onClick={e=> this.ViewAppStore()} title="Download on the App Store" src={require("../../../assets/images/apps/ios_store.png")} />
                            </Column>
                        </Row> 
                    </Column>
                    <Column md={6} sm={6} xs={12} className="social-links">
                        <a className="social-link" href={config.social.facebook} style={{ background: "white", display: "inline-flex", borderRadius: "7px" }}>
                            <i className="fab fa-facebook-square" style={{ color: "rgb(56, 86, 148)", marginTop: "-4px", marginBottom: "-4px", marginLeft: "-1px", marginRight: "-1px" }} />
                        </a>
                        <a className="social-link" href={config.social.instagram} style={{ background: "white", display: "inline-flex", borderRadius: "18px" }}>
                            <i className="fab fa-instagram" style={{ color: "rgb(63, 108, 148)", marginTop: "-4px", marginBottom: "-4px", marginLeft: "-1px", marginRight: "-1px" }} />
                        </a>
                        <a className="social-link" href={config.social.linkedin} style={{ background: "white", display: "inline-flex", borderRadius: "7px" }}>
                            <i className="fab fa-linkedin" style={{ color: "rgb(0, 119, 180)", marginTop: "-4px", marginBottom: "-4px", marginLeft: "-1px", marginRight: "-1px" }} />
                        </a>
                        <a className="social-link" href={config.social.twitter} style={{ background: "white", display: "inline-flex", borderRadius: "7px" }}>
                            <i className="fab fa-twitter-square" style={{ color: "rgb(40, 164, 217)", marginTop: "-4px", marginBottom: "-4px", marginLeft: "-1px", marginRight: "-1px" }}  />
                        </a>
                    </Column>
                </Row>
                <hr />
                <Navbar expand="md" className="terms-links">
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/terms/contact-privacy" onClick={ e => { e.preventDefault(); this.Routes.Go("/terms/contact-privacy"); return false; }}>Contact Privacy</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/terms/tscs" onClick={ e => { e.preventDefault(); this.Routes.Go("/terms/tscs"); return false; }}>Terms &amp; Conditions</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/terms/cookies" onClick={ e => { e.preventDefault(); this.Routes.Go("/terms/cookies"); return false; }}>Cookies Terms</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/terms/cancellation-policy" onClick={ e => { e.preventDefault(); this.Routes.Go("/terms/cancellation-policy"); return false; }}>Cancellation Policy</NavLink>
                        </NavItem>
                        <NavItem>
                            <Sentence>
                                CO2 408.71 ppm
                            </Sentence>
                        </NavItem>
                    </Nav>
                </Navbar>
            </Container>
        </footer>;
        }
    }
}