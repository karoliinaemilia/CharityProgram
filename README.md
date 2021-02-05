## Käyttöohjeet

Navigoi terminaalissa kansioon jossa on package.json tiedosto.

Aja terminaalissa komennot 

```npm install```
ja sen jälkeen 
```npm start```.

Ohjelma avautuu osoitteeseen localhost:3000

#### Testit

Ohjelman ollessa käynnissä testit voi ajaa komennolla ```npm run cypress:open```

### Parannusehdotuksia

* Virheviestit jos käyttäjä yrittää kohdentaa enemmän rahaa kuin mahdollista
* Tietojen synkronointi palvelimella
* Kirjautuminen ja käyttäjäroolit, kuka saa kohdentaa varoja.
* Käyttäjä saa päättää paljonko ottaa projektilta rahoja/kumoaa vain viimeisimmän kohdennuksen.
* Käyttäjältä kysytään varmennusta kun käyttäjä haluaa kohdentaa enemmän rahoja kun projekti tarvitsee
