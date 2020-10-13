import Dependencies from "typedi";
import stub from "../../data/FeaturedTestimonials";


export class FeaturedTestimonial
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


export class TestimonialStore
{
	private LastUpdated: Date;

	private FeaturedTestimonials: FeaturedTestimonial[] = [];

	constructor()
	{
		this.Load();
		this.GetFeaturedTestimonials(true);
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
		this.FetchFeaturedTestimonials();
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
				let testimonial = new FeaturedTestimonial;
				testimonial.FromJSON(item);
				return testimonial;
			});
		}
	}

	async FetchFeaturedTestimonials()
	{
		this.FeaturedTestimonials = stub.map( item => {
			let testimonial = new FeaturedTestimonial;
			testimonial.FromJSON(item);
			return testimonial;
		});
	}

	async GetFeaturedTestimonials(force: boolean = false): Promise<FeaturedTestimonial[]>
	{
		if (this.FeaturedTestimonials == undefined || force == true)
		{
			await this.FetchFeaturedTestimonials();
		}

		return this.FeaturedTestimonials;
	}
}