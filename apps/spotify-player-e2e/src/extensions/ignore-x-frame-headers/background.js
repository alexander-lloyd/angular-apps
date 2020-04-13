/* eslint-env webextensions */
/* eslint-disable consistent-return,no-var,prefer-arrow-callback,no-magic-numbers */

chrome.webRequest.onHeadersReceived.addListener(
    function handler(details) {
        'use strict';
        var i;
        for (i = 0; i < details.responseHeaders.length; ++i) {
            if (details.responseHeaders[i].name.toLowerCase() === 'x-frame-options') {
                details.responseHeaders.splice(i, 1);
                return {
                    responseHeaders: details.responseHeaders
                };
            }
        }
    },
    {
        urls: ['<all_urls>']
    }, ['blocking', 'responseHeaders']
);
