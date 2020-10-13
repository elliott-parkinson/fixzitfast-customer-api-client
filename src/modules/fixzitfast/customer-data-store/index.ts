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

    setInterval(() =>
    {
        // store.CurrentUser.LoggedIn = !store.CurrentUser.LoggedIn;
    }, 1000);


    window.addEventListener("message", event => {
        console.warn( JSON.parse(event.data) );
    }, false);
}