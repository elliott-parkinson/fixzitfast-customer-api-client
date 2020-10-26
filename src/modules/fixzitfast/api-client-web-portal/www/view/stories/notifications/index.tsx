import * as React from "react";

import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { observer } from "mobx-react";

import Dependencies from "typedi";

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
} from "../../Theme";

import { observable, computed, action } from "mobx";

import { Error404 } from "../Error404";



@withRouter
@observer
export default class Routes extends React.Component<any>
{        
	@observable Routes: any;
	@observable BookingStore: any;

	componentDidMount()
	{
		this.Routes =  Dependencies.of("store").get<any>("routes");
		Dependencies.of("store").has("site") && (Dependencies.of("store").get<any>("site").Title = "Notifications");
		this.BookingStore =  Dependencies.of("fixzitfast-customer-data-store").get<any>("bookings");
	}


	render() {
        let match = this.props.match.url;

		return <Container className="h-100">
			<Row className="h-100">
				<Column sm={12} md={12} className="fill-area">
					<Card className="animate__animated animate__fadeIn animate__delay-02s">
						<CardBody className="p-4 m-4 full-center">
							<img className="p-4 m-0" style={{maxWidth: "260px"}} src={require("../../../../assets/images/icons/illustration-3.svg")} />
							<NewLine />
							<NewLine />
							<Paragraph className="text-center text-lighter" style={{maxWidth: "260px", marginLeft: "auto", marginRight: "auto"}}>
								No updates yet.
								<NewLine />
								Notifications will appear here.
							</Paragraph>
						</CardBody>
					</Card>
					<NewLine />
				</Column>
			</Row>
		</Container>;
	}
}
