const MAX_DIMENSION = 100;
const MIN_DIMENSION = 1;
const DEFAULT_DIMENSION = 4;
const GRID_PIXELS = 800;

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
        grid.appendChild(gridSquare);
    }

    sizeText.textContent = `CURRENT SIZE: ${dimensions}`;
}

// Adds events for changing square colour on mouse hover
function createHoverEvents() {
    const grid = document.querySelector('.grid');
    const squares = document.querySelectorAll('.gridSquare');

    // Changes grid square colour on hover
    squares.forEach(square =>
        square.addEventListener('mouseover', function(e) {
            // Draw mode
            if (grid.classList.contains('drawable')) {
                // Black/white mode
                if (grid.classList.contains('black')) {
                    e.target.style.backgroundColor = getRandomColour();
                    //e.target.classList.add('hovered');
                }
                // Gradient mode
                else if (grid.classList.contains('gradient')) {
                    e.target.style.backgroundColour = getRandomColour();
                    //e.target.style.backgroundColour = increaseGradient();
                }
                // Rainbow mode
                else {
                    e.target.style.backgroundColour = 'rgba(0, 0, 0, 0.1)';
                }
            }
            // Erase mode
            else {
                e.target.style.backgroundColor = "white";
                //e.target.classList.remove('hovered');    
            }
        })
    );
}

function getRandomColour() {
    let transparency;

    return `rgba(0, 0, 0, ${transparency})`;
}

function getRandomColour() {
    let red = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);

    return `rgb(${red}, ${green}, ${blue})`;
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

function wipeBoard() {
    const squares = document.querySelectorAll('.gridSquare');

    squares.forEach(square => {
        square.style.backgroundColor = 'white';
        //square.classList.remove('hovered');
    })
}

createGrid(DEFAULT_DIMENSION);
createHoverEvents();
createClickEvents();