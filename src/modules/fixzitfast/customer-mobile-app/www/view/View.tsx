import * as React from "react";
import Dependencies from "typedi";
import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { Routes } from "./Routes";

import {
	Alert,
	Fragment, Container,
	Row, Column,
	Button, Paragraph, Header,
	Nav, Navbar, NavItem, NavLink
} from "./Theme";

import { observer } from "mobx-react";
import { observable, action } from "mobx";
import { NavigationBar } from "./components/NavigationBar";
import { ModalController } from "../model/controller/ModalController";
import { StandardModal } from "./components/StandardModal";
import { StandardNotification } from "./components/StandardNotification";
import { NotificationsOverlay } from "./components/NotificationsOverlay";
import { Footer } from "./components/Footer";


@withRouter
@observer
export class App extends React.Component<any>
{
	@observable Routes;
	@observable Modals;
	@observable Notifications;

	async componentDidMount()
	{
		Dependencies.of("store").has("routes") && Dependencies.of("store").get<any>("routes").SetHistory(this.props.history);

		this.Routes = Dependencies.of("store").get<any>("routes");
		this.Modals = Dependencies.of("store").get<any>("modals");
		this.Notifications = Dependencies.of("store").get<any>("notifications");

		this.Init();
	}

	@action async Init()
	{
		
	}

	render() {
		return <Fragment>
			<NavigationBar.Component />
			<div className="content">
				<Routes />
			</div>
			<Footer.Component />
			<StandardModal.Component
				isOpen={this.Modals?.IsOpen}
				toggle={e => this.Modals?.Toggle()}
				close={e => this.Modals?.Close()}
				titleText={this.Modals?.TitleText}
				descriptionText={this.Modals?.DescriptionText}
			/>

			<NotificationsOverlay.Component notifications={this.Notifications?.Notifications}/>
		</Fragment>;
	}
}

export const View = props => <Router>
	<App />
</Router>;