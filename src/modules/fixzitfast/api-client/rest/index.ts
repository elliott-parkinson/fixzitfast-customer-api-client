import axios, { AxiosInstance } from "axios";

import { Account } from "./account";
import { Bookings } from "./bookings";
import { Contact } from "./contact";
import { Notifications } from "./notifications";
import { Engineer } from "./engineer";
import { Services } from "./services";

import { Api as SchemaApi } from "./Schema";

export class Api extends SchemaApi
{
	private Endpoint: AxiosInstance;

	public Account: Account.Handler;
	public Bookings: Bookings.Handler;
	public Contact: Contact.Handler;
	public Notifications: Notifications.Handler;
	public Engineer: Engineer.Handler;
	public Services: Services.Handler;

	Init(url: string)
	{
		this.Endpoint = axios.create({
			baseURL: url,
			timeout: 1000
		});
	}

	CreateHandlers()
	{
		const props = { Endpoint: this.Endpoint /*, Dispatcher: this.Dispatcher*/ };

		this.Account = new Account.Handler(props);
		this.Bookings = new Bookings.Handler(props);
		this.Contact = new Contact.Handler(props);
		this.Engineer = new Engineer.Handler(props);
		this.Notifications = new Notifications.Handler(props);
		this.Services = new Services.Handler(props);
	}
}