export namespace List
{
	export class Request
	{
		constructor(props?: Request) { Object.assign(this, props); }
	}
	
	export class Response
	{
		notifications: {
			id: number,
			message: string
		}[];

		constructor(props?: Response) { Object.assign(this, props); }
	}
}

