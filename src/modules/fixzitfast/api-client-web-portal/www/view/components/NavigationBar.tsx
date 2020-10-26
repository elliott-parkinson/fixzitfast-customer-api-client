import * as React from "react";
import Dependencies from "typedi";

import { 
	Fragment, Container,
	Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarText
} from "../Theme";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

export namespace NavigationBar
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
            this.Account = Dependencies.of("fixzitfast-customer-data-store").get<any>("account");
            
            this.Routes = Dependencies.of("store").get<any>("routes");
        }
    
        render() {
            return <Navbar color="light" light expand="md" className="top-navbar animate__animated animate__fadeInDown d-none d-sm-flex">
            <Container>
                <NavbarBrand href="/" onClick={ e => { e.preventDefault(); this.Routes.Go("/"); return false; }}>
                    <img src={require("../../../assets/images/site-logo.png")} />
                </NavbarBrand>

                <Nav className="ml-auto">
                    { this.Account?.LoggedIn == true ?
                        <Fragment>
                            {/*
                            <NavbarText>{this.Account?.CurrentUser?.Name}</NavbarText>
                            */}
                            <NavLink href="/booking/create/services"
                                active={(this.Routes?.Location?.indexOf( "/booking/create/services" ) !== -1) ? true : undefined}
                                onClick={ e => { e.preventDefault(); this.Routes.Go("/booking/create/services"); return false; }}
                            >
                                Services
                            </NavLink>
                            <NavLink href="/booking/list"
                                active={((this.Routes?.Location?.indexOf( "/booking" ) !== -1) && this.Routes?.Location?.indexOf( "/booking/create/services" ) === -1) ? true : undefined}
                                onClick={ e => { e.preventDefault(); this.Routes.Go("/booking/list"); return false; }}
                            >
                                Bookings
                            </NavLink>
                            <NavLink href="/account"
                                active={(this.Routes?.Location?.indexOf( "/account" ) !== -1) ? true : undefined}
                                onClick={ e => { e.preventDefault(); this.Routes.Go("/account"); return false; }}
                            >
                                Account
                            </NavLink>
                            <NavLink href="/notifications"
                                active={(this.Routes?.Location?.indexOf( "/notifications" ) !== -1) ? true : undefined}
                                onClick={ e => { e.preventDefault(); this.Routes.Go("/notifications"); return false; }}
                            >
                                Notifications
                            </NavLink>
                            
                            <NavItem className="highlighted">
                                <NavLink href="/auth/logout" onClick={ e => { e.preventDefault(); this.Account.Logout(); return false; }}>
                                    Sign out
                                </NavLink>
                            </NavItem>
                        </Fragment>
                    : this.Account != undefined && 
                        <Fragment>
                            <NavLink href="/booking/create/services"
                                active={(this.Routes?.Location?.indexOf( "/booking/create/services" ) !== -1) ? true : undefined}
                                onClick={ e => { e.preventDefault(); this.Routes.Go("/booking/create/services"); return false; }}
                            >
                                Services
                            </NavLink>
                            <NavLink href="/booking/create"
                                active={((this.Routes?.Location?.indexOf( "/booking" ) !== -1) && this.Routes?.Location?.indexOf( "/booking/create/services" ) === -1) ? true : undefined}
                                onClick={ e => { e.preventDefault(); this.Routes.Go("/booking/create"); return false; }}
                            >
                                Bookings
                            </NavLink>

                            <NavItem>
                                <NavLink href="/auth/login" onClick={ e => { e.preventDefault(); this.Routes.Go("/auth/login"); return false; }}>Sign in</NavLink>
                            </NavItem>
                            <NavItem className="highlighted">
                                <NavLink href="/auth/signup" onClick={ e => { e.preventDefault(); this.Routes.Go("/auth/signup"); return false; }}>Sign up</NavLink>
                            </NavItem>
                        </Fragment>
                    }
                </Nav>
            </Container>
        </Navbar>;
        }
    }
}