import * as React from "react";
import Dependencies from "typedi";

import {
    Fragment,
    Button,
	Form, FormGroup, Input, InputGroup, InputGroupAddon, Typeahead,
} from "../Theme";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

export namespace ServicesTypeAhead
{
    @observer
    export class Component extends React.Component<any>
    {
        @observable ServicesStore: any;

        @observable SelectedService: any;
        @observable SelectedCategory: any;

        @observable Services: any = [];
        @observable Categories: any = [];

        componentDidMount()
        {
            if (Dependencies.of("fixzitfast-customer-data-store").has<any>("services"))
            {
                this.ServicesStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("services");
            }

            this.UpdateServiceData();
        }

        @action async UpdateServiceData()
        {
            this.Services = await this.ServicesStore.Services.List;
            this.Categories = await this.ServicesStore.Categories.List;
        }

        @computed get ServicesTypeaheadList()
        {
            let list = [];
            this.Services?.forEach( service =>
                list.push(service.Id.toString())
            );

            return list;
        }

        GetService(id: string)
        {
            return this.Services.find( service => service.Id == id);
        }

        GetCategory(id: string)
        {
            return this.Categories.find( category => category.Id == id);
        }

        @action SelectService(id: string)
        {
            this.SelectedService = this.GetService(id);
            this.SelectedCategory = this.GetCategory(this.SelectedService.CategoryId);
        }

        renderServiceName(service): string {
            let name = this.GetService(service).Name;
            let categoryName = this.GetCategory(this.GetService(service).CategoryId)?.Name;

            return categoryName + " - " + name;
        }

    
        render() {
            return <InputGroup>
                <Typeahead
                    id="basic-typeahead-single"
                    onChange={e => this.SelectService(e[0]) }
                    options={this.ServicesTypeaheadList}
                    placeholder="Type the service that you need."
                    selected={null}
                    labelKey={service => this.renderServiceName(service)}
                    renderMenuItemChildren={service => this.renderServiceName(service)}
                />
                <InputGroupAddon addonType="prepend">
                    <Button color="primary" disabled={ this.SelectedService != undefined ? undefined : true } onClick={e => { e.preventDefault(); this.props.onClick(this.SelectedService, this.SelectedCategory); return false; }}>{ this.props.text }</Button>
                </InputGroupAddon>
            </InputGroup>;
        }
    }
}