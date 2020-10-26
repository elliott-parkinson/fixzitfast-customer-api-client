import Dependencies, { Service } from "typedi";

import * as React from "react";
import { Redirect } from "react-router-dom";

import { 
    Alert,
	AppLayout, Titlebar, Fragment,
    Button,
    Container,
	Card, CardBody, CardHeader,
	Form, FormGroup, Input, InputGroup, InputGroupAddon, Typeahead, Label, Dropzone,
	Header, Paragraph,
	NewLine,
    Nav, NavItem, NavLink,
    Row, Column
} from "../../../Theme";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";
import { ServiceCard, ServiceIcon } from "../../../../../../react-components";
import { OrderSummary } from "./components/OrderSummary";
import { CreateBookingStepper } from "./components/CreateBookingStepper";

export namespace SetDetails
{
    export class DetailsForm
    {
        @observable Details = "";
        @observable Files = [];
        
        @observable Errors = [];

        @action SetType(type: string)
        {
            this.Type = type;
        }

        ProcessImage(img: any, fileString: any, maxSize: number = 1200): string
		{
			if (img.width > maxSize || img.height > maxSize)
			{
				const ratio = (img.width > maxSize) ? maxSize / img.width : maxSize / img.height;

				const canvas = document.createElement('canvas');
				canvas.width = ratio * img.width;
				canvas.height = ratio * img.height;

				const ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0, ratio * img.width, ratio * img.height);
				return canvas.toDataURL("image/jpeg", 8) as string;
			}
			else
			{
				return fileString as string;
			}
		}

		SelectFile(event: any)
		{
			let images = [];

			for (let i = 0; i < event.target.files.length; i++)
			{
				const reader = new FileReader;
				reader.onloadend = () => {
					const img = new Image();
					img.src = reader.result as string;
					img.onload = action(() => this.Files[0] = this.ProcessImage(img, reader.result));
				};

				reader.readAsDataURL(event.target.files[i]);
			}
        }
        
        @action async Submit()
        {
            let bookingStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("bookings");
            bookingStore.InProgress.Details.Set(this.Details);
            bookingStore?.InProgress.Store();

            let router = Dependencies.of("store").get<any>("routes");
            router.Go("/booking/create/location");
        }

    }
    @observer
    export class Screen extends React.Component<any>
    {
        @observable Router: any;
        @observable BookingStore: any;

        @observable Form = new DetailsForm;

        componentDidMount()
        {
            this.Router =  Dependencies.of("store").get<any>("routes");
            Dependencies.of("store").has("site") && (Dependencies.of("store").get<any>("site").Title = "Booking Details");
            this.BookingStore =  Dependencies.of("fixzitfast-customer-data-store").get<any>("bookings");

            let details = this.BookingStore.InProgress.Details.Get();
            this.Form.Details = details.Description;
        }
    
        render() {
            return <Fragment>
                <Form className="fixzitfast-form animate__animated animate__fadeIn animate__delay-02s" onSubmit={e => { e.preventDefault(); this.Form.Submit(); return false; }}>
                    <Header size="md">What's the problem?</Header>
                    
                    <FormGroup tag="fieldset">
                        <Input type="textarea" rows={6} required placeholder="Type in the details of the job" value={this.Form.Details} onChange={ e => this.Form.Details = e.target.value } />{' '}
                    </FormGroup>

                    <FormGroup tag="fieldset">
                        <NewLine />
                        <Paragraph>Show us the problem by uploading a photo.</Paragraph>
                        { this.Form.Files.length >= 0 && <Fragment>
                            { this.Form.Files.map( file => 
                                <Card style={{ width: "96px", height: "96px" }} >
                                    <img src={file} style={{ maxWidth: "100%", maxHeight: "100%" }} />
                                </Card>
                                )}
                        </Fragment>}
                        <Dropzone accept="image/*" 
                            onSelect={event => this.Form.SelectFile(event)}
                        >
                            <React.Fragment>
                                <i className="fas fa-camera" /> 
                                <NewLine />
                                Drag here to upload or choose an image
                            </React.Fragment>
                        </Dropzone>
                    </FormGroup>

                    <Button color="primary" block>Confirm Details</Button>
                </Form>
            </Fragment>;
        }
    }
}