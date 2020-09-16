import * as React from "react";

import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { observer } from "mobx-react";

import Container from "typedi";



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
			<Redirect path={"/"} exact to={"/rooms"} />

			{/* Container.of("store").has("identifier") && 
				<Route path={"/identifier"} component={ props => <IdentifierRoutes  {...props}/> } />	
			*/}
		</Switch>;
	}
}
