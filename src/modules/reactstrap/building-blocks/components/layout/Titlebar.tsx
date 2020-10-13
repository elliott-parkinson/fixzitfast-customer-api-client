import * as React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

export interface IBrandProps
{
	content?: React.ReactChild[] | string;
    onSelect?: (event: React.MouseEvent) => void;
}

export interface ITitlebarProps
{
	className?: string;
	style?: React.CSSProperties;
    
    brand?: IBrandProps;
}
export const Titlebar = (props: ITitlebarProps) => <Navbar
    className={ ["titlebar", props.className].join(" ") }
    style={{ justifyContent: "center", ...props.style }}
>
    { props.brand && 
        <NavbarBrand href="" onClick={ event => { props.brand.onSelect ? props.brand.onSelect(event) : null; event.preventDefault(); }}>
            { props.brand.content }
        </NavbarBrand>
    }
    <Nav>
        
    </Nav>
</Navbar>;