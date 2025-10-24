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

  - The reset button is greyed out, and when you hover over it, you get the 🚫 sign. In addition, clicking it does nothing.

- What does the production version do that the tutorial doesn't for tied games?

  - The production code actually shows in the UI that the game is tied, while the tutorial still lists who is up next, even though you can't do anything but reload.

- How does the reset button text change based on game state?

  - As mentioned earlier, when the game just starts, the button is greyed out. After the first move is made, the button becomes purple, signifying that it is now clickable. After a game is complete, the text changes from "Restart" to "Play Again".

Component Design

- The Square component receives onClick as a prop. Why not use handleClick directly in the Square component?

  - Using `handleClick` directly in the `Square` component means it would need to know the current state of the app along with a whole bunch of other things that it doesn't need to know. Letting `onClick` handle it keeps things simple and reusable.

- What would break if Square managed its own state with useState?

  - A good handful of things would break. One of which will make determining the winner either a lot more complicated or downright impossible. Giving each square its own state could no longer allow the app to have access to the board state.

**React DevTools Investigation** Open the Components tab and play one move:

- Which component(s) re-rendered?

  - The components that re-rendered are the squares, and the app itself.

- What does the squares state look like after your move?

  - The `value` went from `null` to `"X"`

- What is the value of the turn state?

  - The value of the turn state starts with `"X"`, but after that person's move is made, the states changes to `"O"`.

**Execution Tracing** Walk through what happens when you click an empty square in the middle of a game:

- Which function runs first?

  - `onClick={() => handleClick(i)`, which is located in the `Array.from()`, runs first.

- What state updates occur?

  - First, `if (squares[index] || winner) return;` runs, checking if the move is valid. Then, `const newSquares = [...squares]; newSquares[index] = turn;` runs, creating a new array for the squares by making a shallow copy, and determining if its an `X` or `O` by whose turn it is. Lastly, `setSquares(newSquares); setTurn(turn === "X" ? "O" : "X");` runs, changing the state of the squares and switching over to the next player.

- Which components re-render?

  - The app and the squares re-render.

- Why does the turn switch automatically?

  - The turn switches automatically thanks to this line: `setTurn(turn === "X" ? "O" : "X");`. It's a ternary operator that checks whether or not it's `X` or `O`'s turn before setting one of those letters down on the square and letting the next person take their turn.

### Production Code Extension

I decided to add in a move counter that keeps track of the number of moves that have been made in the game. I picked that over highlighting the victorious squares since I think it is a more useful and easier feature to implement. Highlighting the squares is a cool feature, but I only see it being useful for any hard-sighted people using this, somehow.

I started off by pasting in the `New state: const [moveCount, setMoveCount] = useState(0)` line that was listed in the hints. I then typed in `setMoveCount(moveCount + 1);` below the other set lines that are located inside of `handleClick`. This way the count won't go up if you click on a filled box, or if the game is won. I added another `setMoveCount` statement inside of `handleReset` so the count would reset.

This leads me to my first, and only, very minor problem I ran into. Before adding in the UI elements for the `moveCount` I went ahead and threw it into a `console.log` to see if the count is actually going up, and resetting when I clicked the reset button. It was working, but the first count was being displayed as 0, so stupidly I assumed it was because the `useState` was set at 0, so I upped it to 1. When I added it in to the UI, the move count started at 1 when it should be at 0. I realized my mistake and set the `useState` back to 0. I should've copied the `setMoveCount` code for the `console.log`, but hey, lesson learned.

For the UI I started with something simple:

```jsx
<header className="text-xl font-bold text-white">
  {`Moves: ${moveCount}`}
</header>
```

I started off by copying the status message code and slightly tweaking it for the move counter. This didn't meet the requirements for the counter yet, but I wanted to make something simple first before adding in the slightly more fancy wording. After dealing with the minor fiasco I mentioned earlier, I went ahead and added in the more fancy bits:

```jsx
<header className="text-xl font-bold text-white">
  {hasGameStarted
    ? `Moves: ${moveCount} ${moveCount === 1 ? "move" : "moves"}`
    : "No moves yet"}
</header>
```

I will go ahead and give Copilot the most credit for the fancier bit. It pretty much suggested it as I was typing it out so I went with it. It took me a little bit to think of a way to make it work, but then I looked at the other ternary statements inside the app, and I noticed the `hasGameStarted` const. I figured I could use that to display the `No moves yet` string, and then switch to counting the numbers once the first move is made. There's also another ternary statement inside of there to determine plurality. I hadn't even thought to do that before, so I gotta hand it to Copilot for suggesting that.

So yeah, this was relatively painless to implement. I only ran into a very minor issue, mainly from my own little mistake, but it was quickly fixed, and it turned out really nice.

My changes can be seen on this [fork](https://github.com/NN125/react-ttt).
