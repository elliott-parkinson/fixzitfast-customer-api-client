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
		try /* Get Services and Featured Services */
		{
			const servicesStore = Dependencies.of("fixzitfast-customer-store").get<any>("services");
			await servicesStore.Update();
			await servicesStore.UpdateFeatured();
			await servicesStore.UpdatePopular();
		}
		catch (exception)
		{
			this.Notifications.Push("Error loading services", exception, "danger")
		}
	}

	@action ViewPlayStore()
	{
		const notificationStore = Dependencies.of("store").get<any>("notifications");
		notificationStore.Push("Error: Not Implemented", "No app yet exists on the play store.", "danger", 2.5);
	}

	@action ViewAppStore()
	{
		const notificationStore = Dependencies.of("store").get<any>("notifications");
		notificationStore.Push("Error: Not Implemented", "No app yet exists on the app store.", "danger", 2.5);
	}

	render() {
		return <Fragment>
			<NavigationBar.Component />
			<Routes />

			<br />
			<hr />
			<footer>
				<Container>
					<Row>
						<Column md={3} sm={6} xs={12} className="p-3">
							<Header size="sm">Fixzitfast</Header>
							
						</Column>
						<Column md={3} sm={6} xs={12} className="p-3">
							<Header size="sm"></Header>
							
						</Column>
						<Column md={3} sm={6} xs={12} className="p-3">
							<Header size="sm">Popular Services</Header>
							<Alert color="danger">
								<strong>Error: </strong> Popular services API does not exist.
							</Alert>
						</Column>
						<Column md={3} sm={6} xs={12} className="p-3">
							<Header size="sm">Contact us</Header>
							
							<Paragraph>
								+44 084937 383728
							</Paragraph>
							<Paragraph>
								customersupport@fixzitfast.com
							</Paragraph>
						</Column>
					</Row>
					<Row>
						<Column md={6} sm={6} xs={12} className="p-3">
							<Paragraph>It only gets faster with our app.</Paragraph>
							<Row>
								<Column lg={6} className="p-1">
									<Button block onClick={e=> this.ViewPlayStore()}>Get it on Google Play</Button>
								</Column>
								<Column lg={6} className="p-1">
									<Button block onClick={e=> this.ViewAppStore()}>Download on the App Store</Button>
								</Column>
							</Row> 
						</Column>
						<Column md={6} sm={6} xs={12} className="p-3 text-right">
							<Button>
								<i className="fab fa-facebook-square" />
							</Button> &nbsp; 
							<Button>
								<i className="fab fa-instagram" />
							</Button> &nbsp; 
							<Button>
								<i className="fab fa-linkedin" />
							</Button> &nbsp; 
							<Button>
								<i className="fab fa-twitter-square" />
							</Button> &nbsp; 
						</Column>
					</Row>
					<hr />
					<Navbar expand="md">
						<Nav className="mr-auto" navbar>
							<NavItem>
								<NavLink href="/terms/contact-privacy" onClick={ e => { e.preventDefault(); this.Routes.Go("/terms/contact-privacy"); return false; }}>Contact Privacy</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/terms/tscs" onClick={ e => { e.preventDefault(); this.Routes.Go("/terms/tscs"); return false; }}>Terms &amp; Conditions</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/terms/cookies" onClick={ e => { e.preventDefault(); this.Routes.Go("/terms/cookies"); return false; }}>Cookies Terms</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/terms/cancellation-policy" onClick={ e => { e.preventDefault(); this.Routes.Go("/terms/cancellation-policy"); return false; }}>Cancellation Policy</NavLink>
							</NavItem>
							<NavItem>
								<NavLink>CO2 408.71 ppm</NavLink>
							</NavItem>
                		</Nav>
					</Navbar>
				</Container>
			</footer>

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