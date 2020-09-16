export namespace ListByCategory
{
	export class Request
	{
		serviceId: number;

		constructor(props?: Request) { Object.assign(this, props); }
	}
	
	export class Response
	{
		services: {
			id: number,
			name: string,
			icon: string,
			hourlyRate: number,
			parent: number
		}[];

		constructor(props?: Response) { Object.assign(this, props); }
	}
}

