'use strict';

describe('error page', function () {

    browser.get('/badurl');

    it('should have a 404 error', function () {
        expect(element(By.id('content_subtitle')).getText()).toEqual('404');
    });

});
