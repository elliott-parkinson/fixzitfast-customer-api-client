import * as React from "react";
import { Redirect } from "react-router-dom";
import Dependencies, { Service } from "typedi";

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
        @observable Type = "fix";
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
            let bookingStore = Dependencies.of("fixzitfast-customer-store").get<any>("bookings");
            bookingStore.SetBookingDetails(this.Type, this.Details, this.Files);
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
            this.BookingStore =  Dependencies.of("fixzitfast-customer-store").get<any>("bookings");
        }
    
        render() {
            return <Container>
                {/* this.BookingStore && this.BookingStore.CurrentBooking == undefined && <Redirect to={"/booking/create"} /> */}

                <Row>
                    <Column md={9} x={12}>
                        <CreateBookingStepper.Component position={0} onBack={e => this.Router.Back()}/>

                        <Card>
                            <CardBody>
                                <Header size="sm">What's the problem?</Header>
                                <Form onSubmit={e => { e.preventDefault(); this.Form.Submit(); return false; }}>
                                    <FormGroup tag="fieldset">
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio" name="fix" checked={this.Form.Type == "fix"} onChange={ e => this.Form.SetType("fix") } />{' '}
                                                Fix (5-10 days)
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio" name="fastfix" checked={this.Form.Type == "fastfix"} onChange={ e => this.Form.SetType("fastfix") } />{' '}
                                                Fast Fix (1-5 days)
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check disabled>
                                            <Label check>
                                                <Input type="radio" name="emergency" checked={this.Form.Type == "emergency"} onChange={ e => this.Form.SetType("emergency") } />{' '}
                                                Emergency (Same day)
                                            </Label>
                                        </FormGroup>
                                    </FormGroup>

                                    <FormGroup tag="fieldset">
                                        <Input type="textarea" required cplaceholder="Type in the details of the job" value={this.Form.Details} onChange={ e => this.Form.Details = e.target.value } />{' '}
                                    </FormGroup>

                                    <FormGroup tag="fieldset">
                                        <Label>
                                            File upload (optional)
                                        </Label>
                                        { this.Form.Files.length && <Fragment>
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
                                                Drag here to upload or choose a file
                                            </React.Fragment>
                                        </Dropzone>
                                    </FormGroup>

                                    <Button color="primary" block>Confirm Details</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Column>
                    <Column md={3} x={12}>
                        <OrderSummary.Component 
                            service={this.BookingStore?.CurrentBooking?.ServiceName}
                            location={this.BookingStore?.CurrentBooking?.LocationString}
                        />
                    </Column>
                </Row>
            </Container>;
        }
    }
}