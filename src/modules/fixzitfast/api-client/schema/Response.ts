export class ApiResponse<T>
{
	Success: boolean = false;
	ErrorMessage: string = "Data not set by server.";
	Data: T | any = {};

	constructor(props?) { Object.assign(this, props); }
}