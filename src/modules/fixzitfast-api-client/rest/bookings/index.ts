import { AxiosInstance } from "axios";
import { AxiosGetRequest, AxiosPostRequest } from "../Request";
import { Dispatcher } from "../Schema";

import { Bookings as Model } from "../Schema";

export namespace Bookings
{
	export class Handler
	{
		public Dispatcher: Dispatcher;
		public Endpoint: AxiosInstance;

		constructor(props?: any) { Object.assign(this, props); }

		
	}
}