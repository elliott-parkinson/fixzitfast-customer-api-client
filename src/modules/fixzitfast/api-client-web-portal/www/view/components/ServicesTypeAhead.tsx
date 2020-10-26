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
        @observable SelectedCategory: any;
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
            this.Categories = await this.ServicesStore.Categories.List;
        }

        @computed get TypeaheadList()
        {
            let list = [];
            console.log(this.Categories);
            this.Categories?.forEach( category =>
                list.push(category.Id)
            );

            return list;
        }

        GetCategory(id: string)
        {
            return this.Categories.find( category => category.Id == id);
        }

        @action Select(id: string)
        {
            this.SelectedCategory = this.GetCategory(id);
        }
    
        render() {
            return <InputGroup>
                <Typeahead
                    id="basic-typeahead-single"
                    onChange={e => this.Select(e[0]) }
                    options={this.TypeaheadList}
                    placeholder="What service are you looking for?"
                    selected={null}
                    labelKey={id => this.GetCategory(id).EngineerType}
                    renderMenuItemChildren={id => this.GetCategory(id).EngineerType}
                />
                <InputGroupAddon addonType="prepend">
                    <Button color="primary" disabled={ this.SelectedCategory != undefined ? undefined : true } onClick={e => { e.preventDefault(); this.props.onClick(this.SelectedCategory); return false; }}>{ this.props.text }</Button>
                </InputGroupAddon>
            </InputGroup>;
        }
    }
}