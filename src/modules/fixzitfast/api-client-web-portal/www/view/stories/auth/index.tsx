import * as React from "react";

import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { observer } from "mobx-react";

import Dependencies from "typedi";

import { Login } from "./Login";
import { Error404 } from "../Error404";
import { Siginup } from "./Siginup";
import { ForgotPassword } from "./ForgotPassword";


@withRouter
@observer
export default class Routes extends React.Component<any>
{
	componentDidMount()
	{
		let routing: any = Dependencies.of("store").get("routes");
		
		Dependencies.of("store").has("site") && (Dependencies.of("store").get<any>("site").Title = "");
	}

	render() {
        let match = this.props.match.url;
		return <Switch>
			<Redirect path={match + "/"} exact to={match + "/login"} />
			<Route path={match + "/login"} exact component={ props => <Login.Screen {...props}/> } />
			<Route path={match + "/signup"} exact component={ props => <Siginup.Screen {...props}/> } />
			<Route path={match + "/forgot-password"} exact component={ props => <ForgotPassword.Screen {...props}/> } />

			<Route component={ props => <Error404.Screen {...props}/> } />
		</Switch>;
	}
}
