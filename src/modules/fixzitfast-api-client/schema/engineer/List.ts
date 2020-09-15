export namespace List
{
	export class Request
	{
		constructor(props?: Request) { Object.assign(this, props); }
	}
	
	export class Response
	{
		engineers: {
			id: number,
			name: string
		}[];

		constructor(props?: Response) { Object.assign(this, props); }
	}
}

