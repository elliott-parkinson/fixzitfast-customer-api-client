import 'mocha';
import { expect } from 'chai';
import { step } from 'mocha-steps';

import { apiClient, apiClientAuthenticated, testData } from "./config";
import { generalChecks } from "./util";

const verifyService = service =>
{
    expect(service.id, "A service should have an id.").to.not.be.undefined;
    expect(service.id, "A id should be a number.").to.be.a('number');
    
    expect(service.name, "A service should have a name.").to.not.be.undefined;
    expect(service.name, "A name should be a string.").to.be.a('string');

    expect(service.hourlyRate, "A service should have a hourlyRate.").to.not.be.undefined;
    expect(service.hourlyRate, "A hourlyRate should be a number.").to.be.a('number');
    
    expect(service.parent, "A service should have a parent.").to.not.be.undefined;
    expect(service.parent, "A parent should be a number.").to.be.a('number');
}

const verifyCost = cost =>
{
    expect(cost.id, "A cost should have an id.").to.not.be.undefined;
    expect(cost.id, "A id should be a number.").to.be.a('number');
    
    expect(cost.hourlyRate, "A cost should have a hourlyRate.").to.not.be.undefined;
    expect(cost.hourlyRate, "A hourlyRate should be a number.").to.be.a('number');

    expect(cost.additionalHalfHour, "A cost should have a additionalHalfHour.").to.not.be.undefined;
    expect(cost.additionalHalfHour, "A additionalHalfHour should be a number.").to.be.a('number');
}


describe('Services', () =>
{
    it('should list all services', async () =>
    {
        let result = await apiClient.Services.List();
        generalChecks(result);

        expect(result.Data.services, "The 'services' array should be in the response.").to.not.be.undefined;
        expect(result.Data.services.length, "The 'services' array should not be empty.").to.be.above(0);

        verifyService(result.Data.services[0]);
    });

    it('should list featured services', async () =>
    {
        let result = await apiClient.Services.ListFeatured();
        generalChecks(result);

        expect(result.Data.services, "The 'services' array should be in the response.").to.not.be.undefined;
        expect(result.Data.services.length, "The 'services' array should not be empty.").to.be.above(0);

        verifyService(result.Data.services[0]);
    });

    it('should return results when searching for "plumbing"', async () =>
    {
        let result = await apiClient.Services.Search("plumbing");
        generalChecks(result);

        expect(result.Data.services, "The 'services' array should be in the response.").to.not.be.undefined;
        expect(result.Data.services.length, "The 'services' array should not be empty.").to.be.above(0);

        verifyService(result.Data.services[0]);

        expect(result.Data.services[0].name, "The service name should have 'plumbing' in it and be related to the search term.").to.include("plumbing");
    });

    it('should return results when searching for services for the category 2', async () =>
    {
        let result = await apiClient.Services.ListByCategory(1);
        generalChecks(result);

        expect(result.Data.services, "The 'services' array should be in the response.").to.not.be.undefined;
        expect(result.Data.services.length, "The 'services' array should not be empty.").to.be.above(0);

        verifyService(result.Data.services[0]);

        expect(result.Data.services[0].parentId, "The service parentId should be 1 as that's what was searched for.").to.equal(1);
    });

    it('should return hourly costs for the category 1', async () =>
    {
        let result = await apiClient.Services.GetHourlyCosts(2);
        generalChecks(result);

        expect(result.Data.costs, "The 'costs' array should be in the response.").to.not.be.undefined;
        expect(result.Data.costs.length, "The 'costs' array should not be empty.").to.be.above(0);

        
        verifyCost(result.Data.costs[0]);
    });
});
