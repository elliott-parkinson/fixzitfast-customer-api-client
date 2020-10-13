import "reflect-metadata";
import "es6-shim";

import Container from "typedi";



export class App
{
	static async Init()
	{
		Container.of("Workers").set("api", {} );

		await import("../../www/view");
	}
}

App.Init();