import * as React from "react";
import Dependencies from "typedi";

import { 
	Fragment, Container, Block, Header,
    Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarText,
    NewLine
} from "../Theme";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

export namespace MobileHeaderBar
{
    export interface IViewProps
    {
        
    }

    @observer
    export class Component extends React.Component<IViewProps>
    {
        @observable Account;
        @observable Auth;
        @observable Site;
        @observable Routes;

        componentDidMount()
        {
            Dependencies.of("store").has("site") && (this.Site = Dependencies.of("store").get<any>("site"));
            
            this.Routes = Dependencies.of("store").get<any>("routes");
        }
    
        render() {
            if (this.Site?.Title)
            {
                return <Block className="mobile-header-bar">
                    <Header size="xl">{ this.Site?.Title }</Header>
                </Block>;
            }
            else
            {
                return <Fragment></Fragment>;
            }
        }
    }
}