import * as React from "react";
import Dependencies from "typedi";

import { 
    Fragment,
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    
    Nav, NavItem, NavLink, Navbar,
} from "../Theme";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";
import { AuthenticationModal } from "./AuthenticationModal";

export namespace RequireAuthentication
{
    export interface IViewProps
    {
    }

    @observer
    export class Component extends React.Component<IViewProps>
    {
        @observable Store: any;
        @observable ModalOpen: boolean = false;

        @action componentDidMount()
        {
            if (Dependencies.of("fixzitfast-customer-data-store").has<any>("account"))
            {
                this.Store = Dependencies.of("fixzitfast-customer-data-store").get<any>("account");
            }

            if (this.Store?.LoggedIn == false)
            {
                this.ModalOpen = true;
            }
        }

        @action Close()
        {
            if (this.Store?.LoggedIn == true)
            {
                this.ModalOpen = false;
            }
            else
            {
                alert("You must be logged in to continue");
            }
        }

        @action Toggle()
        {
            if (this.ModalOpen)
            {
                this.Close();
            }
            else{
                this.ModalOpen = true;
            }
        }

        render() {
            return this.Store?.LoggedIn == false && <AuthenticationModal.Component
                isOpen={this.ModalOpen}
                toggle={e => this.Toggle()}
                close={e => this.Close()}
            />;
        }
    }
}