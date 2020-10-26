import * as React from "react";
import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { observer } from "mobx-react";

import Dependencies from "typedi";


import CreateRoutes from "./create";
import ListRoutes from "./list";
import { Error404 } from "../Error404";

@withRouter
export default class Routes extends React.Component<any>
{
	shouldComponentUpdate(oldProps)
	{
		return !(this.props.location.pathname.indexOf( oldProps.location.pathname.slice(0, 4) === 0));
	}

	render() {
		let match = this.props.match.url;

		return <Switch>
			<Redirect path={match + "/"} exact to={match + "/create"} />
			
			<Route path={match + "/create"} component={ props => <CreateRoutes {...props}/> } />
			<Route path={match + "/list"} component={ props => <ListRoutes {...props}/> } />

			<Route component={ props => <Error404.Screen {...props}/> } />
		</Switch>;
	}
}
