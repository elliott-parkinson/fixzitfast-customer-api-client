import { Dispatcher } from "./Dispatcher";

import { IContactHandler } from "./contact";

export abstract class Api
{
	protected Dispatcher: Dispatcher = new Dispatcher;

	// public Account: IAccountHandler;
	// public Bookings: IBookingsHandler;
	public Contact: IContactHandler;
	// public Notifications: INotificationsHandler;
	// public Quotes: IQuotesHandler;
	// public Services: IServicesHandler;
	// public Testimonials: ITestimonialsHandler;

	constructor(url: string)
	{
		this.Init(url);
		this.CreateHandlers();
	}

	abstract Init(url: string);
	abstract CreateHandlers();
}