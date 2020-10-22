import Dependencies from "typedi";
import stub from "../../../customer-store/data/FeaturedTestimonials";


export class Testimonial
{
	Id: string;
	AvatarUrl: string;
	Name: string;
	Excerpt: string;
	StarRating: number;

	ToJSON()
	{
		return JSON.stringify(this);
	}

	FromJSON(json: any)
	{
		Object.assign(this, json);
	}
}


export class Testimonials
{
	private LastUpdated: Date;

	private FeaturedTestimonials: Testimonial[] = [];

	constructor()
	{
		this.Load();
		this.GetFeatured(true);
		this.Store();
	}

	Store()
	{
		let storage = window.localStorage;

		let featured = this.FeaturedTestimonials.map( item => item.ToJSON() );
		storage.setItem('fixzitfast.testimonials.featured', JSON.stringify(featured));
	}

	Update()
	{
		this.FetchFeatured();
		this.Store();
	}

	Load()
	{
		let storage = window.localStorage;
		let featured = storage.getItem('fixzitfast.testimonials.featured');
		if (featured != undefined)
		{
			let items = JSON.parse(featured);
			
			this.FeaturedTestimonials = items.map( item => {
				let testimonial = new Testimonial;
				testimonial.FromJSON(item);
				return testimonial;
			});
		}
	}

	async FetchFeatured()
	{
		this.FeaturedTestimonials = stub.map( item => {
			let testimonial = new Testimonial;
			testimonial.FromJSON(item);
			return testimonial;
		});
	}

	async GetFeatured(force: boolean = false): Promise<Testimonial[]>
	{
		if (this.FeaturedTestimonials == undefined || force == true)
		{
			await this.FetchFeatured();
		}

		return this.FeaturedTestimonials;
	}
}