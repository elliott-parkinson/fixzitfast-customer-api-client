import Dependencies from "typedi";

import { Api as RestApi } from "../api-client/rest";

import { AuthStore } from "./models/auth/AuthStore";
import { AccountStore } from "./models/account/AccountStore";
import { BookingStore } from "./models/bookings/BookingStore";
import { ServicesStore } from "./models/services/ServicesStore";

Dependencies.of("fixzitfast-customer-store").set([
	{ id: "api", value: new RestApi("https://api.smartworkx.co.uk/public/api") },

	{ id: "auth", value: new AuthStore },
	{ id: "account", value: new AccountStore },
	{ id: "bookings", value: new BookingStore },
	{ id: "services", value: new ServicesStore },
]);