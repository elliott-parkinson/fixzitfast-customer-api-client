import { Container } from "typedi";

import { Api as RestApi } from "../../../api-client/rest";
import { RouteService } from "./route/RouteService";
import { SiteStore } from "./SiteStore";

import "../../../customer-store/Store";
import { ModalController } from "./controller/ModalController";
import { NotificationsController } from "./controller/NotificationsController";

Container.of("store").set([
	{ id: "api", value: new RestApi("https://api.smartworkx.co.uk/public/api") },

	{ id: "site", value: new SiteStore },
	{ id: "routes", value: new RouteService },
	{ id: "modals", value: new ModalController },
	{ id: "notifications", value: new NotificationsController },
]);