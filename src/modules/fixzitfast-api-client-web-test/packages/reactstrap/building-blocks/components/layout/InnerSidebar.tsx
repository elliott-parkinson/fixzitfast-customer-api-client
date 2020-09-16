import * as React from "react";
import {
	ListGroup, ListGroupItem,
} from "../";

export const InnerSidebar = props => <div className={["app-inner-sidebar", props.className].join(" ")}>
    {props.children}
</div>


export const InnerSidebarSearch = props => <div className="inner-sidebar-search">
    {props.children}
</div>

export const InnerSidebarList = props => <div className="inner-sidebar-list">
    <ListGroup>
        {props.children}
    </ListGroup>
</div>

export const InnerSideArea = props => <div className="app-inner-sidearea">
    {props.children}
</div>


export const InnerSidebarListItem = props => <ListGroupItem onClick={props.onClick}>
    { props.imageUrl && <img className="list-group-item-image" src={props.imageUrl} /> }
    <div className="list-group-item-data">
        {props.children}
    </div>
</ListGroupItem>