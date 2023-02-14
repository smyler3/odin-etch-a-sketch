const MAX_DIMENSION = 100;
const DEFAULT_DIMENSION = 4;

// Fills a grid with squares 
function createGrid(dimensions) {
    const grid = document.querySelector('.grid');

    // Creating the columns of the grid
    for (let i = 0; i < dimensions; i++) {
        const gridColumn = document.createElement('div');
        gridColumn.classList.add('col');
        // Creating the squares for each column
        for (let j = 0; j < dimensions; j++) {
            const gridSquare = document.createElement('div');
            gridSquare.classList.add('gridSquare');
            gridColumn.appendChild(gridSquare);
        }
        grid.appendChild(gridColumn);
    }
}

// Adds events for changing square colour on mouse hover
function createHoverEvents() {
    const squares = document.querySelectorAll('.gridSquare');

    squares.forEach(square =>
        square.addEventListener('mouseover', function(e) {
            //e.target.style.backgroundColor = "black";
            e.target.classList.add('hovered');
        })
    );

    squares.forEach(square =>
        square.addEventListener('mouseout', function(e) {
            //e.target.style.backgroundColor = "white";
            e.target.classList.remove('hovered');
        }))
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

createGrid(DEFAULT_DIMENSION);
createHoverEvents();