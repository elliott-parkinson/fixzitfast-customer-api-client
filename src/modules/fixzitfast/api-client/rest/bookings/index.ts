import { AxiosInstance } from "axios";
import { AxiosGetRequest, AxiosPostRequest } from "../Request";
import { AxiosResponse } from "../Response";

import {
	Dispatcher, ApiResponse,
	Bookings as Model
} from "../Schema";

export namespace Bookings
{
	export class Handler
	{
		public Dispatcher: Dispatcher;
		public Endpoint: AxiosInstance;

		constructor(props?: any) { Object.assign(this, props); }

		async Create(): Promise<ApiResponse<Model.Create.Response>>
		{
			let response = new AxiosResponse<Model.Create.Response>({}),
				url = Model.Create.Url(),
				domain = "Bookings", success = "BookingCreated", fail = "BookingCreationFailure",
				request = new Model.Create.Request({ });
			
			try
			{
				response = await AxiosPostRequest<Model.Create.Response>(this.Endpoint, url, request);
				response.data.Data = new Model.Create.Response(response.data.Data);
			}
			catch (exception)
			{
				response.data.Success = false;
				response.data.ErrorMessage = exception.message;
				response.data.Data = new Model.Create.Response;
			}
			finally
			{
				this.Dispatcher?.Trigger(domain, response?.data?.Success == true ? success : fail, response.data);
				return response.data;
			}
		}

		async SetService(bookingId: number, serviceId: number): Promise<ApiResponse<Model.SetService.Response>>
		{
			let response = new AxiosResponse<Model.SetService.Response>({}),
				url = Model.SetService.Url(bookingId),
				domain = "Bookings", success = "BookingServiceSet", fail = "SettingBookingServiceFailure",
				request = new Model.SetService.Request({ 
					serviceId: serviceId
				});
			
			try
			{
				response = await AxiosPostRequest<Model.SetService.Response>(this.Endpoint, url, request);
				response.data.Data = new Model.SetService.Response(response.data.Data);
			}
			catch (exception)
			{
				response.data.Success = false;
				response.data.ErrorMessage = exception.message;
				response.data.Data = new Model.SetService.Response;
			}
			finally
			{
				this.Dispatcher?.Trigger(domain, response?.data?.Success == true ? success : fail, response.data);
				return response.data;
			}
		}

		async SetLocation(bookingId: number, line1: string, line2: string, line3: string, town: string, county: string, postcode: string): Promise<ApiResponse<Model.SetLocation.Response>>
		{
			let response = new AxiosResponse<Model.SetLocation.Response>({}),
				url = Model.SetLocation.Url(bookingId),
				domain = "Bookings", success = "BookingLocationSet", fail = "SettingBookingLocationFailure",
				request = new Model.SetLocation.Request({ 
					address1: line1,
					address2: line2,
					address3: line3,
					town: town,
					county: county,
					postcode: postcode
				});
			
			try
			{
				response = await AxiosPostRequest<Model.SetLocation.Response>(this.Endpoint, url, request);
				response.data.Data = new Model.SetLocation.Response(response.data.Data);
			}
			catch (exception)
			{
				response.data.Success = false;
				response.data.ErrorMessage = exception.message;
				response.data.Data = new Model.SetLocation.Response;
			}
			finally
			{
				this.Dispatcher?.Trigger(domain, response?.data?.Success == true ? success : fail, response.data);
				return response.data;
			}
		}

		async SetDetails(bookingId: number, repairType: string, details: string, file: string): Promise<ApiResponse<Model.SetDetails.Response>>
		{
			let response = new AxiosResponse<Model.SetDetails.Response>({}),
				url = Model.SetDetails.Url(bookingId),
				domain = "Bookings", success = "BookingDetailsSet", fail = "SettingBookingDetailsFailure",
				request = new Model.SetDetails.Request({
					repairType: repairType,
					details: details,
					file: file
				});
			
			try
			{
				response = await AxiosPostRequest<Model.SetDetails.Response>(this.Endpoint, url, request);
				response.data.Data = new Model.SetDetails.Response(response.data.Data);
			}
			catch (exception)
			{
				response.data.Success = false;
				response.data.ErrorMessage = exception.message;
				response.data.Data = new Model.SetDetails.Response;
			}
			finally
			{
				this.Dispatcher?.Trigger(domain, response?.data?.Success == true ? success : fail, response.data);
				return response.data;
			}
		}

