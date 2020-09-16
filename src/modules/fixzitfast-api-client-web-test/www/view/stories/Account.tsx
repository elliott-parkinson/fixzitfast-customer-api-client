import * as React from "react";
import Dependencies from "typedi";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

import { 
    Alert, Fragment,
    Container,
    Form, FormGroup, Input, InputGroup,
    NewLine,
} from "../Theme";

import { ApiResponseData } from "../model/ApiResponseData";
import { TestCard } from "../components/TestCard";

export namespace Account
{
    class SignupForm
    {
        @observable ResponseData = new ApiResponseData;
        
        @observable Name: string = "";
        @observable Email: string = "";
        @observable Password: string = "";
        @observable Phone: string = "";

        @action async Submit()
        {
            this.ResponseData.Reset();
            this.ResponseData.Loading = true;

            const apiStore =  Dependencies.of("store").get<any>("api");

            this.ResponseData.ProcessFor(
                i => apiStore.Account.Signup(this.Name, this.Email, this.Password, this.Phone)
            );
        }
    }

    
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
                i => apiStore.Account.Login(this.Email, this.Password);
            );

            console.warn(response);
                    authStore.Id = response.Data.id;
        }
    }
    class ForgotPasswordForm
    {
        @observable ResponseData = new ApiResponseData;
        @observable Email: string = "";

        @action async Submit()
        {
            this.ResponseData.Reset();
            this.ResponseData.Loading = true;

            const apiStore =  Dependencies.of("store").get<any>("api");

            this.ResponseData.ProcessFor(
                i => apiStore.Account.ForgotPassword(this.Email)
            );
        }
    }
    class ResetPasswordForm
    {
        @observable ResponseData = new ApiResponseData;
        @observable Id: string = "";
        @observable Password: string = "";
        @observable OldPassword: string = "";

        @action async Submit()
        {
            this.ResponseData.Reset();
            this.ResponseData.Loading = true;

            const apiStore =  Dependencies.of("store").get<any>("api");

            this.ResponseData.ProcessFor(
                i => apiStore.Account.ResetPassword(this.Id, this.Password, this.OldPassword)
            );
        }
    }
    class GetUserDetailsForm
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
            let userId =  authStore.Id;

            this.ResponseData.ProcessFor(
                i => apiStore.Account.GetUserDetails(userId)
            );
        }
    }
    class UpdateUserDetailsForm
    {
        @observable ResponseData = new ApiResponseData;
        
        @observable Name: string = "";
        @observable Email: string = "";
        @observable Password: string = "";
        @observable Phone: string = "";

        @action async Submit()
        {
            this.ResponseData.Reset();
            this.ResponseData.Loading = true;

            const apiStore =  Dependencies.of("store").get<any>("api");
            const authStore =  Dependencies.of("store").get<any>("auth");
            let userId =  authStore.Id;

            this.ResponseData.ProcessFor(
                i => apiStore.Account.UpdateUserDetails(userId, this.Name, this.Email, this.Password, this.Phone)
            );
        }
    }

    @observer
    export class Pane extends React.Component<any>
    {
        @observable Signup = new SignupForm;
        @observable Login = new LoginForm;
        @observable ForgotPassword = new ForgotPasswordForm;
        @observable ResetPassword = new ResetPasswordForm;
        @observable GetUserDetails = new GetUserDetailsForm;
        @observable UpdateUserDetails = new UpdateUserDetailsForm;


        componentDidMount()
        {
            Dependencies.of("store").get<any>("site").Title = "TestBed - Account";
        }
    
        render() {
            return <Container>
                <TestCard.Component
                    title="Login"
                    form={this.Login}

                    formElements={ <Fragment>
                        <FormGroup>
                            <Input placeholder="Email" type="email" value={this.Login.Email} onChange={e => this.Login.Email = e.target.value} />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Password" type="password" value={this.Login.Password} onChange={e => this.Login.Password = e.target.value} />
                        </FormGroup>
                    </Fragment>}
                />
                <NewLine />
                <TestCard.Component
                    title="Signup"
                    form={this.Signup}

                    formElements={ <Fragment>
                        <FormGroup>
                            <Input placeholder="Name" type="text" value={this.Signup.Name} onChange={e => this.Signup.Name = e.target.value}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Email" type="email" value={this.Signup.Email} onChange={e => this.Signup.Email = e.target.value}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Password" type="password" value={this.Signup.Password} onChange={e => this.Signup.Password = e.target.value} />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Phone" type="tel" value={this.Signup.Phone} onChange={e => this.Signup.Phone = e.target.value}  />
                        </FormGroup>
                    </Fragment>}
                />
                <NewLine />

                <TestCard.Component
                    title="Forgot Password"
                    form={this.ForgotPassword}

                    formElements={ <Fragment>
                        <FormGroup>
                            <Input placeholder="Email" type="email" value={this.ForgotPassword.Email} onChange={e => this.ForgotPassword.Email = e.target.value} />
                        </FormGroup>
                    </Fragment>}
                />
                <NewLine />

                <TestCard.Component
                    title="Reset Password"
                    form={this.ResetPassword}

                    formElements={ <Fragment>
                        <FormGroup>
                            <Input placeholder="User ID" type="number" value={this.ResetPassword.Id} onChange={e => this.ResetPassword.Id = e.target.value} />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Password" type="password" value={this.ResetPassword.Password} onChange={e => this.ResetPassword.Password = e.target.value} />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="old Password" type="password" value={this.ResetPassword.OldPassword} onChange={e => this.ResetPassword.OldPassword = e.target.value} />
                        </FormGroup>
                    </Fragment>}
                />
                <NewLine />

                <TestCard.Component
                    title="Get Users Details"
                    form={this.GetUserDetails}
                />
                <NewLine />

                <TestCard.Component
                    title="Update User Details"
                    form={this.UpdateUserDetails}

                    formElements={ <Fragment>
                        <FormGroup>
                            <Input placeholder="Name" type="text" value={this.UpdateUserDetails.Name} onChange={e => this.UpdateUserDetails.Name = e.target.value}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Email" type="email" value={this.UpdateUserDetails.Email} onChange={e => this.UpdateUserDetails.Email = e.target.value}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Password" type="password" value={this.UpdateUserDetails.Password} onChange={e => this.UpdateUserDetails.Password = e.target.value} />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Phone" type="tel" value={this.UpdateUserDetails.Phone} onChange={e => this.UpdateUserDetails.Phone = e.target.value}  />
                        </FormGroup>
                    </Fragment>}
                />
            </Container>;
        }
    }
}