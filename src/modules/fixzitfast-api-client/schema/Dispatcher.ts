
interface IEvent<T>
{
	(scope: string, action: string, data: T): void;
}

export class Dispatcher
{
	Subscriptions = new Map<string, Map<string, Set<any>>>();

	Trigger(scope: string, action: string, data: any)
	{
		self.postMessage({
			type: "message",
			to: 'view',
			scope: scope,
			action: action,
			data: data
		}, null);

		return;

		const actions = this.Subscriptions.get(scope);
		const callbacks = actions.has(action) ? actions.get(action) : new Set;
			
		
		callbacks.forEach(callback => callback(scope, action, data));
	}

	Subscribe<T>(scope: string, action: string, callback: IEvent<T>)
	{
		(this.Subscriptions.has(scope) == false) && this.Subscriptions.set(scope, new Map);
		const actions = this.Subscriptions.get(scope);

		(actions.has(action) == false) && actions.set(action, new Set);
		const event = actions.get(action);

		event.add(callback);
	}
}