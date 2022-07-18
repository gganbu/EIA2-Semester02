EIA2 - Farmsimulator - Marc Siegfried
=======

HTML5, JS 2-D Farm Simulator (Endaufgabe)
- Desktop und Smartphone Kompatibilität
- Mindestens 40 Felder vorhanden 
- Mindestens 5 verschiedene Gemüse-Seeds vorhanden (Corn, Potato, Carrot, Tomato, Mushroom) 
- Zustand der Pflanzen werden grafisch oder in Zahlen angezeigt
- Gemüse wächst und kann geerntet werden (verkauft werden) 
- Geld verdienen (Gemüse verkaufen) 
- Auswahlmöglichkeiten für auszuführende Aktionen (pflanzen, gießen, düngen, ernten, Schädling        bekämpfen)
- Ausgewählte Aktion wird durch Interaktion mit dem Gartenfeld (der Pflanze) ausgelöst
- Pflanzen haben unterschiedliche Wachstumszeiten und Bedarfe bezüglich Wasser und Dünger
- Anzeige von den Marktpreisen für das geerntete Gemüse, für Setzlinge, Dünger, Pestizide etc., sowie das zur Verfügung stehende Kapital für die Pflege des Gartens.
- Produkte wie Seeds, Wasser, Fertilizer oder Pestizide können mit dem verdienten Geld gekauft werden 
- Schädlinge zerstören die Ernte 
- Nutzer kann Startkapital und Preisschwankungen zu Beginn einstellen

- Simulation wurde wie gefordert deutlich beschleunigt, nur Pest nimmt in Realzeit zu.
    + Umkraut entwicklung wurde gestoppt wegen Zeitbeschleunigung, da es ansonsten die Felder blockiert durchs zu schnelle wachsen


Zusatzfunktionen:
- Energieleiste, welche einzelne Tätigkeiten begrenzen soll. Jede Tätigkeit (wie bspw. pflanzen, bewässern, usw…) hat seinen eigenen Arbeitsaufwand und somit einen individuellen Energiekonsum je nach Aufwand der Tätigkeit.
- Wetter, welches Einfluss auf die Ernte, also auf die einzelnen Parameter der Pflanzen hat und auch visuell dargestellt wird.
- Tote Pflanzen durch fehlende oder falsche Pflege, zu starkem Schädlingsfraß, werden in diesem Zustand angezeigt. 


Libraries
---------
Hierbei habe ich zwei Libraries benutzt, um die Funktion des Simulators zu verbessern:
PIXI JS Library (graf.js) und i18next JavaScript Crashcourse / library (hcalc.js) - beide Libraries sind in JS geschrieben, weswegen ich auch hierbei nur mit JS gearbeitet habe.
