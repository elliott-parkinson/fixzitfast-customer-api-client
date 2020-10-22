
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
export default class Routes extends React.Component<any>
{
	@observable Router: any;

	componentDidMount()
	{
		this.Router =  Dependencies.of("store").get<any>("routes");
	}

	@computed get ShowStepper()
	{
		return false;
	}

	@computed get StepperPosition()
	{
		return 0;
	}

	render() {
        let match = this.props.match.url;

		return <Fragment>
			{ this.ShowStepper &&
				<CreateBookingStepper.Component position={this.StepperPosition} onBack={e => this.Router.Back()}/>
			}

			<Switch>
				<Redirect path={match + "/"} exact to={match + "/services"} />

				<Route path={match + "/services"} exact component={ props => <SelectService.Screen {...props}/> } />
				<Route path={match + "/location"} exact component={ props => <SelectLocation.Screen {...props}/> } />
				<Route path={match + "/details"} exact component={ props => <SetDetails.Screen {...props}/> } />
				<Route path={match + "/contact"} exact component={ props => <SetContact.Screen {...props}/> } />
				<Route path={match + "/times"} exact component={ props => <DateAndTime.Screen {...props}/> } />
				<Route path={match + "/paymentdetails"} exact component={ props => <PaymentDetails.Screen {...props}/> } />
				<Route path={match + "/payment"} exact component={ props => <Payment.Screen {...props}/> } />

				<Route component={ props => <Error404.Screen {...props}/> } />
			</Switch>;
		</Fragment>
	}
}
