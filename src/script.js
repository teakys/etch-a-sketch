const containerGrid = document.querySelector('#container-grid');
const btn = document.querySelector('#btn');
const rgbBtn = document.querySelector('#rgb');
const opacityBtn = document.querySelector('#opacity');
const deleteBtn = document.querySelector('#delete');
const size = document.querySelector('#size');
const shadowAll = document.querySelector('.grid div');

let deleteToggled = false;
let opacityToggled = false;
let rgbToggled = false;
let gridSize = 16;
btn?.addEventListener('click', () => {
  const grid = document.querySelector('.grid');
  gridSize = Number(size?.value);
  containerGrid?.removeChild(grid);
  newGrid();
});

rgbBtn?.addEventListener('click', () => {
  const grid = document.querySelector('.grid');
  rgbToggled = !rgbToggled;
  if (rgbToggled) {
    rgbBtn.classList.add('toggled'); 
  } else {
    rgbBtn.classList.remove('toggled'); 
  }
  containerGrid?.removeChild(grid);
  newGrid();
});

opacityBtn?.addEventListener('click', () => {
  const grid= document.querySelector('.grid');
  opacityToggled = !opacityToggled;
  if (opacityToggled) {
    opacityBtn.classList.add('toggled'); 
  } else {
    opacityBtn.classList.remove('toggled'); 
  }
  containerGrid?.removeChild(grid);
  newGrid();
});

deleteBtn?.addEventListener('click', () => {
  const grid= document.querySelector('.grid');
  deleteToggled = !deleteToggled;
  if (deleteToggled) {
    deleteBtn.classList.add('toggled'); 
  } else {
    deleteBtn.classList.remove('toggled'); 
  }
  containerGrid?.removeChild(grid);
  newGrid();
});

function newGrid() {
  let gridWidth = 384;
  let cellSize = gridWidth/gridSize;
  const grid = document.createElement('div');
  grid.style.boxShadow = '1em 1em black';
  grid.style.width = '384px';
  grid.classList.add('grid');
  for (let i = 1;i <= gridSize;i++) {
    const row = document.createElement('div');
    grid.appendChild(row);
    for (let j = 1;j <= gridSize;j++) {
      const newDiv = document.createElement('div');

      newDiv.classList.add('grid-element');
      newDiv.style.width = cellSize + 'px';
      newDiv.style.height = cellSize + 'px';
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 256);
      const blue = Math.floor(Math.random() * 256);
      newDiv.addEventListener('mouseover', () => {
        let currentOpacity = parseFloat(newDiv.style.opacity) || 0;
        currentOpacity = Math.min(1, currentOpacity + 0.1);
        if (rgbToggled) {
          newDiv.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
        } else {
          newDiv.style.backgroundColor = 'black';
        }
        if (opacityToggled) {
          newDiv.style.opacity = String(currentOpacity);
        } else {
          newDiv.style.opacity = '1';
        }
        if (deleteToggled) {
          const everything = document.querySelectorAll('.grid div');
          everything.forEach((element) => {
            element.classList.add('shadowed');
          });
          newDiv.style.opacity = '0';
        }
      });
      row.appendChild(newDiv);
    }
  }
  containerGrid?.appendChild(grid);
}

newGrid();
