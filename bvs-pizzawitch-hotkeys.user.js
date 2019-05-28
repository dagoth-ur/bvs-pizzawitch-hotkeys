// ==UserScript==
// @name         BvS Pizzawitch Hotkeys
// @namespace    https://github.com/dagoth-ur/
// @source       https://github.com/dagoth-ur/bvs-pizzawitch-hotkeys
// @version      0.1
// @description  Hotkeys for accelerating / braking / using cards.
// @author       Chrobot
// @match        http*://animecubedgaming.com/billy/bvs/pizzawitch.html
// @grant        none
// ==/UserScript==

// 'a' and 'd' are for accelerating and deccelerating
// ArrowLeft and ArrowDown are for switching between cards
// Space is for go

(function() {
    'use strict';

    function dbg(...msg) {
        console.log(...msg);
    }

    function $(selector, context=document) {
        return context.querySelector(selector);
    }

    function $$(selector, context=document) {
        return Array.from(context.querySelectorAll(selector));
    }

    function radioShift(name, delta, defidx=0) { 
        var radios = $$(`input[type=radio][name=${name}]`);
        var len = radios.length;
        var curIdx = radios.findIndex((r) => r.checked);
        if (curIdx === -1)
            curIdx = (defidx + len) % len;
        var newIdx = (curIdx + delta + len) % len;
        radios[newIdx].checked = true;
    }

    const keyHandlers = {
        'd'          : radioShift.bind(null, 'shift', 1),
        'a'          : radioShift.bind(null, 'shift', -1),
        'ArrowLeft'  : radioShift.bind(null, 'card_used', -1), 
        'ArrowRight' : radioShift.bind(null, 'card_used', 1), 
        ' '          : () => $('form[name=drive]').submit(),
    };

    function onKeyDown(evt) {
        if (keyHandlers.hasOwnProperty(evt.key))
            keyHandlers[evt.key]();
    }

    window.addEventListener('keydown', onKeyDown, true);

    Object.assign(window, { radioShift, $ });
})();
