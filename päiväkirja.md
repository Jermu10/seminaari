# Päiväkirja letters sovellus

## Ajatus

Alkuperäinen ajatus on tehdä Reactilla sovellus johon syötetään 9 kirjainta ja se kertoo suomen sanakirjasta pisimmät sanat. Ohjelma myös logittaa kauan tämä haku kestää.
Ideana olisi ehkä kokeilla erilaisia algorytmejä.

## Aloitus

### create-react-app letters

Aluksi tehdään react työpohja, johonka sovellusta lähdetään luomaan. Tässä alkuvaiheessa etsin myös käsiini listan suomen sanoista jotka löytyi Kotimaisten kielten keskukselta: https://kaino.kotus.fi/sanat/nykysuomi/

### Inputin luonti

Alkuun haluan, luoda inputin, josta sovellus saa ne kirjaimet, jolla sanaa etsitään sanalistasta.

          <form onSubmit={handleSubmit}>
        <label>
          Enter 9 letters:
          <input type="text" value={input} onChange={handleChange} />
        </label>
        <button type="submit">Find longest words</button>
      </form>
      
Luodaan usestate inputille

    const [input, setInput] = useState('');
    
Luodaan funktio joka handlaa inputtia

    const handleChange = (e) => {
    setInput(e.target.value);
    };

### Luodaan countLetter jas canFormWord funktiot

Aikaa säästääkseni selitän nyt vain suullisesti. 
  
  
  
  
  
