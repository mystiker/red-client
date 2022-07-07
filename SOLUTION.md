# Notizen zu den Lösungsschritten

## Aufgabe 1
- AbstractSearchFacadeService kann nicht injected werden (aus dem Dashboard Modul heraus) - siehe Browser
- Konkrete Implementierung SearchFacadeService wird provided, nicht aber die BaseClass
- switch that and go

## Aufgabe 2
- Code sichten
- Dummy Component Search-Form ausgebaut
- Vorhandene Typen genutzt
- Event rausgegeben
- Event in Dashboard -> Subject<SearchParams>
- Subject<SearchParams> -> search$
- Validatoren hinzugefügt
- Messages hinzugefügt
- Nur valide outputs werden emittet

## Aufgabe 3
- Route im Dashboard erweitert
- Component hinzugefügt
- Tabelle erweitert
- Router-PreFetch eingerichtet
- Daten angezeigt

## ISSUES