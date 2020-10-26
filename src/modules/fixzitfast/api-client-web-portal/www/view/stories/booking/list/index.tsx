import * as React from "react";

import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { observer } from "mobx-react";

import Dependencies from "typedi";

import { 
    Alert,
	AppLayout, Titlebar, Fragment,
    Button, Block,
    Container,
	Card, CardBody, CardHeader,
	Form, FormGroup, Input, InputGroup, InputGroupAddon, Typeahead, Label, Dropzone,
	Header, Paragraph,
	NewLine,
    Nav, NavItem, NavLink,
    Row, Column
} from "../../../Theme";

import { observable, computed, action } from "mobx";

import { Error404 } from "../../Error404";
import { Upcoming } from "./Upcoming";
import { Past } from "./Past";
import { Draft } from "./Draft";


@observer
export class Tabs extends React.Component<any>
{
	@observable Routes: any;

	componentDidMount()
	{
		this.Routes =  Dependencies.of("store").get<any>("routes");
	}

	render() {
		return <Nav tabs justified>
			<NavItem active={(this.Routes?.Location?.indexOf( "/upcoming" ) !== -1) ? true : undefined}>
				<NavLink href="./upcoming"
					onClick={ e => { e.preventDefault(); this.Routes.Go("./upcoming"); return false; }}
				>
					Upcoming
				</NavLink>
			</NavItem>
			<NavItem active={(this.Routes?.Location?.indexOf( "/past" ) !== -1) ? true : undefined}>
				<NavLink href="./past"
					onClick={ e => { e.preventDefault(); this.Routes.Go("./past"); return false; }}
				>
					Past
				</NavLink>
			</NavItem>
			<NavItem active={(this.Routes?.Location?.indexOf( "/draft" ) !== -1) ? true : undefined}>
				<NavLink href="./draft"
					onClick={ e => { e.preventDefault(); this.Routes.Go("./draft"); return false; }}
				>
					Draft
				</NavLink>
			</NavItem>
		</Nav>;
	}
}


@withRouter
@observer
export default class Routes extends React.Component<any>
{        
	@observable Routes: any;
	@observable BookingStore: any;

	componentDidMount()
	{
		this.Routes =  Dependencies.of("store").get<any>("routes");
		Dependencies.of("store").has("site") && (Dependencies.of("store").get<any>("site").Title = "My Bookings");
		this.BookingStore =  Dependencies.of("fixzitfast-customer-data-store").get<any>("bookings");
	}


	render() {
        let match = this.props.match.url;

		return <Container>
			<Row>
				<Column sm={12} md={6} className="fill-area">
					<Header size="xl" className="page-header">Bookings</Header>
					<Tabs />
					<Switch>
						<Redirect path={match + "/"} exact to={match + "/upcoming"} />

						<Route path={match + "/upcoming"} exact component={ props => <Upcoming.Screen {...props}/> } />
						<Route path={match + "/past"} exact component={ props => <Past.Screen {...props}/> } />
						<Route path={match + "/draft"} exact component={ props => <Draft.Screen {...props}/> } />

						<Route component={ props => <Error404.Screen {...props}/> } />
					</Switch>
				</Column>
				<Column sm={12} md={6} className="full-center d-none d-lg-inline-flex">
					<img className="p-0 m-0" src={require("../../../../../assets/images/bookings-bg.png")} />
				</Column>
			</Row>
		</Container>;
	}
}
