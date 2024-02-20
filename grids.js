let slider = document.querySelector('#grid-size-slider');
let sizeText = document.querySelector('#size-text');
let canvas = document.querySelector('.canvas');
let resetBtn = document.querySelector('.reset');

let currentSize = slider.value;
    
slider.onmousemove = (e) => {
    sizeText.textContent = `Canvas Size: ${e.target.value}`;
}

slider.onchange = (e) => {
    currentSize = e.target.value;
    clearCanvas();
    setGrid(currentSize);
}

resetBtn.addEventListener('click', () => {
    clearCanvas();
    setGrid();
});

function clearCanvas() {
    while (canvas.hasChildNodes()) {
        canvas.removeChild(canvas.firstChild);
    }
}

function setGrid() {
    for (let i = 0; i < currentSize ** 2; i++) {
        let grid = document.createElement('div');
        grid.classList.add('grid');
        grid.onmouseover = () => {
            grid.style.backgroundColor = 'aquamarine';
        };
        canvas.appendChild(grid);
        grid.style.backgroundColor = 'white';
        grid.style.height = `${600 / currentSize}px`;
        grid.style.width = `${600 / currentSize}px`;
        grid.style.flex = `0 0 ${1.0 / currentSize}`;
    }
}

setGrid();