export namespace List
{
	export class Request
	{
		constructor(props?: Request) { Object.assign(this, props); }
	}
	
	export class Response
	{
		engineers: {
			categoryId: number,
			categoryName: string
		}[] = [];

		constructor(props?: Response)
		{
			//Object.assign(this, props);
			this.engineers = props as any;
		}
	}
}

