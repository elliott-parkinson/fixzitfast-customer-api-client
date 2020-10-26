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
            this.Account = Dependencies.of("fixzitfast-customer-data-store").get<any>("account");
            
            this.Routes = Dependencies.of("store").get<any>("routes");
        }
    
        render() {
            return <Nav justified className="text-center bottom-navbar animate__animated animate__fadeInUp d-flex d-sm-none">
                    <NavItem>
                        <NavLink href="/" onClick={ e => { e.preventDefault(); this.Routes.Go("/"); return false; }}>
                            <i className="fas fa-briefcase" />
                            <NewLine />
                            Services
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/" onClick={ e => { e.preventDefault(); this.Routes.Go("/booking/list"); return false; }}>
                            <i className="fas fa-calendar" />
                            <NewLine />
                            Bookings
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/" onClick={ e => { e.preventDefault(); this.Routes.Go("/account"); return false; }}>
                            <i className="fas fa-user" />
                            <NewLine />
                            Account
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/" onClick={ e => { e.preventDefault(); this.Routes.Go("/notifications"); return false; }}>
                            <i className="fas fa-bell" />
                            <NewLine />
                            Notifications
                        </NavLink>
                    </NavItem>
                </Nav>

        }
    }
}