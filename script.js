const MAX_DIMENSION = 100;
const MIN_DIMENSION = 1;
const DEFAULT_DIMENSION = 4;
const GRID_PIXELS = 800;
const FIRST_ALPHA = 0.9
const ALPHA_INCREMENT = 0.1;

const DRAW_MODE = "DRAW MODE ON";
const ERASE_MODE = "ERASE MODE ON";

// Fills a grid with squares 
function createGrid(dimensions) {
    const grid = document.querySelector('.grid');
    const sizeText = document.querySelector('.size');
    let gaps = dimensions - 1;
    let size = (GRID_PIXELS - gaps)/dimensions;

    // Creating the columns of the grid
    for (let i = 0; i < (dimensions * dimensions); i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('gridSquare');
        gridSquare.style.height = `${size}px`;
        gridSquare.style.width = `${size}px`;
        gridSquare.style.backgroundColor = 'rgba(255, 255, 255, 1)';
        grid.appendChild(gridSquare);
    }

    sizeText.textContent = `CURRENT SIZE: ${dimensions}`;
}

// Adds events for changing square colour on mouse hover
function createHoverEvents() {
    const squares = document.querySelectorAll('.gridSquare');

    // Changes grid square colour on hover
    squares.forEach(square => square.addEventListener('mouseover', draw));
}

// Colours the current square based on current settings
function draw(e) {
    const grid = document.querySelector('.grid');

    // Draw mode
    if (grid.classList.contains('drawable')) {
        // Black/white mode
        if (grid.classList.contains('black')) {
            e.target.style.backgroundColor = 'rgba(0, 0, 0, 1)';
        }
        // Gradient mode
        else if (grid.classList.contains('gradient')) {
            e.target.style.backgroundColor = increaseGradient(e);
        }
        // Rainbow mode
        else {
            e.target.style.backgroundColor = getRandomColour();
        }
    }
    // Erase mode
    else {
        e.target.style.backgroundColor = 'rgba(255, 255, 255, 1)'; 
    }
}

// Makes squares progressively darker
function increaseGradient(e) {
    let colour = e.target.style.backgroundColor;
    var alpha = parseFloat(colour.split(',')[3]);

    // Square has an alpha value
    if (!isNaN(alpha)) {
        // Square isn't at the minimum already
        if (alpha > ALPHA_INCREMENT) {
            return `rgba(255, 255, 255, ${alpha - ALPHA_INCREMENT})`; 
        }
        // Square is at the minimum already
        return 'rgba(255, 255, 255, 0)';    
    }
    else {
        if (colour == 'rgb(0, 0, 0)') {
            return 'rgba(255, 255, 255, 0)';        
        }
        console.log(alpha);
        return `rgba(255, 255, 255, ${FIRST_ALPHA})`; 
    }
}

// Returns a random rgb value
function getRandomColour() {
    let red = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);

    return `rgba(${red}, ${green}, ${blue}, 1)`;
}

// Removes all current grid squares
function clearGrid() {
    const squares = document.querySelectorAll('.gridSquare');

    squares.forEach(square => square.remove())
}

function createClickEvents() {
    // Creating the colour mode button
    colourBtn = document.querySelector('#colour');
    colourBtn.addEventListener('click', toggleColourMode);

    // Creating the draw/erase mode button
    drawBtn = document.querySelector('#drawErase');
    drawBtn.addEventListener('click', toggleDrawMode);


    // Creating the wipe board button
    wipeBtn = document.querySelector('#wipe');
    wipeBtn.addEventListener('click', wipeBoard);

    // Creating the choose size button
    resizeBtn = document.querySelector('#resize');
    resizeBtn.addEventListener('click', function(e) {
        let newDimension;
        // Asking the user for a new grid size
        keepGoing = true;
        while (keepGoing) {
            newDimension = prompt(`Enter new grid dimension (BETWEEN ${MIN_DIMENSION} AND ${MAX_DIMENSION})`);
            if (newDimension <= MAX_DIMENSION && newDimension >= MIN_DIMENSION) {
                keepGoing = false;
            }
        }

        clearGrid();
        createGrid(newDimension);
        createHoverEvents();
    })
}

// Enables and disables the ability to draw
function toggleDrawMode() {
    const grid = document.querySelector('.grid');
    const modeText = document.querySelector('.drawMode');

    // Alternating whether drawing occurs or not
    grid.classList.toggle('drawable');

    // Alternating mode text
    if (modeText.textContent == DRAW_MODE) {
        modeText.textContent = ERASE_MODE;
    }
    else {
        modeText.textContent = DRAW_MODE;
    }
}

// Changes the colours used when drawing
function toggleColourMode() {
    const grid = document.querySelector('.grid');
    const colourModeText = document.querySelector('.colourMode');

    // Activates gradient mode
    if (grid.classList.contains('black')) {
        grid.classList.remove('black');
        grid.classList.add('gradient');
        colourModeText.textContent = "COLOUR MODE: GRADIENT";
        console.log(grid.classList);
    }
    // Activates rainbow mode
    else if (grid.classList.contains('gradient')) {
        grid.classList.remove('gradient');
        grid.classList.add('rainbow');
        colourModeText.textContent = "COLOUR MODE: RAINBOW";
        console.log(grid.classList);
    }
    // Activates black/white mode
    else {
        grid.classList.remove('rainbow');
        grid.classList.add('black');
        colourModeText.textContent = "COLOUR MODE: BLACK/WHITE";
        console.log(grid.classList);
    }
}

// Resets the colour of every square
function wipeBoard() {
    const squares = document.querySelectorAll('.gridSquare');

    squares.forEach(square => {
        square.style.backgroundColor = 'rgba(255, 255, 255, 1)';
    })
}

createGrid(DEFAULT_DIMENSION);
createHoverEvents();
createClickEvents();