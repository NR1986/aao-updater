// ==UserScript==
// @name         AAO Updater
// @namespace    https://lss.nirolp.de/
// @version      1.0
// @description  F?gt der Navbar einen Button hinzu ?ber diesen man die aktuelle Version der AAO von NiRoLP sehen kann und ggf. dar?ber updaten kann.
// @updateURL    https://aao-update.nirolp.de/script/aao-updater.user.js
// @match        https://www.leitstellenspiel.de/
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';
    var textFileURL = "https://aao-update.nirolp.de/version.txt";
    var button = document.createElement("button");
    button.innerHTML = "Button-Text";
    button.style.marginLeft = "10px";
    button.style.backgroundColor = "#3e8f3e";

    GM_xmlhttpRequest({
        method: "GET",
        url: textFileURL,
        onload: function(response) {button.innerHTML = response.responseText;}
    });

    function openLinkInNewWindow(event) {event.preventDefault();window.open("https://aao-update.nirolp.de", "_blank");}

    function updateButtonText() {button.innerHTML = "Update";}

    function resetButtonText() {
        GM_xmlhttpRequest({
            method: "GET",
            url: textFileURL,
            onload: function(response) {button.innerHTML = response.responseText;}
        });
    }

    button.addEventListener("click", openLinkInNewWindow);
    button.addEventListener("mouseover", updateButtonText);
    button.addEventListener("mouseout", resetButtonText);

    var navbar = document.querySelector(".nav.navbar-nav.navbar-right");
    var listItem = document.createElement("li");
    listItem.appendChild(button);
    navbar.appendChild(listItem);
})();
