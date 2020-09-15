import { List } from "./List";

export interface INotificationHandler
{
	List(): Promise<List.Response>;
}