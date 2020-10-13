import Dependencies from "typedi";
import { AuthStore } from "./models/auth/AuthStore";
import { AccountStore } from "./models/account/AccountStore";
import { BookingStore } from "./models/bookings/BookingStore";
import { ContactStore } from "./models/contact/ContactStore";
import { CustomerStore } from "./models/customers/CustomerStore";
import { LocationStore } from "./models/location/LocationStore";
import { ServicesStore } from "./models/services/ServicesStore";
import { TestimonialStore } from "./models/customers/TestimonialStore";

let authStore = new AuthStore;

Dependencies.of("fixzitfast-customer-store").set([
	// { id: "api", value: new RestApi("http://127.0.0.1:3000/") },

	{ id: "auth", value: authStore },
	{ id: "account", value: new AccountStore },
	{ id: "bookings", value: new BookingStore },
	{ id: "contact", value: new ContactStore },
	{ id: "customers", value: new CustomerStore },
	{ id: "location", value: new LocationStore },
	{ id: "services", value: new ServicesStore },
	{ id: "testimonials", value: new TestimonialStore },
]);

authStore.Load();