# Battleship

A browser-based Battleship game built with JavaScript as part of [The Odin Project](https://www.theodinproject.com/).

The project focuses on applying object-oriented design principles, modular JavaScript, automated testing, DOM manipulation, and Webpack to build a complete interactive game.

## Features

* 10×10 game boards
* Human vs. computer gameplay
* Ship placement with horizontal and vertical orientations
* Automatic random ship placement
* Turn-based gameplay
* Computer opponent with basic target-seeking AI
* Hit and miss tracking
* Ship sinking detection
* Game-over detection
* Remaining enemy ships revealed when the player loses
* Responsive game board
* Visual feedback for hits, misses, and ships
* Automated tests with Jest

## Technologies

* JavaScript (ES Modules)
* HTML5
* CSS3
* Webpack
* Jest
* Git

## Project Structure

```text
src/
├── Ship.js
├── Gameboard.js
├── Player.js
├── Game.js
├── fleet.js
├── DOM.js
└── index.js

tests/
├── Ship.test.js
├── Gameboard.test.js
├── Player.test.js
├── Game.test.js
├── fleet.test.js
└── DOM.test.js
```

### Main modules

**Ship.js**
Creates ships and handles hits and sinking state.

**Gameboard.js**
Manages the 10×10 board, ship placement, attacks, and sunk ships.

**Player.js**
Represents human and computer players, including ship placement and computer attack behaviour.

**Game.js**
Controls turns, rounds, and win conditions.

**DOM.js**
Handles rendering the game board in the browser.

**fleet.js**
Contains the default fleet configuration.

**index.js**
Connects the game logic with the user interface and browser events.

## Testing

The project uses Jest for automated testing.

Run the test suite with:

```bash
npm test
```

The tests cover the main game logic, including:

* Ship behaviour
* Ship placement
* Attacks
* Gameboard state
* Player behaviour
* Computer AI
* Turn management
* Win conditions
* DOM rendering

## Running the Project

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Webpack will build the project and open it in the browser.

To create a production build:

```bash
npm run build
```

## Computer AI

The computer player uses a simple target-seeking strategy.

When the computer hits a ship, it adds the un-attacked cells directly adjacent to the successful hit to a target queue. It then prioritizes those cells before choosing a new random target.

This allows the computer to follow ships after finding them without requiring a complex AI system.

## What I Learned

This project helped me practice several concepts from JavaScript and The Odin Project, including:

* Factory functions
* Modular JavaScript with ES Modules
* Separation of game logic and DOM logic
* State management
* Array methods such as `map`, `filter`, `some`, `every`, and `forEach`
* Event handling
* DOM manipulation
* Asynchronous behaviour with `setTimeout`
* Automated testing with Jest
* Test-driven development
* Webpack configuration
* Responsive CSS
* Git and incremental development

## Future Improvements

Possible future improvements include:

* Restart game functionality
* Improved computer AI
* Ship selection and manual placement
* Better animations and visual feedback
* Ship status and sunk-ship counters
* Improved game-over UI
* Deployment

## Credits

Built by Antonio Rodríguez Martínez as part of [The Odin Project](https://www.theodinproject.com/).
