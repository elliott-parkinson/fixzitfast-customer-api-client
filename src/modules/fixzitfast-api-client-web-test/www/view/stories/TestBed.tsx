import * as React from "react";
import Dependencies from "typedi";

import { 
	AppLayout, Titlebar, Fragment,
    Button,
    Container,
	Card, CardBody, CardHeader,
	Form, FormGroup, Input, InputGroup,
	Header,
	NewLine,
    Nav, NavItem, NavLink,
    
} from "../Theme";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";
import { Account } from "./Account";
import { Booking } from "./Booking";
import { Contact } from "./Contact";
import { Engineer } from "./Engineer";
import { Notifications } from "./Notifications";
import { Payment } from "./Payment";
import { Services } from "./Services";

export namespace TestBed
{
    @observer
    export class Screen extends React.Component<any>
    {
        @observable Store: any;
        @observable Router: any;

        @observable SelectedTab = "account";

        componentDidMount()
        {
            this.Store = Dependencies.of("store").get<any>("auth");
            this.Router =  Dependencies.of("store").get<any>("routes");
            Dependencies.of("store").get<any>("site").Title = "TestBed";
        }
    
        render() {
            return <Container>
                <NewLine />
                <Header>Fixzitfast Customer API Testbed</Header>
                <NewLine />
                <Nav pills justified>
                    <NavItem>
                        <NavLink href="#" 
                            active={this.SelectedTab=="account" ? true : false}
                            onClick={  e=> this.SelectedTab="account"}
                        >
                            Account
                        </NavLink>
                    </NavItem>
                    {/*<<NavItem>
                         <NavLink href="#" 
                            active={this.SelectedTab=="booking" ? true : false}
                            onClick={  e=> this.SelectedTab="booking"}
                        >
                            Booking
                        </NavLink>
                    </NavItem>*/}
                    <NavItem>
                         <NavLink href="#" 
                            active={this.SelectedTab=="contact" ? true : false}
                            onClick={  e=> this.SelectedTab="contact"}
                        >
                            Contact
                        </NavLink>
                    </NavItem>
                    <NavItem>
                         <NavLink href="#" 
                            active={this.SelectedTab=="engineer" ? true : false}
                            onClick={  e=> this.SelectedTab="engineer"}
                        >
                            Engineer
                        </NavLink>
                    </NavItem>
                    <NavItem>
                         <NavLink href="#" 
                            active={this.SelectedTab=="notifications" ? true : false}
                            onClick={  e=> this.SelectedTab="notifications"}
                        >
                            Notifications
                        </NavLink>
                    </NavItem>
                    {/*<NavItem>
                         <NavLink href="#" 
                            active={this.SelectedTab=="payment" ? true : false}
                            onClick={  e=> this.SelectedTab="payment"}
                        >
                            Payment
                        </NavLink>
                    </NavItem>*/}
                    <NavItem>
                         <NavLink href="#" 
                            active={this.SelectedTab=="services" ? true : false}
                            onClick={  e=> this.SelectedTab="services"}
                        >
                            Services
                        </NavLink>
                    </NavItem>
                </Nav>

                <Card>
                    <NewLine />
                    { this.SelectedTab=="account" && <Account.Pane /> }
                    { this.SelectedTab=="booking" && <Booking.Pane /> }
                    { this.SelectedTab=="contact" && <Contact.Pane /> }
                    { this.SelectedTab=="engineer" && <Engineer.Pane /> }
                    { this.SelectedTab=="notifications" && <Notifications.Pane /> }
                    { this.SelectedTab=="payment" && <Payment.Pane /> }
                    { this.SelectedTab=="services" && <Services.Pane /> }
                    <NewLine />
                </Card>
            </Container>;
        }
    }
}