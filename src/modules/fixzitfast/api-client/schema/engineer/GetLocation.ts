export namespace GetLocation
{
	export let Url = () => "/engineer/location";
	export let RequestType: string = "POST";

	export class Request
	{
		id: number;

		constructor(props?: Request) { Object.assign(this, props); }
	}
	
	export class Response
	{
		location: {
			
		};

		constructor(props?: Response)
		{
			Object.assign(this, props);
		}
	}
}

