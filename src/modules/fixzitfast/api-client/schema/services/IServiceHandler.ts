import { Search } from "./Search";
import { List } from "./List";
import { ListByCategory } from "./ListByCategory";
import { ListFeatured } from "./ListFeatured";
import { GetHourlyCosts } from "./GetHourlyCosts";

export interface IServiceHandler
{
	Search(term: string): Promise<Search.Response>
	ListByCategory(categoryId: number): Promise<ListByCategory.Response>
	List(): Promise<List.Response>
	ListFeatured(): Promise<ListFeatured.Response>
	
	GetHourlyCosts(serviceId: number): Promise<GetHourlyCosts.Response> 
}