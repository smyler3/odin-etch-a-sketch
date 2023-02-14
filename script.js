const MAX_DIMENSION = 100;
const MIN_DIMENSION = 1;
const DEFAULT_DIMENSION = 4;
const GRID_PIXELS = 800;

const DRAW_MODE = "DRAW MODE ON";
const ERASE_MODE = "ERASE MODE ON";
// Fills a grid with squares 
function createGrid(dimensions) {
    const grid = document.querySelector('.grid');
    let gaps = dimensions - 1;
    let size = (GRID_PIXELS - gaps)/dimensions;

    // Creating the columns of the grid
    for (let i = 0; i < dimensions * dimensions; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('gridSquare');
        gridSquare.style.height = `${size}px`;
        gridSquare.style.width = `${size}px`;
        grid.appendChild(gridSquare);
    }

    currentDimension = dimensions;
}

// Adds events for changing square colour on mouse hover
function createHoverEvents() {
    const grid = document.querySelector('.grid');
    const squares = document.querySelectorAll('.gridSquare');

    squares.forEach(square =>
        square.addEventListener('mouseover', function(e) {
            if (grid.classList.contains('drawable')) {
                //e.target.style.backgroundColor = "black";
                e.target.classList.add('hovered');
            }
            else {
                e.target.classList.remove('hovered');    
            }
        })
    );

    squares.forEach(square =>
        square.addEventListener('mouseout', function(e) {
            if (!grid.classList.contains('drawable')) {
                //e.target.style.backgroundColor = "white";
                e.target.classList.remove('hovered');
            }
        }))
    /*
    squares.forEach(square =>
        square.addEventListener('click', function(e) {
            grid.classList.toggle('drawable');
        }))
    */
}

function clearGrid() {
    const squares = document.querySelectorAll('.gridSquare');

    squares.forEach(square => square.remove())
}

function createClickEvents() {
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
    const text = document.querySelector('h3');

    // Alternating whether drawing occurs or not
    grid.classList.toggle('drawable');

    // Alternating mode text
    if (text.textContent == DRAW_MODE) {
        text.textContent = ERASE_MODE;
    }
    else {
        text.textContent = DRAW_MODE;
    }
}

function wipeBoard() {
    const squares = document.querySelectorAll('.gridSquare');

    squares.forEach(square => {
        square.classList.remove('hovered');
    })
}

currentDimension = DEFAULT_DIMENSION;

createGrid(DEFAULT_DIMENSION);
createHoverEvents();
createClickEvents();