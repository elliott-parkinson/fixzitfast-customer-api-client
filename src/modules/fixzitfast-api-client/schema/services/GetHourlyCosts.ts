export namespace GetHourlyCosts
{
	export class Request
	{
		constructor(props?: Request) { Object.assign(this, props); }
	}
	
	export class Response
	{
		services: {
			serviceId: number,
			name: string
		}[];

		constructor(props?: Response) { Object.assign(this, props); }
	}
}

