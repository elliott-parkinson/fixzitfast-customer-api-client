import { observable, toJS, autorun, when } from "mobx";

import { Store } from "./model";


export namespace CustomerDataStore
{

    let store = new Store();
    store.Account.Load();
    store.Bookings.Load();
    store.Services.Load();

    /* On Login */
    when( () => store.Account.LoggedIn == false, async () =>
    {
        store.Account.Store();
        
        // check notifications
    });

    /* On Logout */
    when( () => store.Account.LoggedIn == false, async () =>
    {
        store.Account.Store();
        store.Bookings.Clear();
    });


    autorun( async () =>
    {
        await store.Services.Services.Fetch();
        await store.Services.Categories.Fetch();

		store.Services.Store();
    });



    window.addEventListener("message", event =>
    {
        console.warn( "message", JSON.parse(event.data) );
    }, false);
}