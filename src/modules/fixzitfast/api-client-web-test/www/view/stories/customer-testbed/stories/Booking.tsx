import * as React from "react";
import Dependencies from "typedi";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

import { 
    Alert, Fragment,
    Container,
    Form, FormGroup, Input, InputGroup, Label, Dropzone,
    NewLine,
} from "../../../Theme";

import { ApiResponseData } from "../../../model/ApiResponseData";
import { TestCard } from "../../../components/TestCard";
export namespace Booking
{
    class CreateForm
    {
        @observable ResponseData = new ApiResponseData;

        @action async Submit()
        {
            this.ResponseData.Reset();
            this.ResponseData.Loading = true;

            
            const authStore =  Dependencies.of("store").get<any>("auth");
            const bookingStore =  Dependencies.of("store").get<any>("booking");
            let userId =  authStore.Id;

            let response = await this.ResponseData.ProcessFor(
                i => apiStore.Bookings.Create(userId)
            );
                
            if (response.Success == true)
            {
                bookingStore.Id = response.Data.bookingId;
            }
        }
    }
    class LocationForm
    {
        @observable ResponseData = new ApiResponseData;
        @observable BookingId = -1;

        @observable Line1 = "";
        @observable Line2 = "";
        @observable Line3 = "";
        @observable Town = "";
        @observable County = "";
        @observable Postcode = "";

        @action async Submit()
        {
            this.ResponseData.Reset();
            this.ResponseData.Loading = true;

            
            const authStore =  Dependencies.of("store").get<any>("auth");
            const bookingStore =  Dependencies.of("store").get<any>("booking");
            let userId =  authStore.Id;

            let response = await this.ResponseData.ProcessFor(
                i => apiStore.Bookings.SetLocation(this.BookingId, this.Line1, this.Line2, this.Line3, this.Town, this.County, this.Postcode)
            );
        }
    }
    class ServiceForm
    {
        @observable ResponseData = new ApiResponseData;
        @observable BookingId = -1;
        @observable ServiceId = -1;

        @action async Submit()
        {
            this.ResponseData.Reset();
            this.ResponseData.Loading = true;

            
            const authStore =  Dependencies.of("store").get<any>("auth");
            const bookingStore =  Dependencies.of("store").get<any>("booking");
            let userId =  authStore.Id;

            let response = await this.ResponseData.ProcessFor(
                i => apiStore.Bookings.SetService(this.BookingId, this.ServiceId)
            );
        }
    }
    class DetailsForm
    {
        @observable ResponseData = new ApiResponseData;
        
        @observable Loading = false;
        @observable BookingId = -1;
        @observable RepairType: string = "";
		@observable Details: string = "";
        @observable Files: string[] = [];
        
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
            this.ResponseData.Reset();
            this.ResponseData.Loading = true;

            
            const authStore =  Dependencies.of("store").get<any>("auth");
            const bookingStore =  Dependencies.of("store").get<any>("booking");
            let userId =  authStore.Id;

