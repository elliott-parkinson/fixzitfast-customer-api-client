import Dependencies from "typedi";
import { observable, when, autorun } from "mobx";

import { Account } from "./model/account/Account";
import { Contact } from "./model/contact/Contact";

import { Services } from "./model/service/Services";
import { Bookings } from "./model/booking/Bookings";
import { InProgressBooking } from "./model/booking/InProgressBooking";
import { Customers } from "./model/customers/Customers";
import { Testimonials } from "./model/customers/Testimonials";


Dependencies.of("fixzitfast-customer-data-store").set([
	{ id: "account", value: new Account },
	{ id: "bookings", value: new Bookings },
	{ id: "contact", value: new Contact },
	{ id: "customers", value: new Customers },
	// { id: "location", value: new LocationStore },
	{ id: "services", value: new Services },

	{ id: "testimonials", value: new Testimonials },
]);

let account = Dependencies.of("fixzitfast-customer-data-store").get<any>("account");
let bookings = Dependencies.of("fixzitfast-customer-data-store").get<any>("bookings");
let services = Dependencies.of("fixzitfast-customer-data-store").get<any>("services");

account.Load();
bookings.Load();
services.Load();

/* On Login */
when( () => account.LoggedIn == false, async () =>
{
	account.Store();
	
	// check notifications
});

/* On Logout */
when( () => account.LoggedIn == false, async () =>
{
	account.Store();
	bookings.Clear();
});


autorun( async () =>
{
	await services.Services.Fetch();
	await services.Categories.Fetch();

	services.Store();
});