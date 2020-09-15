import { AxiosInstance } from "axios";
import { AxiosGetRequest, AxiosPostRequest } from "../Request";
import { AxiosResponse } from "../Response";

import {
	Dispatcher, ApiResponse,
	Account as Model
} from "../Schema";


export namespace Account
{
	export class Handler
	{
		public Dispatcher: Dispatcher;
		public Endpoint: AxiosInstance;

		constructor(props?: any) { Object.assign(this, props); }

		async Signup(name: string, email: string, password: string, phone: string): Promise<ApiResponse<Model.CreateAccount.Response>>
		{
			let response = new AxiosResponse<Model.CreateAccount.Response>({}),
				url = Model.CreateAccount.Url(),
				domain = "Account", success = "SuccessfulSignup", fail = "FailedSignup",
				request = new Model.CreateAccount.Request({
					Name: name,
					Email: email,
					Password: password,
					Phone: phone
				});
			
			try
			{
				response = await AxiosPostRequest<Model.CreateAccount.Response>(this.Endpoint, url, request);
				response.data.Data = new Model.CreateAccount.Response(response.data.Data);
			}
			catch (exception)
			{
				response.data.Success = false;
				response.data.ErrorMessage = exception.message;
				response.data.Data = new Model.CreateAccount.Response;
			}
			finally
			{
				this.Dispatcher?.Trigger(domain, response?.data?.Success == true ? success : fail, response.data);
				return response.data;
			}
		}

		/*
		async GetGeneralDetails(): Promise<Model.GetUserDetails.Response>
		{
			const url = "/account/user/general",
				result = await AxiosGetRequest(this.Endpoint, url),
				response = new Model.GetUserDetails.Response(result.data.Data);

			if (result.data.Success == true)
			{
				this.Dispatcher.Trigger("Account", "UpdateGeneral", response);
			}
			
			return response;
		}

		async GetAddressDetails(): Promise<Model.GetAddressDetails.Response>
		{
			const url = "/account/user/address",
				result = await AxiosGetRequest(this.Endpoint, url),
				response = new Model.GetAddressDetails.Response(result.data.Data);

			if (result.data.Success == true)
			{
				this.Dispatcher.Trigger("Account", "UpdateAddress", response);
			}

			return response;
		}

		async UpdateGeneralDetails(name: string, email: string, password: string): Promise<Model.UpdateGeneralDetails.Response>
		{
			const url = "/account/user/general",
				request = new Model.UpdateGeneralDetails.Request({
					name: name,
					email: email,
					password: password
				}), 
				result = await AxiosPostRequest(this.Endpoint, url, request),
				response = new Model.UpdateGeneralDetails.Response(result.data.Data);

			if (result.data.Success == true)
			{
				this.Dispatcher.Trigger("Account", "UpdateGeneral", response);
			}
			
			return response;
		}

		async UpdateAddressDetails(name: string, email: string, password: string): Promise<Model.UpdateAddressDetails.Response>
		{
			const url = "/account/user/address",
				request = new Model.UpdateAddressDetails.Request({
					name: name,
					email: email,
					password: password
				}), 
				result = await AxiosPostRequest(this.Endpoint, url, request),
				response = new Model.UpdateAddressDetails.Response(result.data.Data);

			if (result.data.Success == true)
			{
				this.Dispatcher.Trigger("Account", "UpdateAddress", response);
			}
			
			return response;
		}

		async Logout(): Promise<Model.Logout.Response>
		{
			const url = "/account/logout",
				request = new Model.Logout.Request({}), 
				result = await AxiosPostRequest(this.Endpoint, url, request),
				response = new Model.Logout.Response(result.data.Data);
			
			return response;
		}

		
		
		async Login(email: string, password: string): Promise<Model.Login.Response>
		{
			const url = "/account/login",
			request = new Model.Login.Request({
				email: email,
				password: password
			}), 
			result = await AxiosPostRequest(this.Endpoint, url, request),
			response = new Model.Login.Response(result.data.Data);
			
			if (result.data.Success == true)
			{
				this.Dispatcher.Trigger("Account", "SuccessfulLogin", response);
			}
			else
			{
				this.Dispatcher.Trigger("Account", "FailedLogin", result.data.Message);
			}
			
			return response;
		}
		*/

		
	}
}