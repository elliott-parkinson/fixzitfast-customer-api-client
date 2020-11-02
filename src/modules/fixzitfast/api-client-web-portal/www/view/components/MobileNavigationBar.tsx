import * as React from "react";
import Dependencies from "typedi";

import { 
	Fragment, Container,
    Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarText,
    NewLine
} from "../Theme";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

export namespace MobileNavigationBar
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
            this.Routes = Dependencies.of("store").get<any>("routes");
        }
    
        render() {
            return <Nav justified className="text-center bottom-navbar animate__animated animate__fadeInUp animate__faster d-flex d-sm-none">
                    <NavItem active={(this.Routes?.Location?.indexOf( "/booking/create/services" ) !== -1) ? true : undefined}>
                        <NavLink href="/booking/create/services" onClick={ e => { e.preventDefault(); this.Routes.Go("/booking/create/services"); return false; }}>
                            <i className="fas fa-briefcase" />
                            <NewLine />
                            Services
                        </NavLink>
                    </NavItem>
                    <NavItem active={((this.Routes?.Location?.indexOf( "/booking" ) !== -1) && this.Routes?.Location?.indexOf( "/booking/create/services" ) === -1) ? true : undefined}>
                        <NavLink href="/booking/list" onClick={ e => { e.preventDefault(); this.Routes.Go("/booking/list"); return false; }}>
                            <i className="fas fa-calendar" />
                            <NewLine />
                            Bookings
                        </NavLink>
                    </NavItem>
                    <NavItem active={((this.Routes?.Location?.indexOf( "/account" ) !== -1) || (this.Routes?.Location?.indexOf( "/auth" ) !== -1)) ? true : undefined}>
                        <NavLink href="/account" onClick={ e => { e.preventDefault(); this.Routes.Go("/account"); return false; }}>
                            <i className="fas fa-user" />
                            <NewLine />
                            Account
                        </NavLink>
                    </NavItem>
                    <NavItem active={(this.Routes?.Location?.indexOf( "/notifications" ) !== -1) ? true : undefined}>
                        <NavLink href="/notifications" onClick={ e => { e.preventDefault(); this.Routes.Go("/notifications"); return false; }}>
                            <i className="fas fa-bell" />
                            <NewLine />
                            Notifications
                        </NavLink>
                    </NavItem>
                </Nav>

        }
    }
}