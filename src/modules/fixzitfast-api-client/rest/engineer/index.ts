import { AxiosInstance } from "axios";
import { AxiosGetRequest, AxiosPostRequest } from "../Request";
import { AxiosResponse } from "../Response";

import {
	Dispatcher, ApiResponse,
	Engineer as Model
} from "../Schema";

export namespace Engineer
{
	export class Handler
	{
		public Dispatcher: Dispatcher;
		public Endpoint: AxiosInstance;

		constructor(props?: any) { Object.assign(this, props); }

		async List(): Promise<ApiResponse<Model.List.Response>>
		{
			let response = new AxiosResponse<Model.List.Response>({}),
				url = "/engineers/list",
				domain = "Engineer", success = "UpdateEngineerList", fail = "UpdateEngineerListFailed";
			
			try
			{
				response = await AxiosGetRequest<Model.List.Response>(this.Endpoint, url);
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

		async ListAvailable(date: string, timeStart: string, timeFinish: string): Promise<ApiResponse<Model.ListAvailable.Response>>
		{
			let response = new AxiosResponse<Model.ListAvailable.Response>({}),
				url = "/engineers/available",
				domain = "Engineer", success = "UpdateEngineerAvailableList", fail = "UpdateEngineerAvailableListFailed",
				request = new Model.ListAvailable.Request({
					date: date,
					timeStart: timeStart,
					timeFinish: timeFinish,
					location: undefined
				});
			
			try
			{
				response = await AxiosPostRequest<Model.ListAvailable.Response>(this.Endpoint, url, request);
				response.data.Data = new Model.ListAvailable.Response(response.data.Data);
			}
			catch (exception)
			{
				response.data.Success = false;
				response.data.ErrorMessage = exception.message;
				response.data.Data = new Model.ListAvailable.Response;
			}
			finally
			{
				this.Dispatcher?.Trigger(domain, response?.data?.Success == true ? success : fail, response.data);
				return response.data;
			}
		}
	}
}