"use strict";

(function (window) {
    function httpGetAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous
        xmlHttp.send(null);
    };

    httpGetAsync("/config", function (data) {
        var environment = (JSON.parse(data));
        window.__env = window.__env || {};
        window.__env.apiUrl = environment.apiUrl;
        window.__env.baseUrl = environment.baseUrl;
        window.__env.endpoints = environment.endpoints;
        window.__env.enableDebug = true;
    });

}(this));