import { List } from "./List";
import { ListAvailable } from "./ListAvailable";

export interface IEngineerHandler
{
	List(): Promise<List.Response>;
	ListAvailable(): Promise<ListAvailable.Response>;
}