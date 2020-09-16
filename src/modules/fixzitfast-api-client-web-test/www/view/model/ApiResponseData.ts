import { action, observable } from "mobx";

export class ApiResponseData
{
    @observable Performed: boolean = false;
    @observable Loading: boolean = false;
    @observable ErrorMessage: string = undefined;
    @observable Success: boolean = false;
    @observable Data: any;

    @action async ProcessFor(request: any)
    {
        try
        {
            let result = await request();
            this.Performed = true;
            this.Loading = false;
            this.Success = result.Success;
            this.ErrorMessage = result.ErrorMessage;
            this.Data = result.Data;

            return result;
        }
        catch (error)
        {
            this.Performed = true;
            this.Loading = false;
            this.Success = false;
            this.ErrorMessage = "Unknown API Error Occured. Server response was invalid.";
            this.Data = error;

            console.error(error);

            return false;
        }
    }

    @action Reset()
    {
        this.Performed = false;
        this.Loading = false;
        this.ErrorMessage = undefined;
        this.Success = false;
        this.Data = undefined;
    }
}