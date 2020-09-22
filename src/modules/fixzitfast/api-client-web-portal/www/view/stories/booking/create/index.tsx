import * as React from "react";

import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { observer } from "mobx-react";

import Dependencies from "typedi";

import { Error404 } from "../../Error404";
import { SelectService } from "./SelectService";
import { SelectLocation } from "./SelectLocation";
import { SetDetails } from "./SetDetails";
import { SetContact } from "./SetContact";


@withRouter
@observer
export default class Routes extends React.Component<any>
{

	render() {
        let match = this.props.match.url;

		return <Switch>
			<Redirect path={match + "/"} exact to={match + "/services"} />

			<Route path={match + "/services"} exact component={ props => <SelectService.Screen {...props}/> } />
			<Route path={match + "/location"} exact component={ props => <SelectLocation.Screen {...props}/> } />
			<Route path={match + "/details"} exact component={ props => <SetDetails.Screen {...props}/> } />
			<Route path={match + "/contact"} exact component={ props => <SetContact.Screen {...props}/> } />

			<Route component={ props => <Error404.Screen {...props}/> } />
		</Switch>;
	}
}
