import './style.css'

const containerGrid = document.querySelector('#container-grid');
const btn = document.querySelector('#btn');

let gridSize = 17;
btn?.addEventListener('click', () => {
  const grid: any = document.querySelector('.grid');
  gridSize = Number(prompt('What size?'));
  containerGrid?.removeChild(grid);
  newGrid();
});

function newGrid() {
  const grid = document.createElement('div');
  grid.classList.add('grid');
  for (let i = 0;i < gridSize;i++) {
    const row = document.createElement('div');
    grid.appendChild(row);
    for (let j = 0;j < gridSize;j++) {
      const newDiv = document.createElement('div');

      newDiv.classList.add('grid-element');
      newDiv.addEventListener('mouseover', () => {
        newDiv.style.backgroundColor = 'black';
      });
      row.appendChild(newDiv);
    }
  }
  containerGrid?.appendChild(grid);
}

newGrid();
