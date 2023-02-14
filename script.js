const MAX_DIMENSION = 100;
const DEFAULT_DIMENSION = 4;
const GRID_PIXELS = 800;

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
}

// Adds events for changing square colour on mouse hover
function createHoverEvents() {
    const grid = document.querySelector('.grid');
    const squares = document.querySelectorAll('.gridSquare');

    squares.forEach(square =>
        square.addEventListener('mouseover', function(e) {
            //if (grid.classList.contains('drawable')) {
            //e.target.style.backgroundColor = "black";
            e.target.classList.add('hovered');
            //}
        })
    );

    squares.forEach(square =>
        square.addEventListener('mouseout', function(e) {
            //e.target.style.backgroundColor = "white";
            e.target.classList.remove('hovered');
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

btn = document.querySelector('button');
btn.addEventListener('click', function(e) {
    let newDimension;
    // Asking the user for a new grid size
    keepGoing = true;
    while (keepGoing) {
        newDimension = prompt(`Enter new grid dimension (MAX ${MAX_DIMENSION}): `);
        if (newDimension <= MAX_DIMENSION) {
            keepGoing = false;
        }
    }
    clearGrid();
    createGrid(newDimension);
    createHoverEvents();
})

// Enables and disables the ability to draw
function toggleDrawMode() {
    const grid = document.querySelector('.grid');
    grid.classList.toggle('drawable');
    console.log(Math.random());
}

createGrid(DEFAULT_DIMENSION);
createHoverEvents();