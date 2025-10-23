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

  - a

- Why are WINNING_INDICES and calculateWinner in separate files?

  - a

- What's the benefit of this separation?

  - a

Modern JavaScript Patterns

- The production code uses [...squares] instead of squares.slice(). What's the difference?

  - a

- Find the Array.from() usage. What does it do? Why use it over a manual loop?

  - a

- The calculateWinner function chains find(), some(), and every(). Trace through how it works with a winning board.

  - a

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
