# Letters sovellus

## Johdatus

Briteissä tunnettu visailuohjelma countdownin letters round sovellus siis kyseessä. Sovellus:
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

Suomenkielen sanat saatu kotimaisten kielten keskus: https://kaino.kotus.fi/sanat/nykysuomi/

## Sovelluksen luonti

1. Aluksi luotiin react projekti
2. Seuraavaksi luotiin sivu joka ottaa vastaan satunnaisia kirjaimia ja palauttaa pisimmät sanat niistä
3. Sitten luotiin kaksi nappia, joita painamalla sivuille tulee satunnaisia kirjaimia (joko konsonantti tai vokaali)


### 1 - create-react-app 

Eipä siinä oikein sen kummempaa. Projekti luotu ja poistetaan sieltä vähän alkuun ylimääräistä pois ja ruvetaan luomaan App.js tiedostoon ensiksi inputtia ja muuta, minkä lopputulos työn päätyttyä: 

    <div className="App">
      <LetterGenerator/>
      <div style={{ margin: '100px' }}></div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter 9 letters:
          <input type="text" value={input} onChange={handleChange} />
        </label>
        <button type="submit">Find longest words</button>
      </form>
      <p>Longest words:</p>
      <ul>
        {result.map((word, index) => <li key={index}>{word}</li>)}
      </ul>
    </div>
    );
    
### 2 - Luodaan App.js algorytmi ja muut funktiot

  Tässä käytin eniten tekoälyn apua, koska itselle moni asia oli uutta. Tässä suurin osa algorytmistä kommentteineen:
  
    // Function to handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent the form from submitting normally
      const startTime = Date.now(); // Record the start time for performance measurement
      const response = await fetch('/kotus-sanalista_v1.xml'); // Fetch a list of Finnish words
      const xmlText = await response.text(); // Get the XML content as text
      const parser = new DOMParser(); // Create a new DOM parser
      const xml = parser.parseFromString(xmlText, 'text/xml'); // Parse the XML text into an XML document
      const words = Array.from(xml.getElementsByTagName('s')) // Get an array of <s> elements
        .map(node => node.textContent) // Extract the text content of each element
        .filter(word => word.length <= input.length && canFormWord(input, word)) // Filter words that can't be formed from the user input
        .sort((a, b) => b.length - a.length); // Sort words by length in descending order
      const maxLength = words[0]?.length || 0; // Get the length of the longest word, or zero if there are no words
      const longestWords = words.filter(word => word.length === maxLength).slice(0, 5); // Get the five longest words
      setResult(longestWords); // Update the result state variable with the list of longest words
      const endTime = Date.now(); // Record the end time for performance measurement
      console.log(`Found ${longestWords.length} words in ${endTime - startTime} ms`); // Log the result and elapsed time to the console
    };
    
    
    
    
  
 




  
  
  
