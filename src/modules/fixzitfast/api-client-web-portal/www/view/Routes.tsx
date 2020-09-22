import * as React from "react";

import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { observer } from "mobx-react";

import Dependencies from "typedi";

import AuthRoutes from "./stories/auth";
import BookingRoutes from "./stories/booking";
import { Landing } from "./stories/landing/Landing";
import { Error404 } from "./stories/Error404";
import { Account } from "./stories/account/Account";



@withRouter
@observer
export class Routes extends React.Component<any>
{
	componentDidMount()
	{
		Dependencies.of("store").has("routes") && Dependencies.of("store").get<any>("routes").SetHistory(this.props.history);
	}

	render() {
		return <Switch>
			<Route path={"/"} exact component={ props => <Landing.Screen {...props}/> } />

			<Route path={"/account"} component={ props => <Account.Screen {...props}/> } />
			<Route path={"/auth"} component={ props => <AuthRoutes {...props}/> } />
			<Route path={"/booking"} component={ props => <BookingRoutes {...props}/> } />

			<Route component={ props => <Error404.Screen {...props}/> } />
		</Switch>;
	}
}