		async SetTimeslot(bookingId: number, date: string, startTime: string, finishTime: string): Promise<ApiResponse<Model.SetTimeslot.Response>>
		{
			let response = new AxiosResponse<Model.SetTimeslot.Response>({}),
				url = Model.SetTimeslot.Url(bookingId),
				domain = "Bookings", success = "BookingTimeslotSet", fail = "SettingBookingTimeslotFailure",
				request = new Model.SetTimeslot.Request({
					date: date,
					timeStart: startTime,
					timeFinish: finishTime
				});
			
			try
			{
				response = await AxiosPostRequest<Model.SetTimeslot.Response>(this.Endpoint, url, request);
				response.data.Data = new Model.SetTimeslot.Response(response.data.Data);
			}
			catch (exception)
			{
				response.data.Success = false;
				response.data.ErrorMessage = exception.message;
				response.data.Data = new Model.SetTimeslot.Response;
			}
			finally
			{
				this.Dispatcher?.Trigger(domain, response?.data?.Success == true ? success : fail, response.data);
				return response.data;
			}
		}

		async AddSignature(bookingId: number, signature: string): Promise<ApiResponse<Model.AddSignature.Response>>
		{
			let response = new AxiosResponse<Model.AddSignature.Response>({}),
				url = Model.AddSignature.Url(bookingId),
				domain = "Bookings", success = "BookingAddSignature", fail = "BookingAddingSignatureFailure",
				request = new Model.AddSignature.Request({
					bookingId: bookingId,
					signatureData: signature
				});
			
			try
			{
				response = await AxiosPostRequest<Model.AddSignature.Response>(this.Endpoint, url, request);
				response.data.Data = new Model.AddSignature.Response(response.data.Data);
			}
			catch (exception)
			{
				response.data.Success = false;
				response.data.ErrorMessage = exception.message;
				response.data.Data = new Model.AddSignature.Response;
			}
			finally
			{
				this.Dispatcher?.Trigger(domain, response?.data?.Success == true ? success : fail, response.data);
				return response.data;
			}
		}

		async Complete(bookingId: number, name: string, email: string, password: string): Promise<ApiResponse<Model.Complete.Response>>
		{
			let response = new AxiosResponse<Model.Complete.Response>({}),
				url = Model.Complete.Url(bookingId),
				domain = "Bookings", success = "BookingComplete", fail = "BookingCompletionFailure",
				request = new Model.Complete.Request({
					name: name,
					email: email,
					password: password

				});
			
			try
			{
				response = await AxiosPostRequest<Model.Complete.Response>(this.Endpoint, url, request);
				response.data.Data = new Model.Complete.Response(response.data.Data);
			}
			catch (exception)
			{
				response.data.Success = false;
				response.data.ErrorMessage = exception.message;
				response.data.Data = new Model.Complete.Response;
			}
			finally
			{
				this.Dispatcher?.Trigger(domain, response?.data?.Success == true ? success : fail, response.data);
				return response.data;
			}
		}

		async GetUpcoming(userId: number): Promise<ApiResponse<Model.GetUpcoming.Response>>
		{
			let response = new AxiosResponse<Model.GetUpcoming.Response>({}),
				url = Model.GetUpcoming.Url(userId),
				domain = "Bookings", success = "UpcomingBookings", fail = "UpcomingBookingsFailure",
				request = new Model.GetUpcoming.Request({ });
			
			try
			{
				response = await AxiosPostRequest<Model.Complete.Response>(this.Endpoint, url, request);
				response.data.Data = new Model.Complete.Response(response.data.Data);
			}
			catch (exception)
			{
				response.data.Success = false;
				response.data.ErrorMessage = exception.message;
				response.data.Data = new Model.Complete.Response;
			}
			finally
			{
				this.Dispatcher?.Trigger(domain, response?.data?.Success == true ? success : fail, response.data);
				return response.data;
			}
		}
	}
}