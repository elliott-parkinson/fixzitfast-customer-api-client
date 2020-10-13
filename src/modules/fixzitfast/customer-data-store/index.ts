import { observable, toJS, autorun, when } from "mobx";

import { Store } from "./model";


export namespace CustomerDataStore
{

    let store = new Store();
    store.Account.Load();
    store.Bookings.Load();
    store.Services.Load();



    /* On Logout */
    when(() => store.Account.LoggedIn == false, async () =>
    {
        store.Bookings.Clear();
    });


    autorun( () =>
    {
        window.postMessage(
            JSON.stringify(toJS(store.Account.CurrentUser)),
            "*"
        );

        if (store.Account.LoggedIn)
        {
            console.log("User logged in");
        }
        else
        {
            console.log("User logged out");
        }
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