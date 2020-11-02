import * as React from "react";
import Dependencies from "typedi";

import { 
    Alert,
    Fragment,
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
	Form, FormGroup, Input, InputGroup,
    Nav, NavItem, NavLink, Navbar,
    Header, NewLine, Block, Paragraph
} from "../Theme";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

export namespace AuthenticationModal
{
    class LoginForm
    {
        @observable ResponseData = {};
        @observable Email: string = "";
        @observable Password: string = "";

        @observable Error: string = "";

        @action async Submit()
        {
            if (Dependencies.of("fixzitfast-customer-data-store").has<any>("account"))
            {
                const authStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("account");
                const routeStore = Dependencies.of("store").get<any>("routes");
    
                let success = await authStore.Login(this.Email, this.Password);
                if (success == true)
                {
                    return;
                }
                else
                {
                    this.Error = authStore.Error;
                }
            }
        }
    }

    class SiginupForm
    {
        @observable Finished: boolean = false;

        @observable ResponseData = {};
        @observable Name: string = "";
        @observable Email: string = "";
        @observable Password: string = "";
        @observable PasswordConfirm: string = "";
        @observable Phone: string = "";

        @observable Error: string = "";

        @action async Submit()
        {
            let success = false;
            if (Dependencies.of("fixzitfast-customer-data-store").has<any>("account"))
            {
                const authStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("account");
    
                if (this.Password !== this.PasswordConfirm)
                {
                    this.Error = "Passwords do not match";
                    return;
                }
    
                success = await authStore.Signup(
                    this.Name,
                    this.Email,
                    this.Password,
                    this.Phone
                );
            }

            if (success == true)
            {
                this.Finished = true;
            }

            this.Error = authStore.Error;
        }
    }


    export interface IViewProps
    {
        isOpen: boolean;

        toggle: Function;
        close: Function;
    }

    @observer
    export class Component extends React.Component<IViewProps>
    {
        @observable SelectedTab = "signin";

        @observable LoginForm = new LoginForm;
        @observable SiginupForm = new SiginupForm;
        

        @action SelectTab(tab: string)
        {
            this.SelectedTab = tab;
        }

        render() {
            return <Modal isOpen={this.props.isOpen} className="">
            <ModalBody>
                <Nav justified tabs>
                    <NavItem active={this.SelectedTab == "signin"}>
                        <NavLink href="#"
                            onClick={ e => { e.preventDefault(); this.SelectTab("signin"); return false; }}
                        >
                            Sign in
                        </NavLink>
                    </NavItem>
                    <NavItem active={this.SelectedTab == "signup"}>
                        <NavLink href="#"
                            onClick={ e => { e.preventDefault(); this.SelectTab("signup"); return false; }}
                        >
                            Sign up
                        </NavLink>
                    </NavItem>
                    {/*
                    <NavItem active={this.SelectedTab == "guest"}>
                        <NavLink href="#"
                            onClick={ e => { e.preventDefault(); this.SelectTab("guest"); return false; }}
                        >
                            Guest
                        </NavLink>
                    </NavItem>
                    */}
                </Nav>

                { this.SelectedTab == "signin" && <Fragment>
                    <Form className="fixzitfast-form login-form" onSubmit={e => { this.LoginForm.Submit(); e.preventDefault(); return false; }}>
                        <FormGroup>
                            <Input placeholder="Type email address" type="email" required value={this.LoginForm.Email} onChange={e => this.LoginForm.Email = e.target.value} />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Password" type="password" required value={this.LoginForm.Password} onChange={e => this.LoginForm.Password = e.target.value} />
                        </FormGroup>
                        
                        <FormGroup className="text-right">
                            <a href="./forgot-password" onClick={ e => { e.preventDefault(); this.Routes.Go("./forgot-password"); return false; }}>Forgot Password?</a>
                        </FormGroup>

                        { this.LoginForm.Error != "" && <Alert color="danger">
                            <strong>Error: </strong> { this.LoginForm.Error } 
                        </Alert> }
                        <NewLine />
                        <NewLine />

                        <Button color="primary" block>Sign in</Button>
                    </Form>

                    <Block className="text-center">
                        <Paragraph>Don't have an account?</Paragraph>
                        <Paragraph><Button color="link" onClick={e => this.SelectTab("signup")}>Sign up</Button></Paragraph>
                    </Block>
                </Fragment> }

                { this.SelectedTab == "signup" && <Fragment>
                    <Form className="fixzitfast-form signup-form" onSubmit={e => { this.SiginupForm.Submit(); e.preventDefault(); return false; }}>
                        <FormGroup>
                            <Input placeholder="Type name" type="text" required value={this.SiginupForm.Name} onChange={e => this.SiginupForm.Name = e.target.value} />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Type email address" type="email" required value={this.SiginupForm.Email} onChange={e => this.SiginupForm.Email = e.target.value} />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Type phone" type="tel" required value={this.SiginupForm.Phone} onChange={e => this.SiginupForm.Phone = e.target.value} />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Type password" type="password" required value={this.SiginupForm.Password} onChange={e => this.SiginupForm.Password = e.target.value} />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Confirm password" type="password" required value={this.SiginupForm.PasswordConfirm} onChange={e => this.SiginupForm.PasswordConfirm = e.target.value} />
                        </FormGroup>

                        { this.SiginupForm.Error != "" && <Alert color="danger">
                            <strong>Error: </strong> { this.SiginupForm.Error } 
                        </Alert> }
                        
                        <NewLine />
                        <NewLine />
                        
                        <Button color="primary" block>Sign up</Button>
                    </Form>
                </Fragment> }

                

                { this.SelectedTab == "guest" && <Fragment>
                    
                </Fragment> }
            
            </ModalBody>
          </Modal>;
        }
    }
}