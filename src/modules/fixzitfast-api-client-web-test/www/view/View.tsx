import * as React from "react";
import Services from "typedi";
import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { Routes } from "./Routes";

import { 
	Fragment,
} from "./Theme";

import { observer } from "mobx-react";
import { TestBed } from "./stories/TestBed";


@withRouter
@observer
export class App extends React.Component<any>
{
	componentDidMount()
	{
		Services.of("store").has("routes") && Services.of("store").get<any>("routes").SetHistory(this.props.history);
	}

	render() {
		return <Fragment>
			<Switch>
				<Route path={"/"} component={ props => <TestBed.Screen {...props}/> } />
			</Switch>;
		</Fragment>;
	}
}


export const View = props => <Router>
	<App />
</Router>;