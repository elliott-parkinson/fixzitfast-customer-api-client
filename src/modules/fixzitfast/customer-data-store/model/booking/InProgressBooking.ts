import Dependencies from "typedi";
import { observable, action } from "mobx";

import { serialize, deserialize } from "serializer.ts/Serializer";
import { Skip, Type } from "serializer.ts/Decorators";

import { Service } from "./in-progress/Service";
import { Address } from "./in-progress/Address";
import { Details } from "./in-progress/Details";
import { Time } from "./in-progress/Time";
import { Contact } from "./in-progress/Contact";


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