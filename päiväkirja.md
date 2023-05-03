# Letters sovellus

## Johdatus

Briteissä tunnettu visailu ohjelma countdownin letters round sovellus siis kyseessä. Sovellus:
- Antaa satunnaisen konsonantin tai vokaalin nappia painamalla
- Palauttaa (max 5) pisintä suomenkielen sanaa (xml tiedosto), mitä satunnaisista tekstikentän kirjaimista pystyy muodostaa
- Kertoo konsolissa kauan sanojen haku kesti

Tarkoitus alussa oli tutkia algorytmejä ja kuika niitä voisi tähän sananhakuun liittää. Kuitenkin se osoittautui vaikeaksi. Teemun suosittelema generaatiofunktio oli täyisin uusi asia ja lähdin sitä opettelemaan tuossa satunnais vokaali/konsonantti osassa.

## Teknologiat

Sovellus on tehty reactilla nettisivuksi. Reactissa käytettyjä juttuja: 

- useState = Hook
- DomParser = Create a new DOM parser
- node.textContent = Extract the text content of each element
- function* = Generator function

Sovellus ja varsinkin sen kommentit luotu tekoälyn avulla: https://chat.openai.com



  
  
  
