import "reflect-metadata";
import "es6-shim";

import Container from "typedi";



export class App
{
	static async Init()
	{
		await import("../../www/view");
	}
}

App.Init();