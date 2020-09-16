import * as React from "react";
import Dependencies from "typedi";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

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

import { ApiResponseData } from "../../model/ApiResponseData";
import { TestCard } from "../../components/TestCard";

export namespace Login
{
    class LoginForm
    {
        @observable ResponseData = new ApiResponseData;
        @observable Email: string = "";
        @observable Password: string = "";

        @action async Submit()
        {
            this.ResponseData.Reset();
            this.ResponseData.Loading = true;

            const apiStore =  Dependencies.of("store").get<any>("api");
            const authStore =  Dependencies.of("store").get<any>("auth");

            let response = await this.ResponseData.ProcessFor(
                i => apiStore.Account.Login(this.Email, this.Password)
            );

            if (response.Success == true)
            {
                let userDetailsResponse = await apiStore.Account.GetUserDetails(response.Data.id);

                authStore.PopulateDetails({
                    Id: userDetailsResponse.Data.accountDetails.id ? userDetailsResponse.Data.accountDetails.name : userDetailsResponse.Data.accountDetails.ID,
                    Name: userDetailsResponse.Data.accountDetails.name ? userDetailsResponse.Data.accountDetails.name : userDetailsResponse.Data.accountDetails.Name,
                    Email: userDetailsResponse.Data.accountDetails.email ? userDetailsResponse.Data.accountDetails.email : userDetailsResponse.Data.accountDetails.Email,
                    Phone: userDetailsResponse.Data.accountDetails.phone ? userDetailsResponse.Data.accountDetails.phone : userDetailsResponse.Data.accountDetails.Phone
                });
            }
        }
    }

    @observer
    export class Screen extends React.Component<any>
    {
        @observable Store: any;
        @observable Router: any;

        @observable Login = new LoginForm;

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
  

                <Fragment>
                    
                <Form onSubmit={e => { this.Login.Submit(); e.preventDefault(); return false; }}>
                    <Header size="lg">Sign in with email</Header>
                    <FormGroup>
                        <Input placeholder="Type email address" type="email" value={this.Login.Email} onChange={e => this.Login.Email = e.target.value} />
                    </FormGroup>
                    <FormGroup>
                        <Input placeholder="Password" type="password" value={this.Login.Password} onChange={e => this.Login.Password = e.target.value} />
                    </FormGroup>

                    <Button block>Sign in</Button>
                </Form>

                </Fragment>
            </Container>;
        }
    }
}