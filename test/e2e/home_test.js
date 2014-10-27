'use strict';

describe('home page', function () {

    browser.get('/');

    it('should have a title', function () {
        expect(browser.getTitle()).toEqual('Express Application');
    });

});
