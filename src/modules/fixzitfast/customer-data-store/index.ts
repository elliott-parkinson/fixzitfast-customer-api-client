import { autorun, observable, toJS } from "mobx";

import { Store } from "./model";


export namespace CustomerDataStore
{

    let store = new Store();


    autorun( () =>
    {
        window.postMessage(
            JSON.stringify(toJS(store.Account.CurrentUser)),
            "*"
        );

        if (store.Account.LoggedIn)
        {
            console.log("User logged in");
            store.Account.CurrentUser.Store();
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

        console.log( toJS(store.Services.Services) );
        console.log( toJS(store.Services.Categories) );
    });



    

    setInterval(() =>
    {
        // get service categories
        // get services

        // store.CurrentUser.LoggedIn = !store.CurrentUser.LoggedIn;
    }, 1000);


    window.addEventListener("message", event =>
    {
        console.warn( "message", JSON.parse(event.data) );
    }, false);
}