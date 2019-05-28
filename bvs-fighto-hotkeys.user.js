// ==UserScript==
// @name         BvS Robo Fighto Hotkeys
// @namespace    https://github.com/dagoth-ur/
// @source       https://github.com/dagoth-ur/bvs-userscripts
// @version      0.1
// @description  The title says it all.
// @author       Chrobot
// @match        http*://animecubedgaming.com/billy/bvs/villagerobofighto.html
// @run-at       document-body
// @grant        none
// ==/UserScript==

// More like Robo Failto, amirite?
// d pushes or buys another try
// b BMC-pushes

(function() {
    'use strict';

    function $(selector, context=document) {
        return context.querySelector(selector);
    }

    function $$(selector, context=document) {
        return Array.from(context.querySelectorAll(selector));
    }
    
    function pushOrRetry() {
        var topform = $('form[name^=toppushfight]');
        if (topform)
            topform.submit();
        var topnew = $('form[name^=topnewfight]');
        if (topnew)
            topnew.submit();
    }

    const keyHandlers = {
        'd'          : pushOrRetry,
        'b'          : () => {
            var bmcbox = $('form[name^=toppushfight] input[name=bmc]');
            if (bmcbox)
                bmcbox.checked = true;
            pushOrRetry();
        },
    };

    function onKeyDown(evt) {
        if (keyHandlers.hasOwnProperty(evt.key))
            keyHandlers[evt.key]();
    }

    window.addEventListener('keydown', onKeyDown, true);
})();
