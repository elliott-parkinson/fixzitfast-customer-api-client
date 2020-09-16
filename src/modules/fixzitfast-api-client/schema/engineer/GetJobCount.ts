export namespace GetJobCount
{
	export let Url = () => "/engineer/jobcount";
	export let RequestType: string = "POST";

	export class Request
	{
		userId: number;

		constructor(props?: Request) { Object.assign(this, props); }
	}
	
	export class Response
	{
		jobCount: number = 0;

		constructor(props?: Response)
		{
			Object.assign(this, props);
		}
	}
}

