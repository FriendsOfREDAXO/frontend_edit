# Frontend Edit

Vermutlich wird kein Feature für REDAXO so sehr gewünscht, wie Frontend Edit. Ich habe mit diesem AddOn den Startschuss gesetzt und bereits einen großen Teil der Logik als Proof-of-Concept realisiert.

* Es wird bereits eine Toolbar ausgegeben (ähnlich wie bei Wordpress)
* Der erste Button der Toolbar funktioniert bereits (die Slice-Edit-Buttons anzeigen)
* Die Slice Edit Buttons werden schon an richtiger Stelle ausgegeben (siehe Tickets für weitere Hinweise)

Layout und Codebasis sind nicht ausgearbeitet und werden noch überarbeitet und benötigen teilweise ein Refactoring. Ich möchte aber ungerne alles alleine machen und deshalb die ganze Community darum bitten, mitzumachen.

![Screenshot](https://i.imgur.com/FOoUPM0.jpg)
![Screenshot](https://i.imgur.com/BsEHKZQ.jpg)


Hinweise
----------
* Ich habe bereits ein paar Tickets mit Infos geschrieben, bitte lesen!
* Das AddOn ist noch nicht für den Produktiveinsatz nutzbar, da die meisten Funktionen noch fehlen
* Das AddOn ist nur sichtbar wenn man im Backend eingeloggt und Admin ist (Admin-Mode wird im Final-Release entfernt)
* Die Edit Buttons bekommen volle Opacity beim hovern.

ToDo's
------------
# Phase 1:
* Die Edit-Buttons mit dem Backend verlinken (easy)
* Delete Cache Funktion mittels Parameter umsetzen und rex_article_cache::delete($aid, $clang) aufrufen (easy)
* Layout optimieren, Icons hinzufügen
* Code bereinigen und verbessern
* Ggf. komplett auf jQuery verzichten (aktuell wird geprüft, ob jQuery im Frontend zur Verfügung steht, ansonsten nachgeladen. Ich hatte zuerst einen Vanilla-JS Ansatz gestartet, war mir aber vorerst für einen PoC zu aufwändig)

# Phase 2:
* Edit Button öffnet Modal im Frontend mit Slice-Block im Edit-Modus (iFrame Lösung o.Ä. tbd.)
* Weitere Funktionen besprechen und API zur Verfügung stellen, damit Moduloutputs Inline-Editing anbieten können (über Classes)

Wenn wir hier zusammen arbeiten, können wir ein tolles AddOn entwickeln, das der kompletten REDAXO-Gemeinschaft weiterhilft. 
FOR, ihr seid dran!

Installation
------------
Hinweis: dies ist kein Plugin!

* Release herunterladen und entpacken.
* Ordner umbenennen in `frontend_edit`.
* In den Addons-Ordner legen: `/redaxo/src/addons`.

Oder du benutzt das "zip_install" AddOn!

Credits
---------------
* AddOn by @Hirbod
* Hilfe und Support @gharlan
* Codeteilestücke aus: version, bloecks, css_above_the_fold (Danke an die Entwickler)
