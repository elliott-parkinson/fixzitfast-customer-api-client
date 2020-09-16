import { expect } from 'chai';

export const generalChecks = (result: any, success: boolean = true) =>
{
    expect(result.ErrorMessage, "The response is malformed and does not contain a ErrorMessage property.").to.not.be.null;
    expect(result.Success, "The response is malformed and does not contain a Success property.").to.not.be.null;

    if (success == true)
    {
        expect(result.Success).to.be.true;
        expect(result.ErrorMessage).to.be.empty;
    }
    else
    {
        expect(result.Success).to.be.false;
        expect(result.ErrorMessage).to.be.a("string");
    }
}