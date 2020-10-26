import { observable, action, computed } from "mobx";


export class RouteSettings
{
	@observable LoggedIn: boolean = true;
}

export class RouteService
{
	private History: any;

	@observable
	public Location: string;

	@observable
	public Settings: RouteSettings = new RouteSettings;

	@observable Hops: number = 0;
	@observable Forwards: number = 0;

	CheckAuth(path: string)
	{
		if (this.Settings.LoggedIn == false)
		{
			if (path.indexOf("/auth/") === -1)
			{
				this.History.push("/auth/login");
				return false;
			}
		}

		return true;
	}

	SetHistory(history: any)
	{
		this.History = history;
		this.Location = history.location.pathname;
		
		this.History.listen( (location, action) => this.Location = location.pathname);

		this.CheckAuth(this.Location);
	}

	public scrollToTop() {
		const content = document.getElementById("content");
		const c = content.scrollTop || document.body.scrollTop;
		if (c > 0) {
			window.requestAnimationFrame( a => this.scrollToTop() );
			content.scrollTo(0, c - c / 8);
		}
	}

	@action Go(path: string)
	{
		this.CheckAuth(path) && this.History.push(path);

		this.Hops++;
		this.Forwards = 0;
		
		setTimeout( e=> {
			this.scrollToTop();
		}, 300);

		return false;
	}

	@action Back(path: string)
	{
		this.History.goBack();
		this.Hops--;
		this.Forwards++;
	}

	@action Forward(path: string)
	{
		this.History.goForward();
		this.Hops++;
		this.Forwards--;
	}

	@computed get CanGoBack(): boolean
	{
		return this.Hops >=1;
	}

	@computed get CanGoForward(): boolean
	{
		return this.Forwards >=1;
	}
}