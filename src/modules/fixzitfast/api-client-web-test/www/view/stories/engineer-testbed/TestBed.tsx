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
    
} from "../../Theme";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

import { Account } from "./stories/Account";
import { Documents } from "./stories/Documents";
import { Job } from "./stories/Job";
import { PurchaseOrders } from "./stories/PurchaseOrders";
import { Stock } from "./stories/Stock";
import { Supplier } from "./stories/Supplier";


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
                <Nav pills justified>
                    <NavItem>
                         <NavLink href="#" 
                            active={this.SelectedTab=="account" ? true : false}
                            onClick={  e=> this.SelectedTab="account"}
                        >
                            Account
                        </NavLink>
                    </NavItem>

                    <NavItem>
                         <NavLink href="#" 
                            active={this.SelectedTab=="documents" ? true : false}
                            onClick={  e=> this.SelectedTab="documents"}
                        >
                            Documents
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink href="#" 
                            active={this.SelectedTab=="job" ? true : false}
                            onClick={  e=> this.SelectedTab="job"}
                        >
                            Job
                        </NavLink>
                    </NavItem>
                    <NavItem>
                         <NavLink href="#" 
                            active={this.SelectedTab=="pos" ? true : false}
                            onClick={  e=> this.SelectedTab="pos"}
                        >
                            Purchase Orders
                        </NavLink>
                    </NavItem>
                    <NavItem>
                         <NavLink href="#" 
                            active={this.SelectedTab=="stock" ? true : false}
                            onClick={  e=> this.SelectedTab="stock"}
                        >
                            Stock
                        </NavLink>
                    </NavItem>
                    <NavItem>
                         <NavLink href="#" 
                            active={this.SelectedTab=="suppliers" ? true : false}
                            onClick={  e=> this.SelectedTab="suppliers"}
                        >
                            Suppliers
                        </NavLink>
                    </NavItem>
                </Nav>

                <Card>
                    <NewLine />
                    { this.SelectedTab=="account" && <Account.Pane /> }
                    { this.SelectedTab=="documents" && <Documents.Pane /> }
                    { this.SelectedTab=="job" && <Job.Pane /> }
                    { this.SelectedTab=="pos" && <PurchaseOrders.Pane /> }
                    { this.SelectedTab=="stock" && <Stock.Pane /> }
                    { this.SelectedTab=="suppliers" && <Supplier.Pane /> }
                    <NewLine />
                </Card>
            </Container>;
        }
    }
}