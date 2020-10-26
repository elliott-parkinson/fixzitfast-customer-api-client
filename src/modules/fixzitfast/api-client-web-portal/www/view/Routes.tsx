import * as React from "react";

import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { observer } from "mobx-react";

import Dependencies from "typedi";

import AuthRoutes from "./stories/auth";
import BookingRoutes from "./stories/booking";
import TermsRoutes from "./stories/terms";
import { Account } from "./stories/account/Account";
import { Landing } from "./stories/landing/Landing";
import { Error404 } from "./stories/Error404";
import { Contact } from "./stories/contact/Contact";
import NotificationRoutes from "./stories/notifications";



@withRouter
export class Routes extends React.Component<any>
{
	componentDidMount()
	{
		Dependencies.of("store").has("routes") && Dependencies.of("store").get<any>("routes").SetHistory(this.props.history);
	}

	shouldComponentUpdate(oldProps)
	{
		return !(this.props.location.pathname.indexOf( oldProps.location.pathname.slice(0, 4) === 0));
	}

	render() {
		return <Switch>
			<Route path={"/"} exact component={ props => <Landing.Screen /> } />

			<Route path={"/account"} component={ props => <Account.Screen /> } />
			<Route path={"/auth"} component={ props => <AuthRoutes /> } />
			<Route path={"/booking"} component={ props => <BookingRoutes /> } />
			<Route path={"/contact"} component={ props => <Contact.Screen /> } />
			<Route path={"/terms"} component={ props => <TermsRoutes /> } />
			<Route path={"/notifications"} component={ props => <NotificationRoutes /> } />
		</Switch>;
	}
}
