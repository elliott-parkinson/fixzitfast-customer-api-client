import Dependencies from "typedi";

import { Api as RestApi } from "../api-client/rest";

import { Account } from "./model/account/Account";
import { Contact } from "./model/Contact";

import { Services } from "./model/service/Services";
import { Bookings } from "./model/booking/Bookings";
import { InProgressBooking } from "./model/booking/InProgressBooking";


Dependencies.of("fixzitfast-customer-data-store").set([
	{ id: "api", value: new RestApi("http://127.0.0.1:3000/") },

	{ id: "account", value: new Account },
	{ id: "bookings", value: new Bookings },
	{ id: "contact", value: new Contact },
	// { id: "customers", value: new CustomerStore },
	// { id: "location", value: new LocationStore },
	{ id: "services", value: new Services },

	//{ id: "testimonials", value: new TestimonialStore },
]);
