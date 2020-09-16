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
					name: name,
					email: email,
					password: password,
					phone: phone
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

		async Login(email: string, password: string): Promise<ApiResponse<Model.Login.Response>>
		{
			let response = new AxiosResponse<Model.Login.Response>({}),
				url = Model.Login.Url(),
				domain = "Account", success = "RequestUserDetails", fail = "RequestUserDetailsFailed",
				request = new Model.Login.Request({
					email: email,
					password: password,
				});
			
			try
			{
				response = await AxiosPostRequest<Model.Login.Response>(this.Endpoint, url, request);
				response.data.Data = new Model.Login.Response(response.data.Data);
			}
			catch (exception)
			{
				response.data.Success = false;
				response.data.ErrorMessage = exception.message;
				response.data.Data = new Model.Login.Response;
			}
			finally
			{
				this.Dispatcher?.Trigger(domain, response?.data?.Success == true ? success : fail, response.data);
				return response.data;
			}
		}

		async GetUserDetails(id: number): Promise<ApiResponse<Model.GetUserDetails.Response>>
		{
			let response = new AxiosResponse<Model.GetUserDetails.Response>({}),
				url = Model.GetUserDetails.Url(id),
				domain = "Account", success = "AuthenticatedUserDetails", fail = "FailedAuthenticatedUserDetailsFetch",
				request = new Model.GetUserDetails.Request({
					id: id
				});
			
			try
			{
				response = await AxiosPostRequest<Model.GetUserDetails.Response>(this.Endpoint, url, request);
				response.data.Data = new Model.GetUserDetails.Response(response.data.Data);
			}
			catch (exception)
			{
				response.data.Success = false;
				response.data.ErrorMessage = exception.message;
				response.data.Data = new Model.GetUserDetails.Response;
			}
			finally
			{
				this.Dispatcher?.Trigger(domain, response?.data?.Success == true ? success : fail, response.data);
				return response.data;
			}
		}
		
		async UpdateUserDetails(id: number, name: string, email: string, password: string, phone: string): Promise<ApiResponse<Model.UpdateUserDetails.Response>>
		{
			let response = new AxiosResponse<Model.UpdateUserDetails.Response>({}),
				url = Model.UpdateUserDetails.Url(id),
				domain = "Account", success = "SuccessfulUpdateUserDetails", fail = "FailedUpdateUserDetails",
				request = new Model.UpdateUserDetails.Request({
					name: name,
					email: email,
					password: password,
					phone: phone
				});
			
			try
			{
				response = await AxiosPostRequest<Model.UpdateUserDetails.Response>(this.Endpoint, url, request);
				response.data.Data = new Model.UpdateUserDetails.Response(response.data.Data);
			}
			catch (exception)
			{
				response.data.Success = false;
				response.data.ErrorMessage = exception.message;
				response.data.Data = new Model.UpdateUserDetails.Response;
			}
			finally
			{
				this.Dispatcher?.Trigger(domain, response?.data?.Success == true ? success : fail, response.data);
				return response.data;
			}
		}

		async ResetPassword(id: number, password: string, oldPassword: string): Promise<ApiResponse<Model.ResetPassword.Response>>
		{
			let response = new AxiosResponse<Model.ResetPassword.Response>({}),
				url = Model.ResetPassword.Url(),
				domain = "Account", success = "SuccessfulResetPassword", fail = "FailedResetPassword",
				request = new Model.ResetPassword.Request({
					id: id,
					password: password,
					oldPassword: oldPassword,
				});
			
			try
			{
				response = await AxiosPostRequest<Model.ResetPassword.Response>(this.Endpoint, url, request);
				response.data.Data = new Model.ResetPassword.Response(response.data.Data);
			}
			catch (exception)
			{
				response.data.Success = false;
				response.data.ErrorMessage = exception.message;
				response.data.Data = new Model.ResetPassword.Response;
			}
			finally
			{
				this.Dispatcher?.Trigger(domain, response?.data?.Success == true ? success : fail, response.data);
				return response.data;
			}
		}

		async ForgotPassword(email: string): Promise<ApiResponse<Model.ForgotPassword.Response>>
		{
			let response = new AxiosResponse<Model.ForgotPassword.Response>({}),
				url = Model.ForgotPassword.Url(),
				domain = "Account", success = "SuccessfulForgotPassword", fail = "FailedForgotPassword",
				request = new Model.ForgotPassword.Request({
					email: email,
				});
			
			try
			{
				response = await AxiosPostRequest<Model.ForgotPassword.Response>(this.Endpoint, url, request);
				response.data.Data = new Model.ForgotPassword.Response(response.data.Data);
			}
			catch (exception)
			{
				response.data.Success = false;
				response.data.ErrorMessage = exception.message;
				response.data.Data = new Model.ForgotPassword.Response;
			}
			finally
			{
				this.Dispatcher?.Trigger(domain, response?.data?.Success == true ? success : fail, response.data);
				return response.data;
			}
		}

		/*
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
		*/
	}
}