import { observable, when } from "mobx";
import { serialize, deserialize } from "serializer.ts/Serializer";

import { Account } from "./account/Account";
import { Contact } from "./contact/Contact";

import { Services } from "./service/Services";
import { Bookings } from "./booking/Bookings";
import { InProgressBooking } from "./booking/InProgressBooking";



export class Store
{
    @observable Account = new Account;
    @observable Bookings = new Bookings;
    @observable InProgressBooking = new InProgressBooking;
    @observable Contact = new Contact;
    @observable Services = new Services;
}

