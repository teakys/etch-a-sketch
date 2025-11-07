const containerGrid = document.querySelector('#container-grid');
const btn = document.querySelector('#btn');
const rgbBtn = document.querySelector('#rgb');
const opacityBtn = document.querySelector('#opacity');
const deleteBtn = document.querySelector('#delete');
const eraseBtn = document.querySelector('#erase');
const size = document.querySelector('#size');
const color = document.querySelector('#color');
const shadowAll = document.querySelector('.grid div');

size.addEventListener('change', () => {
  const dimension = document.querySelector('#dimension');
  const text = size.value;
  dimension.textContent = `${text}x${text}`;
});

let deleteToggled = false;
let eraseToggled = false;
let opacityToggled = false;
let rgbToggled = false;
let mouseDown = false;

document.body.addEventListener("mousedown", e => mouseDown = true);
document.body.addEventListener("mouseup", e => mouseDown = false);


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
});

eraseBtn?.addEventListener('click', () => {
  eraseToggled = !eraseToggled;
  if (eraseToggled) {
    eraseBtn.classList.add('toggled'); 
  } else {
    eraseBtn.classList.remove('toggled'); 
  }
});

opacityBtn?.addEventListener('click', () => {
  opacityToggled = !opacityToggled;
  if (opacityToggled) {
    opacityBtn.classList.add('toggled'); 
  } else {
    opacityBtn.classList.remove('toggled'); 
  }
});

deleteBtn?.addEventListener('click', () => {
  deleteToggled = !deleteToggled;
  if (deleteToggled) {
    deleteBtn.classList.add('toggled'); 
  } else {
    deleteBtn.classList.remove('toggled'); 
  }
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
      newDiv.addEventListener('mouseover', (e) => {
        if(e.type == "mousedown" || (e.type == "mouseover" && mouseDown)){
          const red = Math.floor(Math.random() * 256);
          const green = Math.floor(Math.random() * 256);
          const blue = Math.floor(Math.random() * 256);
          let currentOpacity = parseFloat(newDiv.style.opacity) || 0;
          currentOpacity = Math.min(1, currentOpacity + 0.1);
          if (eraseToggled) {
            newDiv.style.backgroundColor = 'white';
            newDiv.style.opacity = '0';
          } else {
            if (rgbToggled) {
              newDiv.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
            } else {
              newDiv.style.backgroundColor = color.value;
            }
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
          } else {
            const everything = document.querySelectorAll('.grid div');
            everything.forEach((element) => {
              element.classList.remove('shadowed');
            });
          }
        }
      });
      row.appendChild(newDiv);
    }
  }
  containerGrid?.appendChild(grid);
}

newGrid();
