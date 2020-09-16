import 'mocha';
import { expect } from 'chai';
import { step } from 'mocha-steps';

import { apiClient, apiClientAuthenticated, testData } from "./config";
import { generalChecks } from "./util";


describe('Notifications', () =>
{
    let loggedInUserId = -1;

    before('Login:', async () =>
    {
        let result = await apiClientAuthenticated.Account.Login(
            testData.user,
            testData.password,
        );

        generalChecks(result);

        loggedInUserId = result.Data.id;
    });

    it('should error if not logged in when getting notifications', async () =>
    {
        let result = await apiClient.Notifications.List(-1);
        generalChecks(result, false);
    });

    it('should error when requesting notifications for a user that doesnt exist', async () =>
    {
        let result = await apiClientAuthenticated.Notifications.List(-1);
        generalChecks(result);
    });

    it('should list all notifications without error when logged in', async () =>
    {
        let result = await apiClientAuthenticated.Notifications.List(loggedInUserId);
        generalChecks(result);

        expect(result.Data.notifications, "The 'notifications' array should be in the response.").to.not.be.undefined;

        if (result.Data.notifications.length)
        {
            expect(result.Data.notifications[0].engineerId, "An engineer should have a engineerId.").to.not.be.undefined;
            expect(result.Data.notifications[0].engineerId, "An engineerId should be a number.").to.be.a('number');
            
            expect(result.Data.services[0].name, "A service should have a name.").to.not.be.undefined;
            expect(result.Data.services[0].name, "A name should be a string.").to.be.a('string');
            
            expect(result.Data.notifications[0].name, "An engineer should have a name.").to.not.be.undefined;
            expect(result.Data.notifications[0].name, "An name should be a string.").to.be.a('string');
        }
    });
});
