const title = document.querySelector('#title');
const gridContainer = document.querySelector('#grid-container');
const btn = document.querySelector('#btn');
const whiteBtn = document.querySelector('#white');
const rainbowBtn = document.querySelector('#rainbow');
const black = '#181818';
let gridSize, colorMode = 'white';

changeTitleColor();

btn.addEventListener('click', generateGrid);

whiteBtn.addEventListener('click', (e) => {
    colorMode = 'white';
    whiteBtn.classList.add("selected", "scale");
    rainbowBtn.classList.remove("selected", "scale");
});

rainbowBtn.addEventListener('click', (e) => {
    colorMode = 'rainbow';
    rainbowBtn.classList.add("selected", "scale");
    whiteBtn.classList.remove("selected", "scale");
});


// split title into array and add span with random color to each element
function changeTitleColor() {
    let titleArray = title.innerHTML.split("");
    for (let i = 0; i < titleArray.length; i++) {
        titleArray[i] = `<span style="color: ${generateColor()}">${titleArray[i]}</span>`;
    }
    title.innerHTML = titleArray.join("");
}


function generateColor() {
    return '#' + parseInt(Math.random() * 0xffffff).toString(16);
}


// draw grid according to size specified
function drawGrid(gridSize) {
    // set CSS grid size
    gridContainer.style.cssText = `grid: repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;
    // generate divs with .pixel class
    gridSize = gridSize**2;    
    for (let i = 0; i < gridSize; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        gridContainer.appendChild(pixel);
    }
}


// remove previously generated divs
function removeGrid() {
    const pixels = document.querySelectorAll('.pixel');
    for (let i = 0; i < pixels.length; i++) {
        gridContainer.removeChild(pixels[i]);
    }
}


// Change pixel color on hover
function addDrawEffect() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel) => {

        pixel.addEventListener("mouseover", (e) => {
            if (colorMode == 'rainbow') {
                pixel.style.background = generateColor();
            }
            else if (colorMode == 'white') {
                pixel.style.background = `#fff`;
            }
        });
    });
}


function checkUserInput() {
    const error = document.querySelector('#error');
    const input = +(document.querySelector('#size').value);
    if (!input || input < 1) {
        error.innerHTML = `Please specify a number greater than one!`;
        error.classList.add("fadeIn");
        return false;
    }
    else {
        error.innerHTML = `&nbsp;`;
        error.classList.remove("fadeIn");
        return true;
    }
}


// generate new grid
function generateGrid() {
    if(checkUserInput()) {
        gridContainer.style.cssText = `border: none`;
        removeGrid();
        gridSize = +(document.querySelector('#size').value);
        drawGrid(gridSize);
        // reset div background color
        const pixels = document.querySelectorAll('.pixel');
        pixels.forEach((pixel) => {
            pixel.style.background = black;
        });
        // add effect to the new div
        addDrawEffect();
        }
}