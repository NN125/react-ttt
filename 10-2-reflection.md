# Nick Nolden

## 10-2 Reflection

### Pre-work Questions

1. Manual rendering: What happened in your vanilla counter if you forgot to call render() after updating state?

   - If we forgot to call `render()` after updating our state, the UI would not reflect it.

2. Event listeners: In the shared counter example, how many times did you need to call addEventListener? Every render? Just once?

   - In that example, we need to have an `addEventListener` attached for each button. If the state changes, they are essentially removed as the HTML page is reconstructed. In other words, they would need to be called every render or else the button would not work anymore.

3. Unique IDs: Why did you need IDs like counter-1, counter-2, container-1 in vanilla JS?

   - You need to have separate IDs for every thing that impacts that state since the program, and the programmers, need to keep track of each specific element. If we didn't have an ID, it would impact every single element instead of a specific one.

4. String templates: What made writing HTML in template strings difficult compared to writing actual HTML?

   - Writing HTML in strings or template literals removes access to autocomplete, error checking, and syntax highlighting, tools that make coding a heck of a lot easier to do. Without access to those, it becomes a massive pain to maintain.

### Code Analysis

Testing

- Run npm t and look at lib.test.js. What does the test file verify?

  - The test verifies that the calculations for `calculateWinner` actually works for the different ways someone could win. It also tests the null results that would occur if there was either a tie, an empty board, or an incomplete game.

- Why test calculateWinner separately from the React components?

  - `calculateWinner` is a pure JS function that is an export. It doesn't have any React guts in it at all. It makes sense to test it by itself since React could do something that you might be unaware of.

- Pick one test case and explain what board state it's testing

  - One of the test cases in the test file checks to make sure an X victory is prioritized over O if both somehow win. This realistically would never happen, but let's say both have a complete vertical and/or horizontal row. If that were the case, again, X will win no matter what. This shows it's a good idea to account for small, odd edge cases like this when making an app.

File Organization

- How is the code organized differently than the tutorial version?

  - The tutorial has everything in an html file, and I mean everything. The code that makes the game work, the css styles, you name it. This code base has everything separated off into its own file. The game code is in the `App.jsx`, while some aspects of it, like `calculateWinner`, are separated into other js files.

- Why are WINNING_INDICES and calculateWinner in separate files?

  - They're separated because it's easier to maintain and to make the code more modular. In other words, these two are modules.

- What's the benefit of this separation?

  - `WINNING_INDICES` is a static array that stores the winning combos for `X` and `O`. Keeping it separated in its own file allows it to be easily reused without screwing something up. Same goes for `calculateWinner`, but it's a function that calculates the math/logic for whoever's the winner.

Modern JavaScript Patterns

- The production code uses [...squares] instead of squares.slice(). What's the difference?

  - `[...squares]` is a new array using a spread operator that makes a shallow copy of the original `squares` object. [`squares.slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) also makes a shallow copy. The difference between that and a spread operator is that `slice()` gives us more control over what exactly we want in the new array. `const numbers = [1, 2, 3, 4];` Calling `numbers.slice(2, 3)` will give us `[2, 3]`.

- Find the Array.from() usage. What does it do? Why use it over a manual loop?

  - `Array.from()` is used here to essentially draw out the game board and its current state. Every time we click a square, it will be filled with either an `X` or `O` depending on who's turn it is. `Array.from()` is used over a `for` loop as those kinds of loops tend to mutate data, and in turn cause unpredictability. [`Array.from()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) however, creates a shallow copy of the array that can be easily iterated upon.

- The calculateWinner function chains find(), some(), and every(). Trace through how it works with a winning board.

  - `find()` looks for a specific thing in the array. In this case, it's looking for `X`'s and `O`'s. `some()` looks for at least one element that passes a test, while `every()` checks if everything passes a test. `some()` in this case checks if one of the letters meets the victory combo requirements, while `every()` checks if every `X` or `O` is in the winnable combination.

**UX Improvements** Compare the tutorial version to the production version:

- What happens when you try to restart before making any moves?

  - a

- What does the production version do that the tutorial doesn't for tied games?

  - a

- How does the reset button text change based on game state?

  - a

Component Design

- The Square component receives onClick as a prop. Why not use handleClick directly in the Square component?

  - a

- What would break if Square managed its own state with useState?

  - a

**React DevTools Investigation** Open the Components tab and play one move:

- Which component(s) re-rendered?

  - a

- What does the squares state look like after your move?

  - a

- What is the value of the turn state?

  - a

**Execution Tracing** Walk through what happens when you click an empty square in the middle of a game:

- Which function runs first?

  - a

- What state updates occur?

  - a

- Which components re-render?

  - a

- Why does the turn switch automatically?

  - a
