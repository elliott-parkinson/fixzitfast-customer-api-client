import { ApiResponse } from "./Schema";

export class AxiosResponse<T>
{
	data: ApiResponse<T> = new ApiResponse<T>();
	status: number = 404;
	statusText: string = "Unable to contact API server.";

	constructor(data: any)
	{
		this.status = data.status;
		this.statusText = data.statusText;

		this.data = new ApiResponse<T>({
			Success: data.data?.Success,
			ErrorMessage: data.data?.ErrorMessage,
			Data: data.data?.Data
		});
		
		if (data.status != 200)
		{
			// Error?
		}
	}	
}