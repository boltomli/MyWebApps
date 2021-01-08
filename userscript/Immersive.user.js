// ==UserScript==
// @name         Immersive on every edge
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Enter immersive mode for every web page even it may not be appropriate
// @author       Song Li
// @match        */*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if (!window.location.href.startsWith("read://")) {
        var immersivePath = "read://" + window.location.protocol.replace(":", "_") + window.location.host + "/?url=" + escape(window.location.href);
        const el = document.createElement('textarea');
        el.value = immersivePath;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        const selected =
              document.getSelection().rangeCount > 0
              ? document.getSelection().getRangeAt(0)
              : false;
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        if (selected) {
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(selected);
        }
    }
})();