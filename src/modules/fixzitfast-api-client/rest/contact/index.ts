import { AxiosInstance } from "axios";
import { AxiosGetRequest, AxiosPostRequest } from "../Request";
import { AxiosResponse } from "../Response";

import {
	Dispatcher, ApiResponse,
	Contact as Model
} from "../Schema";

import { IContactHandler } from "../../schema/contact";

export namespace Contact
{
	export class Handler implements IContactHandler
	{
		public Dispatcher: Dispatcher;
		public Endpoint: AxiosInstance;

		constructor(props?: any) { Object.assign(this, props); }

		async SubmitForm(name: string, email: string, phone: string, message: string, acceptTerms: boolean = true): Promise<ApiResponse<Model.SubmitForm.Response>>
		{
			let response = new AxiosResponse<Model.SubmitForm.Response>({}),
				url = Model.SubmitForm.Url(),
				domain = "Contact", success = "SuccessfulContactFormSubmission", fail = "FailedContactFormSubmission",
				request = new Model.SubmitForm.Request({
					name: name,
					email: email,
					phone: phone,
					comments: message
				});
			
			try
			{
				response = await AxiosPostRequest<Model.SubmitForm.Response>(this.Endpoint, url, request);
				response.data.Data = new Model.SubmitForm.Response(response.data.Data);
			}
			catch (exception)
			{
				response.data.Success = false;
				response.data.ErrorMessage = exception.message;
				response.data.Data = new Model.SubmitForm.Response;
			}
			finally
			{
				this.Dispatcher?.Trigger(domain, response?.data?.Success == true ? success : fail, response.data);
				return response.data;
			}
		}
	}
}