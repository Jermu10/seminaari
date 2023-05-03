
import React, { useState } from 'react';
import LetterGenerator from './LetterGenerator';
import './App.css';

export default function App() {
  // Declare state variables using the useState hook.
  const [input, setInput] = useState(''); // Represents user input
  const [result, setResult] = useState([]); // Holds the list of longest words

  // Function to handle user input
  const handleChange = (e) => {
    setInput(e.target.value); // Update the input state variable
  };

  // Function to count the frequency of letters in a word
  const countLetters = (word) => {
    const count = new Map(); // Use a Map to store the letter count
    for (let letter of word) {
      // Increment the count for each letter
      count.set(letter, (count.get(letter) || 0) + 1);
    }
    return count;
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

  return (
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
}
