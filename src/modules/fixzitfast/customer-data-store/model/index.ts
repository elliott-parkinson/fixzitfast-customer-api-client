import { observable } from "mobx";
import { Account } from "./Account";
import { Contact } from "./Contact";

import { serialize, deserialize } from "serializer.ts/Serializer";



export class Store
{
    @observable Account = new Account;
    @observable Bookings = new Account;
    @observable InProgressBooking = new Account;
    @observable Contact = new Contact;
    @observable Services = new Account;
}