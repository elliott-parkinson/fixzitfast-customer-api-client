import {
	Api as RestApi
} from "./rest";

import { Threads } from "../../src/Threads";
import { Dispatcher } from "./schema";

const apiClient = new RestApi("www.google.co.uk");


/* Rest */
Threads.HandleEvents( 
	self, 
	(scope: string, action: string, data: any) => {
		Threads.MapMessageToObject(apiClient, scope, action, data);
	}
);

export default self;