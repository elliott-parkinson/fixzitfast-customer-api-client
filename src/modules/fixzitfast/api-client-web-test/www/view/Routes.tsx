import * as React from "react";

import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { observer } from "mobx-react";

import Container from "typedi";
import { TestBed as CustomerTestBed } from "./stories/customer-testbed/TestBed";
import { TestBed as EngineerTestBed } from "./stories/engineer-testbed/TestBed";
import { Login } from "./stories/auth/Login";



@withRouter
@observer
export class Routes extends React.Component<any>
{
	componentDidMount()
	{
		Container.of("store").has("routes") && Container.of("store").get<any>("routes").SetHistory(this.props.history);
	}

	render() {
		return <Switch>
			<Redirect path={"/"} exact to={"/customer"} />
			<Route path={"/customer"} component={ props => <CustomerTestBed.Screen {...props}/> } />
			<Route path={"/engineer"} component={ props => <EngineerTestBed.Screen {...props}/> } />
			<Route path={"/login"} component={ props => <Login.Screen {...props}/> } />
		</Switch>;
	}
}
