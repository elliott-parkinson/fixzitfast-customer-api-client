import { Container } from "typedi";

import { RouteService } from "./route/RouteService";
import { SiteStore } from "./SiteStore";


import "../../../customer-data-store/Store";
import "../../../customer-store/Store";

import { ModalController } from "./controller/ModalController";
import { NotificationsController } from "./controller/NotificationsController";


Container.of("store").set([
	{ id: "site", value: new SiteStore },
	{ id: "routes", value: new RouteService },
	{ id: "modals", value: new ModalController },
	{ id: "notifications", value: new NotificationsController },
]);