            let response = await this.ResponseData.ProcessFor(
                i => apiStore.Bookings.SetDetails(this.BookingId, this.RepairType, this.Details, this.Files ? this.Files[0] : "")
            );
        }
    }
    class TimeslotForm
    {
        @observable ResponseData = new ApiResponseData;
        @observable BookingId = -1;

        @observable Date: string = "";
        @observable StartTime: string = "";
		@observable FinishTime: string = "";

        @action async Submit()
        {
            this.ResponseData.Reset();
            this.ResponseData.Loading = true;

            
            const authStore =  Dependencies.of("store").get<any>("auth");
            const bookingStore =  Dependencies.of("store").get<any>("booking");
            let userId =  authStore.Id;

            let response = await this.ResponseData.ProcessFor(
                i => apiStore.Bookings.SetTimeslot(this.BookingId, this.Date, this.StartTime, this.FinishTime)
            );
        }
    }
    class SignatureForm
    {
        @observable ResponseData = new ApiResponseData;
        @observable BookingId = -1;

        @observable Signature: string = "";

        @action async Submit()
        {
            this.ResponseData.Reset();
            this.ResponseData.Loading = true;

            
            const authStore =  Dependencies.of("store").get<any>("auth");

            let response = await this.ResponseData.ProcessFor(
                i => apiStore.Bookings.AddSignature(this.BookingId, this.Signature)
            );
        }
    }
    class CompleteForm
    {
        @observable ResponseData = new ApiResponseData;
        @observable BookingId = -1;

        @observable Name: string = "";
        @observable Email: string = "";
        @observable Password: string = "";

        @action async Submit()
        {
            this.ResponseData.Reset();
            this.ResponseData.Loading = true;

            
            const authStore =  Dependencies.of("store").get<any>("auth");
            const bookingStore =  Dependencies.of("store").get<any>("booking");
            let userId =  authStore.Id;

            let response = await this.ResponseData.ProcessFor(
                i => apiStore.Bookings.Complete(this.BookingId, this.Name, this.Email, this.Password)
            );
        }
    }

    class GetUpcomingForm
    {
        @observable ResponseData = new ApiResponseData;

        @action async Submit()
        {
            this.ResponseData.Reset();
            this.ResponseData.Loading = true;

            
            const authStore =  Dependencies.of("store").get<any>("auth");
            let userId =  authStore.Id;

            this.ResponseData.ProcessFor(
                i => apiStore.Bookings.GetUpcoming(userId)
            );
        }
    }

    @observer
    export class Pane extends React.Component<any>
    {
        @observable Create = new CreateForm;
        @observable Location = new LocationForm;
        @observable Service = new ServiceForm;
        @observable Details = new DetailsForm;
        @observable Timeslot = new TimeslotForm;
        @observable AddSignature = new SignatureForm;
        @observable Complete = new CompleteForm;
        @observable Upcoming = new GetUpcomingForm;


        componentDidMount()
        {
            Dependencies.of("store").get<any>("site").Title = "TestBed - Booking";
        }
    
        render() {
            return <Container>
                <TestCard.Component
                    title="Create new booking"
                    form={this.Create}
                />
                <NewLine />

                <TestCard.Component
                    title="Set booking service"
                    form={this.Service}

                    formElements={ <Fragment>
                        <FormGroup>
                            <Label>Booking ID</Label>
                            <Input type="number" value={this.Service.BookingId} onChange={e => this.Service.BookingId = parseInt(e.target.value)}  />
                        </FormGroup>
                        <FormGroup>
                            <Label>Service ID</Label>
                            <Input type="number" value={this.Service.ServiceId} onChange={e => this.Service.ServiceId = parseInt(e.target.value)}  />
                        </FormGroup>
                    </Fragment>}
                />
                <NewLine />

                <TestCard.Component
                    title="Set booking location"
                    form={this.Location}

                    formElements={ <Fragment>
                        <FormGroup>
                            <Label>Booking ID</Label>
                            <Input type="number" value={this.Location.BookingId} onChange={e => this.Location.BookingId = parseInt(e.target.value)}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Address line 1" type="text" value={this.Location.Line1} onChange={e => this.Location.Line1 = e.target.value}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Address line 2" type="text" value={this.Location.Line2} onChange={e => this.Location.Line2 = e.target.value}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Address line 3" type="text" value={this.Location.Line3} onChange={e => this.Location.Line3 = e.target.value}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Town" type="text" value={this.Location.Town} onChange={e => this.Location.Town = e.target.value}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="County" type="text" value={this.Location.County} onChange={e => this.Location.County = e.target.value}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Postcode" type="text" value={this.Location.Postcode} onChange={e => this.Location.Postcode = e.target.value}  />
                        </FormGroup>
                    </Fragment>}
                />
                <NewLine />

                <TestCard.Component
                    title="Set booking details"
                    form={this.Details}

                    formElements={ <Fragment>
                        <FormGroup>
                            <Label>Booking ID</Label>
                            <Input type="number" value={this.Details.BookingId} onChange={e => this.Details.BookingId = parseInt(e.target.value)}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Repair type - eg: fix" type="text" value={this.Details.RepairType} onChange={e => this.Details.RepairType = e.target.value}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Details" type="text" value={this.Details.Details} onChange={e => this.Details.Details = e.target.value}  />
                        </FormGroup>

                        <FormGroup>
                            <Label>File upload (optional)</Label>
                            <Dropzone accept="image/*" 
                                onSelect={event => this.Details.SelectFile(event)}
                                disabled={this.Details.Loading == true ? true : undefined}
                            >
                                <React.Fragment>
                                    Drag here to upload or choose a file
                                </React.Fragment>
                                <React.Fragment />
                            </Dropzone>
                        </FormGroup>
                    </Fragment>}
                />
                <NewLine />

                <TestCard.Component
                    title="Set booking timeslot"
                    form={this.Timeslot}

                    formElements={ <Fragment>
                        <FormGroup>
                            <Label>Booking ID</Label>
                            <Input type="number" value={this.Timeslot.BookingId} onChange={e => this.Timeslot.BookingId = parseInt(e.target.value)}  />
                        </FormGroup>

                        <FormGroup>
                            <Input placeholder="Date - eg: 01/12/2020" type="text" value={this.Timeslot.Date} onChange={e => this.Timeslot.Date = e.target.value}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Start Time - eg: 14:00" type="text" value={this.Timeslot.StartTime} onChange={e => this.Timeslot.StartTime = e.target.value}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Finish Time - eg: 14:00" type="text" value={this.Timeslot.FinishTime} onChange={e => this.Timeslot.FinishTime = e.target.value}  />
                        </FormGroup>
                    </Fragment>}
                />
                <NewLine />

                <TestCard.Component
                    title="Add Signature"
                    form={this.AddSignature}

                    formElements={ <Fragment>
                        <FormGroup>
                            <Label>Booking ID</Label>
                            <Input type="number" value={this.AddSignature.BookingId} onChange={e => this.AddSignature.BookingId = parseInt(e.target.value)}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Signature" type="text" value={this.AddSignature.Signature} onChange={e => this.AddSignature.Signature = e.target.value}  />
                        </FormGroup>
                    </Fragment>}
                />
                <NewLine />`

                <TestCard.Component
                    title="Complete booking"
                    form={this.Complete}

                    formElements={ <Fragment>
                        <FormGroup>
                            <Label>Booking ID</Label>
                            <Input type="number" value={this.Complete.BookingId} onChange={e => this.Complete.BookingId = parseInt(e.target.value)}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Users Name" type="text" value={this.Complete.Name} onChange={e => this.Complete.Name = e.target.value}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Users Email" type="email" value={this.Complete.Email} onChange={e => this.Complete.Email = e.target.value}  />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder="Users Password" type="password" value={this.Complete.Password} onChange={e => this.Complete.Password = e.target.value} />
                        </FormGroup>
                    </Fragment>}
                />
                <NewLine />

                <TestCard.Component
                    title="Get Upcoming Bookings"
                    form={this.Upcoming}
                />
                <NewLine />

            </Container>;
        }
    }
}