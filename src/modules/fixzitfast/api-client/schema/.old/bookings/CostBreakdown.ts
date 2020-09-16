export namespace CostBreakdown
{
	export class Request
	{
		id: any;

		constructor(props?: Request) { Object.assign(this, props); }
	}

	export class CostItem
	{
		title: string;
		quantity: number;
		cost: number;
		currency: string = "GBP";

		constructor(props?: CostItem) { Object.assign(this, props); }
	}

	export class Cost
	{
		cost: number;
		currency: string = "GBP";

		constructor(props?: Cost) { Object.assign(this, props); }
	}
	
	export class Response
	{
		id: any;
		costs: CostItem[] = [];

		subtotal: Cost;
		vat: Cost;
		total: Cost;
		totalPaid: Cost;

		constructor(props?: Response)
		{
			Object.assign(this, props);
			
			this.costs = props.costs.map(cost => new CostItem(cost));

			this.subtotal = new Cost(props.subtotal);
			this.vat = new Cost(props.vat);
			this.total = new Cost(props.total);
			this.totalPaid = new Cost(props.totalPaid);
		}
	}
}

