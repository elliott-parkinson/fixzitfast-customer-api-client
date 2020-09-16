import { AxiosInstance } from "axios";
import { AxiosGetRequest, AxiosPostRequest } from "../Request";
import { AxiosResponse } from "../Response";

import {
	Dispatcher, ApiResponse,
	Notifications as Model
} from "../Schema";

export namespace Notifications
{
	export class Handler
	{
		public Dispatcher: Dispatcher;
		public Endpoint: AxiosInstance;

		constructor(props?: any) { Object.assign(this, props); }

		async List(accountId: number): Promise<ApiResponse<Model.List.Response>>
		{
			let response = new AxiosResponse<Model.List.Response>({}),
				url = "/account/" + accountId + "/notifications",
				domain = "Notification", success = "UpdateNotifications", fail = "UpdateNotificationsFailed";
			
			try
			{
				response = await AxiosPostRequest<Model.List.Response>(this.Endpoint, url, {});
				response.data.Data = new Model.List.Response(response.data.Data);
			}
			catch (exception)
			{
				response.data.Success = false;
				response.data.ErrorMessage = exception.message;
				response.data.Data = new Model.List.Response;
			}
			finally
			{
				this.Dispatcher?.Trigger(domain, response?.data?.Success == true ? success : fail, response.data);
				return response.data;
			}
		}
	}
}