// Import React and useState from the 'react' library
import React, { useState } from 'react';
import './App.css';

// Define a generator function for generating random consonants
function* randomConsonantGenerator() {
  const consonants = 'bcdfghjklmnpqrstvwxyz';
  while (true) {
    // Yield a random consonant from the 'consonants' string
    yield consonants[Math.floor(Math.random() * consonants.length)];
  }
}

// Define a generator function for generating random vowels
function* randomVowelGenerator() {
  const vowels = 'aeiouyäö';
  while (true) {
    // Yield a random vowel from the 'vowels' string
    yield vowels[Math.floor(Math.random() * vowels.length)];
  }
}

// Export a default function component called 'LetterGenerator'
export default function LetterGenerator() {
  // Define a state variable called 'letters' using the 'useState' hook
  const [letters, setLetters] = useState([]);

  // Define a function for handling the 'Consonant' button click
  const handleConsonantClick = () => {
    // Create a new instance of the consonant generator
    const consonantGenerator = randomConsonantGenerator();
    // Add the next generated consonant to the 'letters' array using the 'setLetters' function
    setLetters([...letters, consonantGenerator.next().value]);
  };

  // Define a function for handling the 'Vowel' button click
  const handleVowelClick = () => {
    // Create a new instance of the vowel generator
    const vowelGenerator = randomVowelGenerator();
    // Add the next generated vowel to the 'letters' array using the 'setLetters' function
    setLetters([...letters, vowelGenerator.next().value]);
  };

  
  return (
    <div className="LetterGenerator">
      {/* Define a button for generating a consonant */}
      <button onClick={handleConsonantClick}>Consonant</button>
      {/* Define a button for generating a vowel */}
      <button onClick={handleVowelClick}>Vowel</button>
      {/* Display the letters generated so far */}
      <p>Letters: {letters.join('')}</p>
    </div>
  );
}
