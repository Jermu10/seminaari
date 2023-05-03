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

Sovellus ja varsinkin sen kommentit luotu tekoälyä käyttäen: https://chat.openai.com

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

  Tässä käytin eniten tekoälyn apua, koska itselle moni asia oli uutta. Koodissakäytetään algorytmejä kuten: 

- filter = creates a new array with all elements that pass a test defined by a function
- map = creates a new array by performing a function on each element of the original array
- sort = sorts the elements of an array in place and returns the sorted array

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


        // Function to check if a given word can be formed from a set of letters
          const canFormWord = (letters, word) => {
            const letterCount = countLetters(letters.toLowerCase()); // Get the frequency of letters in the given set
            const wordCount = countLetters(word.toLowerCase()); // Get the frequency of letters in the given word
            // Check if each letter in the word occurs at least as many times as in the set
            for (let [letter, count] of wordCount) {
              if (!letterCount.has(letter) || letterCount.get(letter) < count) {
                return false; // If any letter is missing or has insufficient count, return false
              }
            }
            return true; // If all letters are present in sufficient count, return true
          };
    
### 3 - Generoiva funktio

Tässä ei ilmeisesti olisi tarvinnut edes generoivaa funktiota käyttää, mutta toimi se silti näinkin.

Generator-Function: A generator-function is defined like a normal function, but whenever it needs to generate a value, it does so with the yield keyword rather than return. The yield statement suspends the function’s execution and sends a value back to the caller, but retains enough state to enable the function to resume where it is left off. When resumed, the function continues execution immediately after the last yield run. Lähde: https://www.geeksforgeeks.org/javascript-generator/



     // Define a generator function for generating random vowels
    function* randomVowelGenerator() {
      const vowels = 'aeiouyäö';
      while (true) {
        // Yield a random vowel from the 'vowels' string
        yield vowels[Math.floor(Math.random() * vowels.length)];
      }
    }
    
      // Define a function for handling the 'Vowel' button click
      const handleVowelClick = () => {
        // Create a new instance of the vowel generator
        const vowelGenerator = randomVowelGenerator();
        // Add the next generated vowel to the 'letters' array using the 'setLetters' function
        setLetters([...letters, vowelGenerator.next().value]);
      };
 


## Yhteenveto

Itse sovellukseen olen tyytyväinen. Se about on mitä halusinkin. Sovelluksen tekeminen ja varsinkin alussa ajateltu eri algorytmien vertailu ei toteutunut, mitä olisin toivonut. Mutta paljon uutta opittin ja tehtiin, mitä ei ennen tämän sovelluksen tekoa en ollut kuullukkaan esim. function*. Vähemmän on tullut nodella ja Reactilla mitään tehtyä, joten niissäkin tuli hyvää lisätuntumaa. 

  
  
  
