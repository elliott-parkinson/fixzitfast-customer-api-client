import { expect } from 'chai';

export const generalChecks = (result: any, success: boolean = true) =>
{
    expect(result.ErrorMessage, "The response is malformed and does not contain a ErrorMessage property.").to.not.be.undefined;
    expect(result.Success, "The response is malformed and does not contain a Success property.").to.not.be.undefined;

    if (success == true)
    {
        expect(result.ErrorMessage).to.be.empty;
        expect(result.Success).to.be.true;
    }
    else
    {
        expect(result.ErrorMessage).to.be.a("string");
        expect(result.Success).to.be.false;
    }
}