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
			parentId: number,
			serviceId: number,
			name: string
		}[];

		constructor(props?: Response) { Object.assign(this, props); }
	}
}

