import { AxiosInstance } from "axios";
import { AxiosResponse } from "./Response";

import { ApiRequest } from "./Schema";

export const AxiosGetRequest = async <T> (endpoint: AxiosInstance, url: string): Promise<AxiosResponse<T>> =>
{
	const result = await endpoint.get(url),
		response = new AxiosResponse<T>(result);

	return response;
}

export const AxiosPostRequest = async <T> (endpoint: AxiosInstance, url: string, data: any): Promise<AxiosResponse<T>> =>
{
	const request = new ApiRequest({ Data: data }),
		result = await endpoint.post(url, request.Data),
		response = new AxiosResponse<T>(result);

	return response;
}