import * as React from "react";
import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { observer } from "mobx-react";
import { observable } from "mobx";

import Dependencies from "typedi";

import { 
	AppLayout, Titlebar, Fragment,
    Button,
    Container, Block, Row, Column,
	Card, CardBody, CardHeader,
	Form, FormGroup, Input, InputGroup, Label,
	Header,
	NewLine,
    Nav, NavItem, NavLink, Navbar,
} from "../../Theme";


import { Error404 } from "../Error404";
import { CancellationPolicy } from "./CancellationPolicy";
import { ContactPrivacy } from "./ContactPrivacy";
import { CookiesPolicy } from "./CookiesPolicy";
import { TermsAndConditions } from "./TermsAndConditions";

function ltrim(str, chr) {
	if (str.indexOf(chr) === 0)
	{
		return str.slice(chr.length);
	}
	return str;
}

let NavUrl = props => <NavItem>
	<NavLink href={ props.href }
		active={(props.location?.indexOf( ltrim(props.href, ".") ) !== -1) ? true : undefined}
		onClick={ e => { e.preventDefault(); props.onClick(props.href); return false; }}
	>
		{props.children}
	</NavLink>
</NavItem>;

@withRouter
@observer
export default class Routes extends React.Component<any>
{
	@observable Routes;

	@observable SelectedTab = "account";

	componentDidMount()
	{
        this.Routes = Dependencies.of("store").get<any>("routes");
	}

	render() {
		let match = this.props.match.url;

		return <Container>
			<Nav pills justified>
				<NavUrl href="./contact-privacy" location={this.Routes?.Location} onClick={ url => this.Routes.Go(url) }>Contact Privacy</NavUrl>
				<NavUrl href="./tscs" location={this.Routes?.Location} onClick={ url => this.Routes.Go(url) }>Terms &amp; Conditions</NavUrl>
				<NavUrl href="./cookies" location={this.Routes?.Location} onClick={ url => this.Routes.Go(url) }>Cookies Policy</NavUrl>
				<NavUrl href="./cancellation-policy" location={this.Routes?.Location} onClick={ url => this.Routes.Go(url) }>Cancellation Policy</NavUrl>
			</Nav>
			<NewLine />
			<Switch>
				<Redirect path={match + "/"} exact to={match + "/tcs"} />
				
				<Route path={match + "/contact-privacy"} component={ props => <ContactPrivacy.Screen {...props}/> } />
				<Route path={match + "/tscs"} component={ props => <TermsAndConditions.Screen {...props}/> } />
				<Route path={match + "/cookies"} component={ props => <CookiesPolicy.Screen {...props}/> } />
				<Route path={match + "/cancellation-policy"} component={ props => <CancellationPolicy.Screen {...props}/> } />

				<Route component={ props => <Error404.Screen {...props}/> } />
			</Switch>
		</Container>;
	}
}
