export namespace Search
{
	export class Request
	{
		search: string = "";
		
		constructor(props?: Request) { Object.assign(this, props); }
	}
	
	export class Response
	{
		services: {
			serviceId: number,
			serviceName: string,
			serviceIcon: string,
			serviceHourlyRate: number,
			serviceParent: number
		}[];

		constructor(props?: Response) { Object.assign(this, props); }
	}
}

