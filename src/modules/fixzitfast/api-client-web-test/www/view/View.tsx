import * as React from "react";
import Dependencies from "typedi";
import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { Routes } from "./Routes";

import { 
	Fragment, Container,
	Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarText
} from "./Theme";

import { observer } from "mobx-react";
import { observable } from "mobx";


@withRouter
@observer
export class App extends React.Component<any>
{
	@observable Auth;
	@observable Routes;

	componentDidMount()
	{
		Dependencies.of("store").has("routes") && Dependencies.of("store").get<any>("routes").SetHistory(this.props.history);
		
		this.Auth = Dependencies.of("store").get<any>("auth");
		this.Routes = Dependencies.of("store").get<any>("routes");
	}

	render() {
		return <Fragment>
			<Navbar color="light" light expand="md">
				<Container>
					<NavbarBrand href="/">fixzitfast api tests</NavbarBrand>

					<Nav className="mr-auto" navbar>
						<NavItem active={ this.Routes?.Location.indexOf("/customer") == 0 ? true : undefined }>
							<NavLink href="/#" onClick={ e => {  e.preventDefault(); return this.Routes.Go("/customer"); }  }>Customer</NavLink>
						</NavItem>
						<NavItem active={ this.Routes?.Location.indexOf("/engineer") == 0 ? true : undefined }>
							<NavLink href="/#" onClick={ e => { e.preventDefault(); return this.Routes.Go("/engineer");  }  }>Engineer</NavLink>
						</NavItem>
					</Nav>

					{ this.Auth?.LoggedIn == true ?
						<Fragment>
							<NavbarText>Hey {this.Auth.Name}!</NavbarText>
							<NavLink href="/logout" onClick={ e => { e.preventDefault(); this.Auth.Logout(); return false; }}>Logout</NavLink>
						</Fragment>
					:
						<Fragment>
							<NavLink href="/login">Login</NavLink>
						</Fragment>
					}
				</Container>
			</Navbar>
			<Routes />
		</Fragment>;
	}
}

export const View = props => <Router>
	<App />
</Router>;