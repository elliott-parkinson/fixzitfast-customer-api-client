
import Dependencies from "typedi";
import * as React from "react";
import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { 
    Alert,
	AppLayout, Titlebar, Fragment,
    Button, Block,
    Container,
	Card, CardBody, CardHeader,
	Form, FormGroup, Input, InputGroup, InputGroupAddon, Typeahead, Label, Dropzone,
	Header, Paragraph,
	NewLine,
    Nav, NavItem, NavLink,
    Row, Column
} from "../../../Theme";

import { CreateBookingStepper } from "./components/CreateBookingStepper";
import { OrderSummary } from "./components/OrderSummary";

import { Error404 } from "../../Error404";
import { SelectService } from "./SelectService";
import { SelectLocation } from "./SelectLocation";
import { SetDetails } from "./SetDetails";
import { SetContact } from "./SetContact";
import { Payment } from "./Payment";
import { DateAndTime } from "./DateAndTime";
import { PaymentDetails } from "./PaymentDetails";

@withRouter
@observer
export class WizardRoutes extends React.Component<any>
{
	render() {
		let match = this.props.match.url;
		
		return <div className="wizard-routes animate__animated animate__fadeIn animate__delay-02s">
			<Switch>
				<Redirect path={match + "/"} exact to={match + "/services"} />

				<Route path={match + "/services"} exact component={ props => <SelectService.Screen {...props}/> } />
				<Route path={match + "/details"} exact component={ props => <SetDetails.Screen {...props}/> } />
				<Route path={match + "/times"} exact component={ props => <DateAndTime.Screen {...props}/> } />
				<Route path={match + "/contact"} exact component={ props => <SetContact.Screen {...props}/> } />
				<Route path={match + "/paymentdetails"} exact component={ props => <PaymentDetails.Screen {...props}/> } />
				<Route path={match + "/payment"} exact component={ props => <Payment.Screen {...props}/> } />

				
				<Redirect path={match + "/location"} exact to={match + "/times"} />

				<Route component={ props => <Error404.Screen {...props}/> } />
			</Switch>
		</div>;
	}
}


@observer
export default class Routes extends React.Component<any>
{
	@observable Router: any;
	@observable BookingStore: any;

	componentDidMount()
	{
		this.Router =  Dependencies.of("store").get<any>("routes");

		this.BookingStore =  Dependencies.of("fixzitfast-customer-data-store").get<any>("bookings");
        this.BookingStore.InProgress.Load();
	}

	

	@computed get ShowSummary()
	{
		if (this.props.location.pathname.indexOf("/services") !== -1) 		return false;
		if (this.props.location.pathname.indexOf("/paymentdetails") !== -1) return true;
		if (this.props.location.pathname.indexOf("/payment") !== -1) 		return false;

		return true;
	}
	

	@computed get ShowCard()
	{
		if (this.props.location.pathname.indexOf("services") !== -1)
		{
			return false;
		}

		return true;
	}

	@computed get ShowStepper()
	{
		if (this.props.location.pathname.indexOf("/services") !== -1) 		return false;
		if (this.props.location.pathname.indexOf("/paymentdetails") !== -1) return true;
		if (this.props.location.pathname.indexOf("/payment") !== -1) 		return false;

		return true;
	}

	@computed get StepperPosition()
	{
		if (this.props.location.pathname.indexOf("/services") !== -1)		return 0;
		if (this.props.location.pathname.indexOf("/details") !== -1)		return 0;
		if (this.props.location.pathname.indexOf("/times") !== -1)			return 1;
		if (this.props.location.pathname.indexOf("/contact") !== -1)		return 2;
		if (this.props.location.pathname.indexOf("/paymentdetails") !== -1)	return 3;
		if (this.props.location.pathname.indexOf("/payment") !== -1)		return 3;

		return 4;
	}

	render() {
		return <Fragment>
			<Container>
				<Row>
					<Column md={this.ShowSummary ? 8 : 12} xs={12} className="wizard-main">
						<div className={"wizard-steps " + (this.ShowStepper ? "" : "d-none")}>
							<CreateBookingStepper.Component className="animate__animated animate__fadeInDown animate__faster" position={this.StepperPosition} onBack={e => this.Router.Back()}/>
						</div>

						{ this.ShowCard ? 
							<Card className="">
								<CardBody>
									<WizardRoutes />
								</CardBody>
							</Card>
						:
							<WizardRoutes />
						}
						<NewLine />
					</Column>
					<Column md={this.ShowSummary ? 4 : 12} xs={12} className={"wizard-sidebar animate__animated animate__fadeInRight animate__faster d-none d-md-block " + (this.ShowSummary ? "" : "w-0 h-0")}>
						<OrderSummary.Component 
							
						/>
					</Column>
				</Row>
			</Container>
		</Fragment>
	}
}
