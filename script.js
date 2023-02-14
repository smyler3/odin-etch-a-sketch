// Fills a grid with squares 
function createGrid() {
    const GRID_DIMENSIONS = 4;
    const TOTAL_SQUARES = 16;
    const grid = document.querySelector('.grid');

    // Creating the columns of the grid
    for (let i = 0; i < GRID_DIMENSIONS; i++) {
        const gridColumn = document.createElement('div');
        gridColumn.classList.add('col');
        // Creating the squares for each column
        for (let j = 0; j < GRID_DIMENSIONS; j++) {
            const gridSquare = document.createElement('div');
            gridSquare.classList.add('gridSquare');
            gridColumn.appendChild(gridSquare);
        }
        grid.appendChild(gridColumn);
    }
}

createGrid();