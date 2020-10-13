import Dependencies from "typedi";
import { observable, action } from "mobx";

import { serialize, deserialize } from "serializer.ts/Serializer";
import { Skip, Type } from "serializer.ts/Decorators";


export class Service
{
	@observable Id: string = "";
    @observable Name: string = "";
    
	@observable CategoryId: string = "";
    @observable CategoryName: string = "";
        
    @action Set(id: string, name: string, categoryId: string, categoryName: string)
	{

	}
}

export class Address
{
	@observable Latitude: number = -1;
	@observable Longitude: number = -1;

	@observable Line1: string = "";
	@observable Line2: string = "";
	@observable Line3: string = "";
	@observable Town: string = "";
	@observable County: string = "";
    @observable Postcode: string = "";


    @action SetCoordinates(latitude: number, longitude: number)
	{

	}
        
    @action Set(line1: string, line2: string, line3: string, town: string, county: string, postcode: string)
	{

	}
}

export class Details
{
	@observable Type: string = "";
    @observable Description: string = "";
    
    @Skip()
    @observable Files: string[] = [];
    
    @action Set(type: string, description: string)
	{

	}

	@action UploadFile(id: string, url: string)
	{

	}
}
export class Time
{
    @Type(() => Date)
	@observable Date: Date = null;
    
    @observable TimeSlotId: string = "";
    @observable TimeSlotText: string = "";
    
	@observable Agree: boolean = false;
        
    @action Set(date: Date, timeSlotId: string, timeSlotText: string, agree: boolean)
	{

	}
}

export class Contact
{
	@observable Name: string = "";
    @observable Email: string = "";
	@observable PhoneNumber: string = "";
    
    @action Set(name: string, email: string, phone: string)
	{

	}
}

export class InProgressBooking
{
    constructor()
    {
        // this.Load();
    }

    @Type(() => Service)
    @observable Service: Service = new Service;
    
    @Type(() => Address)
    @observable Location: Address = new Address;
    
    @Type(() => Details)
    @observable Details: Details = new Details;
    
    @Type(() => Time)
	@observable Time: Time = new Time;
    
    @Type(() => Contact)
    @observable Contact: Contact = new Contact;
    
    // payment card


    @action Clear()
    {

    }

    @action Pay()
    {

    }

    @action Complete()
	{

	}
}