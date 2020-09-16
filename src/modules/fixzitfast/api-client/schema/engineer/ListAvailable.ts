export namespace ListAvailable
{
	export class Request
	{
		date: string;
		timeStart: string;
		timeFinish: string;
		location: any;

		constructor(props?: Request) { Object.assign(this, props); }
	}
	
	export class Response
	{
		engineers: {
			categoryId: number,
			categoryName: string
		}[];

		constructor(props?: Response) { Object.assign(this, props); }
	}
}

