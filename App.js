import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  //checking if the user has won the game based off if every die is held and the same value
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You won!");
    }
  }, [dice]);
  //another helper function to generate a array of random numbers for the die with a unique id
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  //generates a new array of numbers for the dice
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  //useEffect() to track how many rolls the user has made
  const [numberOfRolls, setNumberOfRolls] = useState(0);

  function rollDice() {
    //adding to the roll count each time the user rolls
    setNumberOfRolls((prevState) => prevState + 1);

    setDice((oldDice) => {
      //checking if the game is won
      if (tenzies) {
        setTenzies(false);
        return allNewDice();
      }

      return oldDice.map((die) => (die.isHeld ? die : generateNewDie()));
    });
  }

  console.log(numberOfRolls);
  //A function to not generate new dice for dice that have the isHeld property set to true
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  //rendering the dice components
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main className="main-container">
      {/* Render Confetti component if `tenzies` is true*/}
      <h1 className="title">{tenzies ? "Congrats You won!" : "Tenzies"}</h1>
      <p className="instructions">
        {tenzies
          ? `congrats you rolled, ${numberOfRolls} times`
          : `Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.`}
      </p>
      <div className="dice-container">{diceElements}</div>
      {tenzies === true && <Confetti />}
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "Restart" : "Roll"}
      </button>
    </main>
  );
}
