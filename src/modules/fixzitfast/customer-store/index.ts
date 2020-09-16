import Dependencies from "typedi";
import { observable, action } from "mobx";


export class FixzitfastStore
{
	
}import { Container } from "typedi";

import { Api as RestApi } from "../api-client/rest";
import { AuthStore } from "./models/auth/AuthStore";
import { AccountStore } from "./models/account/AccountStore";

Container.of("store").set([
	{ id: "api", value: new RestApi("https://api.smartworkx.co.uk/public/api") },

	{ id: "auth", value: new AuthStore },
	{ id: "account", value: new AccountStore },
]);