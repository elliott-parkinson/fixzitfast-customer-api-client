import Dependencies from "typedi";
import { observable, action, computed } from "mobx";

import { serialize, deserialize } from "serializer.ts/Serializer";
import { Type } from "serializer.ts/Decorators";
import { BookingListItem, BOOKINGTYPES } from "./BookingListItem";
import { InProgressBooking } from "./InProgressBooking";

export class BookingList
{
	@Type(() => Date)
	@observable LastUpdated: Date;

	@Type(() => BookingListItem)
	@observable List: BookingListItem[] = [];

	@action async Fetch()
	{
		// this.List = bookings_stub.map( item => deserialize(BookingListItem, item) );
	}
}

export class Bookings
{
    @Type(() => BookingList)
    @observable List: BookingList = new BookingList;

    @Type(() => InProgressBooking)
    @observable InProgress: InProgressBooking = new InProgressBooking;

    constructor()
    {
        this.Load();
    }
    
    @computed get Upcoming()
    {
        return this.List.List.filter(item => item.Type == BOOKINGTYPES.UPCOMING);
    }

    @computed get Past()
    {
        return this.List.List.filter(item => item.Type == BOOKINGTYPES.PAST);
    }

    @action Create(categoryId: string, categoryName: string, categoryType: string)
    {
        this.InProgress = new InProgressBooking;

        if (categoryId)
        {
            this.InProgress.Service.SetCategory(categoryId, categoryName, categoryType);
        }
    }


	Store()
    {
        let storage = window.localStorage;
		storage.setItem('fixzitfast.bookings.list', JSON.stringify( serialize(this.List) ));
    }

    @action Load()
    {
		let storage = window.localStorage;
		
		let list: any = storage.getItem('fixzitfast.bookings.list');
		if (list != undefined)
		{
			this.List = deserialize(BookingList, JSON.parse(list) );
		}
    }

    @action Clear()
    {
        this.List.List = [];

        let storage = window.localStorage;
		storage.removeItem('fixzitfast.bookings.list');
    }
}