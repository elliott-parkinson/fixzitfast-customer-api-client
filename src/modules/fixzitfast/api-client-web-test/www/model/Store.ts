import { Container } from "typedi";

import { Api as RestApi } from "../../../api-client/rest";
import { AuthStore } from "./AuthStore";
import { BookingStore } from "./BookingStore";
import { RouteService } from "./route/RouteService";
import { SiteStore } from "./SiteStore";


Container.of("store").set([
	{ id: "api", value: new RestApi("https://api.smartworkx.co.uk/public/api") },

	{ id: "site", value: new SiteStore },
	{ id: "auth", value: new AuthStore },
	{ id: "booking", value: new BookingStore },
	{ id: "routes", value: new RouteService },
]);