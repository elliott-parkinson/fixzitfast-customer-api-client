import * as React from "react";
import Dependencies from "typedi";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

import { 
    Alert, Fragment,
    Container,
    Form, FormGroup, Input, InputGroup,
    NewLine,
} from "../../../Theme";

import { ApiResponseData } from "../../../model/ApiResponseData";
import { TestCard } from "../../../components/TestCard";

export namespace Contact
{
    class SubmitForm
    {
        @observable ResponseData = new ApiResponseData;
        @observable Name: string = "";
        @observable Email: string = "";
        @observable Phone: string = "";
        @observable Message: string = "";

        @action async Submit()
        {
            this.ResponseData.Reset();
            this.ResponseData.Loading = true;

            const authStore =  Dependencies.of("store").get<any>("auth");
            
            let userId =  authStore.Id;

            this.ResponseData.ProcessFor(
                i => apiStore.Contact.SubmitForm(this.Name, this.Email, this.Phone, this.Message)
            );
        }
    }

    @observer
    export class Pane extends React.Component<any>
    {
        @observable SubmitForm = new SubmitForm;

        componentDidMount()
        {
            Dependencies.of("store").get<any>("site").Title = "TestBed - Contact";
        }
    
        render() {
            return <Container>
                <TestCard.Component
                    title="Contact Form"
                    form={this.SubmitForm}

                    formElements={ <Fragment>
                        <FormGroup>
                            <Input placeholder="Name" type="text" value={this.SubmitForm.Name} onChange={e => this.SubmitForm.Name = e.target.value}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Email" type="email" value={this.SubmitForm.Email} onChange={e => this.SubmitForm.Email = e.target.value}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Phone" type="tel" value={this.SubmitForm.Phone} onChange={e => this.SubmitForm.Phone = e.target.value}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Message" type="textarea" rows={6} value={this.SubmitForm.Message} onChange={e => this.SubmitForm.Message = e.target.value} />
                        </FormGroup>
                    </Fragment>}
                />
            </Container>;
        }
    }
}