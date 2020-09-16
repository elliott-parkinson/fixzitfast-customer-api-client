import { AxiosInstance } from "axios";
import { AxiosGetRequest, AxiosPostRequest } from "../Request";
import { AxiosResponse } from "../Response";

import {
	Dispatcher, ApiResponse,
	Services as Model
} from "../Schema";

export namespace Services
{
	export class Handler
	{
		public Dispatcher: Dispatcher;
		public Endpoint: AxiosInstance;

		constructor(props?: any) { Object.assign(this, props); }

		async Search(term?: string): Promise<ApiResponse<Model.Search.Response>>
		{
			let response = new AxiosResponse<Model.Search.Response>({}),
				url = "/services/search",
				domain = "Services", success = "UpdateServiceSearchResults", fail = "UpdateServiceSearchResultsFailed",
				request = new Model.Search.Request({
					search: term
				});
			
			try
			{
				response = await AxiosPostRequest<Model.Search.Response>(this.Endpoint, url, request);
				response.data.Data = new Model.Search.Response(response.data.Data);
			}
			catch (exception)
			{
				response.data.Success = false;
				response.data.ErrorMessage = exception.message;
				response.data.Data = new Model.Search.Response;
			}
			finally
			{
				this.Dispatcher?.Trigger(domain, response?.data?.Success == true ? success : fail, response.data);
				
				return response.data;
			}
		}

		async List(): Promise<ApiResponse<Model.List.Response>>
		{
			let response = new AxiosResponse<Model.List.Response>({}),
				url = "/services/list",
				domain = "Services", success = "UpdateServiceList", fail = "UpdateServiceListFailed";
			
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
		async ListByCategory(categoryId: number): Promise<ApiResponse<Model.ListByCategory.Response>>
		{
			let response = new AxiosResponse<Model.ListByCategory.Response>({}),
				url = "/services/category",
				domain = "Services", success = "UpdateServiceListByCategory", fail = "UpdateServiceListByCategoryFailed",
				request = new Model.ListByCategory.Request({
					serviceId: categoryId
				});
			
			try
			{
				response = await AxiosPostRequest<Model.ListByCategory.Response>(this.Endpoint, url, request);
				response.data.Data = new Model.ListByCategory.Response(response.data.Data);
			}
			catch (exception)
			{
				response.data.Success = false;
				response.data.ErrorMessage = exception.message;
				response.data.Data = new Model.ListByCategory.Response;
			}
			finally
			{
				this.Dispatcher?.Trigger(domain, response?.data?.Success == true ? success : fail, response.data);
				return response.data;
			}
		}
		
		async ListFeatured(): Promise<ApiResponse<Model.ListFeatured.Response>>
		{
			let response = new AxiosResponse<Model.ListFeatured.Response>({}),
				url = "/services/featured",
				domain = "Services", success = "UpdateServiceFeaturedList", fail = "UpdateServiceFeaturedListFailed";
			
			try
			{
				response = await AxiosGetRequest<Model.ListFeatured.Response>(this.Endpoint, url);
				response.data.Data = new Model.ListFeatured.Response(response.data.Data);
			}
			catch (exception)
			{
				response.data.Success = false;
				response.data.ErrorMessage = exception.message;
				response.data.Data = new Model.ListFeatured.Response;
			}
			finally
			{
				this.Dispatcher?.Trigger(domain, response?.data?.Success == true ? success : fail, response.data);
				return response.data;
			}
		}

		
		async GetHourlyCosts(serviceId: number): Promise<ApiResponse<Model.GetHourlyCosts.Response>>
		{
			let response = new AxiosResponse<Model.GetHourlyCosts.Response>({}),
				url = "/services/costs",
				domain = "Services", success = "ServiceGetHourlyCosts", fail = "ServiceGetHourlyCostsFailed",
				request = new Model.GetHourlyCosts.Request({
					serviceId: serviceId
				});
			
			try
			{
				response = await AxiosPostRequest<Model.GetHourlyCosts.Response>(this.Endpoint, url, request);
				response.data.Data = new Model.GetHourlyCosts.Response(response.data.Data);
			}
			catch (exception)
			{
				response.data.Success = false;
				response.data.ErrorMessage = exception.message;
				response.data.Data = new Model.GetHourlyCosts.Response;
			}
			finally
			{
				this.Dispatcher?.Trigger(domain, response?.data?.Success == true ? success : fail, response.data);
				return response.data;
			}
		}
	}
}