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
