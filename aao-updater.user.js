// ==UserScript==
// @name         AAO Updater
// @namespace    https://lss.nirolp.de/
// @version      1.3
// @description  
// @updateURL    https://aao-update.nirolp.de/script/aao-updater.user.js
// @match        https://www.leitstellenspiel.de/
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    // URL zur externen Textdatei
    var textFileURL = "https://aao-update.nirolp.de/version.txt";
    
    // Der aktuelle Text des Buttons
    var currentButtonText = "";

    // Die Funktion zum Erstellen des Buttons und Laden des Textes
    function createButton() {
        // Den Button erstellen und formatieren
        var button = document.createElement("button");
        button.innerHTML = currentButtonText || "Button-Text";
        button.style.marginLeft = "10px";
        button.style.backgroundColor = "#3e8f3e";

        // Die Textdatei laden
        GM_xmlhttpRequest({
            method: "GET",
            url: textFileURL,
            onload: function(response) {
                var newText = response.responseText.trim();
                // Überprüfen, ob der Text der Textdatei geändert wurde
                if (newText !== currentButtonText) {
                    currentButtonText = newText;
                    button.innerHTML = currentButtonText;
                }
            }
        });

        // Funktion zum Öffnen des Links in einem neuen Fenster
        function openLinkInNewWindow(event) {
            event.preventDefault();
            window.open("https://aao-update.nirolp.de", "_blank");
        }

        // Funktion zum Ändern des Button-Textes bei Mousehover
        function updateButtonText() {
            button.innerHTML = "Update";
        }

        // Funktion zum Zurücksetzen des Button-Textes
        function resetButtonText() {
            button.innerHTML = currentButtonText;
        }

        // Den Button mit der Funktion und dem Link versehen
        button.addEventListener("click", openLinkInNewWindow);
        button.addEventListener("mouseover", updateButtonText);
        button.addEventListener("mouseout", resetButtonText);

        // Den Navbar-Bereich auswählen und den Button einfügen
        var navbar = document.querySelector(".nav.navbar-nav.navbar-right");
        var listItem = document.createElement("li");
        listItem.appendChild(button);
        navbar.appendChild(listItem);
    }
})
