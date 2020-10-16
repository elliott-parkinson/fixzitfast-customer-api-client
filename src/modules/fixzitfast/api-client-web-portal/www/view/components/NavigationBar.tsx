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
            this.Account = Dependencies.of("fixzitfast-customer-store").get<any>("account");
            this.Auth = Dependencies.of("fixzitfast-customer-store").get<any>("auth");
            
            this.Routes = Dependencies.of("store").get<any>("routes");
        }
    
        render() {
            return <Navbar color="light" light expand="md" className="top-navbar animate__animated animate__fadeInDown">
            <Container>
                <NavbarBrand href="/" onClick={ e => { e.preventDefault(); this.Routes.Go("/"); return false; }}>
                    <img src={require("../../../assets/images/site-logo.png")} />
                </NavbarBrand>

                <Nav className="mr-auto" navbar>
                </Nav>

                { this.Auth?.LoggedIn == true ?
                    <Fragment>
                        <NavbarText>{this.Account?.Name}</NavbarText>
                        <NavLink href="/booking/list" onClick={ e => { e.preventDefault(); this.Routes.Go("/booking/list"); return false; }}>My Bookings</NavLink>
                        <NavLink href="/account" onClick={ e => { e.preventDefault(); this.Routes.Go("/account"); return false; }}>My Account</NavLink>
                        <NavLink href="/auth/logout" onClick={ e => { e.preventDefault(); this.Auth.Logout(); return false; }}>Sign out</NavLink>
                    </Fragment>
                :
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="/auth/login" onClick={ e => { e.preventDefault(); this.Routes.Go("/auth/login"); return false; }}>Sign in</NavLink>
                        </NavItem>
                        <NavItem className="highlighted">
                            <NavLink href="/auth/signup" onClick={ e => { e.preventDefault(); this.Routes.Go("/auth/signup"); return false; }}>Sign up</NavLink>
                        </NavItem>
                    </Nav>
                }
            </Container>
        </Navbar>;
        }
    }
}