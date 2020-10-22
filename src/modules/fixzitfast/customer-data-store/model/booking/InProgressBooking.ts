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
    
    @action SetPaymentCard(cardId: string, type: string, name: string, cardNumber: string, expiry: string, ccv: string)
	{

    }


    @action Clear()
    {

    }

    @action Pay()
    {

    }

    @action Complete()
	{

    }
    
    Store()
    {
        let storage = window.localStorage;
		storage.setItem('fixzitfast.bookings.current',JSON.stringify( serialize(this) ));
    }

    @action Load()
    {
		let storage = window.localStorage;
		
		let stored: any = storage.getItem('fixzitfast.bookings.current');
		if (stored != undefined)
		{
            this.Service = deserialize(Service, JSON.parse(stored).Service );
            this.Location = deserialize(Address, JSON.parse(stored).Location );
            this.Details = deserialize(Details, JSON.parse(stored).Details );
            this.Time = deserialize(Time, JSON.parse(stored).Time );
            this.Contact = deserialize(Contact, JSON.parse(stored).Contact );
		}
    }
}