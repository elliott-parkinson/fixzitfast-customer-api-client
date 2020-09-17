import { AxiosInstance } from "axios";
import { AxiosGetRequest, AxiosPostRequest } from "../Request";
import { AxiosResponse } from "../Response";

import {
	Dispatcher, ApiResponse,
	Payment as Model
} from "../Schema";


export namespace Payment
{
	export class Handler
	{
		public Dispatcher: Dispatcher;
		public Endpoint: AxiosInstance;

		constructor(props?: any) { Object.assign(this, props); }

		async AddCardDetails(userId: number, bookingId: number, cardNumber: string, cardName: string, cardExpiry: string, cvc: string): Promise<ApiResponse<Model.AddCardDetails.Response>>
		{
			let response = new AxiosResponse<Model.AddCardDetails.Response>({}),
				url = Model.AddCardDetails.Url(bookingId),
				domain = "Payment", success = "SuccessfullyAddedCardDetails", fail = "AddCardDetailsFailure",
				request = new Model.AddCardDetails.Request({
					userId: userId,
					bookingId: bookingId,
					cardName: cardName,
					cardNumber: cardNumber,
					cardExpiry: cardExpiry,
					cvc: cvc
				});
			
			try
			{
				response = await AxiosPostRequest<Model.AddCardDetails.Response>(this.Endpoint, url, request);
				response.data.Data = new Model.AddCardDetails.Response(response.data.Data);
			}
			catch (exception)
			{
				response.data.Success = false;
				response.data.ErrorMessage = exception.message;
				response.data.Data = new Model.AddCardDetails.Response;
			}
			finally
			{
				this.Dispatcher?.Trigger(domain, response?.data?.Success == true ? success : fail, response.data);
				return response.data;
			}
		}

		async UpdateCardDetails(userId: number, bookingId: number, cardNumber: string, cardName: string, cardExpiry: string, cvc: string): Promise<ApiResponse<Model.UpdateCardDetails.Response>>
		{
			let response = new AxiosResponse<Model.UpdateCardDetails.Response>({}),
				url = Model.UpdateCardDetails.Url(bookingId),
				domain = "Payment", success = "SuccessfullyUpdateedCardDetails", fail = "UpdateCardDetailsFailure",
				request = new Model.UpdateCardDetails.Request({
					userId: userId,
					bookingId: bookingId,
					cardName: cardName,
					cardNumber: cardNumber,
					cardExpiry: cardExpiry,
					cvc: cvc
				});
			
			try
			{
				response = await AxiosPostRequest<Model.UpdateCardDetails.Response>(this.Endpoint, url, request);
				response.data.Data = new Model.UpdateCardDetails.Response(response.data.Data);
			}
			catch (exception)
			{
				response.data.Success = false;
				response.data.ErrorMessage = exception.message;
				response.data.Data = new Model.UpdateCardDetails.Response;
			}
			finally
			{
				this.Dispatcher?.Trigger(domain, response?.data?.Success == true ? success : fail, response.data);
				return response.data;
			}
		}

		async ProcessCardPayment(userId: number, bookingId: number, cardNumber: string, cardName: string, cardExpiry: string, cvc: string): Promise<ApiResponse<Model.ProcessCardPayment.Response>>
		{
			let response = new AxiosResponse<Model.ProcessCardPayment.Response>({}),
				url = Model.ProcessCardPayment.Url(bookingId),
				domain = "Payment", success = "SuccessfullyProcessedCardDetails", fail = "ProcessCardDetailsFailure",
				request = new Model.ProcessCardPayment.Request({
					userId: userId,
					bookingId: bookingId,
					cardName: cardName,
					cardNumber: cardNumber,
					cardExpiry: cardExpiry,
					cvc: cvc
				});
			
			try
			{
				response = await AxiosPostRequest<Model.ProcessCardPayment.Response>(this.Endpoint, url, request);
				response.data.Data = new Model.ProcessCardPayment.Response(response.data.Data);
			}
			catch (exception)
			{
				response.data.Success = false;
				response.data.ErrorMessage = exception.message;
				response.data.Data = new Model.ProcessCardPayment.Response;
			}
			finally
			{
				this.Dispatcher?.Trigger(domain, response?.data?.Success == true ? success : fail, response.data);
				return response.data;
			}
		}
	}
}