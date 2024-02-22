let slider = document.querySelector('#grid-size-slider');
let sizeText = document.querySelector('#size-text');
let canvas = document.querySelector('.canvas');
let resetBtn = document.querySelector('.reset');
let colorModeSelector = document.querySelector('#color-mode-selector');
let darkenModeSelector = document.querySelector('#darken-mode-selector');
let lightenModeSelector = document.querySelector('#lighten-mode-selector');
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

colorModeSelector.addEventListener('change', () => {
    if (!darkenModeSelector.checked && !lightenModeSelector.checked) {
        setColorMode();
    }
});

darkenModeSelector.addEventListener('change', setDarkenMode);
lightenModeSelector.addEventListener('change', setLightenMode);

function shade(color, ratio) {
    let paras = color.replace(/[^\d,]/g, '').split(',');
    let shaded = [];
    paras.forEach(para => {
        shaded.push(Math.round(para * (100 - ratio) / 100));
    });
    let newColor = 'rgb(' + shaded.join(',') + ')';
    return newColor;
}

function setLightenMode() {
    let gridClass = document.querySelectorAll('.grid');
    let grids = [...gridClass];
    if (lightenModeSelector.checked) {
        darkenModeSelector.checked = false;
        grids.forEach(grid => {
            grid.onmouseover = (e) => {
                grid.style.backgroundColor = shade(e.target.style.backgroundColor, -5);
            };
        });
    }
    else {
        setColorMode();
    }
}

function setDarkenMode() {
    let gridClass = document.querySelectorAll('.grid');
    let grids = [...gridClass];
    if (darkenModeSelector.checked) {
        lightenModeSelector.checked = false;
        grids.forEach(grid => {
            grid.onmouseover = (e) => {
                grid.style.backgroundColor = shade(e.target.style.backgroundColor, 17);
            };
        });
    }
    else {
        setColorMode();
    }
}

function setColorMode() {
    let gridClass = document.querySelectorAll('.grid');
    let grids = [...gridClass];
    if (colorModeSelector.checked) {
        grids.forEach(grid => {
            grid.onmouseover = () => {
                grid.style.backgroundColor = randomColor();
            };
        });
    }
    else {
        grids.forEach(grid => {
            grid.onmouseover = () => {
                grid.style.backgroundColor = 'rgb(127,255,212)';
            };
        });
    }
}

function clearCanvas() {
    while (canvas.hasChildNodes()) {
        canvas.removeChild(canvas.firstChild);
    }
}

function setGrid() {
    for (let i = 0; i < currentSize ** 2; i++) {
        let grid = document.createElement('div');
        grid.classList.add('grid');
        canvas.appendChild(grid);
        grid.style.backgroundColor = 'rgb(255,255,255)';
        grid.style.height = `${600 / currentSize}px`;
        grid.style.width = `${600 / currentSize}px`;
        grid.style.flex = `0 0 ${1.0 / currentSize}`;
    }
    setColorMode();
}

function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);   
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

setGrid();