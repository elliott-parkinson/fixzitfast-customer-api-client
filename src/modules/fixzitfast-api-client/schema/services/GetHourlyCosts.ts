export namespace GetHourlyCosts
{
	export class Request
	{
		constructor(props?: Request) { Object.assign(this, props); }
	}
	
	export class Response
	{
		costs: {
			id: number,
			dailyRate: number
			additionalHalfHour: number
		}[];

		constructor(props?: Response) { console.log(props); Object.assign(this, props); }
	}
}

