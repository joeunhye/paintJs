const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const save = document.getElementById('jsSave');
const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.fillStyle = 'white';
ctx.fillRect(0,0,canvas.width,canvas.height)
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;
function stopPainting() {
    painting = false;
}
function startPainting(e) {
    painting = true;
}
function onMouseMove(e) {
    const x = e.offsetX;
    const y = e.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}
function onMouseDown(e) {
    painting = true;
}
function onMouseUp(e) {
    stopPainting();
}
function handleColorClick(e) {
    // console.log(e.target.style)
    const bgColor = e.target.style.backgroundColor;
    ctx.strokeStyle = bgColor;
    ctx.fillStyle = bgColor;
}
function handleRangeChange(e) {
    const size = e.target.value;
    ctx.lineWidth = size;
}
function handleModeClick() {
    if(!filling) {
        mode.innerText = 'Paint'
        filling = true;
    }else {
        mode.innerText = 'Fill'
        filling = false;
    }
}
function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0,0,canvas.width,canvas.height)
    }
}
function handleCM(e) {
    //console.log(e);
    e.preventDefault();
}
function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = 'paintJs';
    //console.log(link)
    link.click()
}
if(canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleCM)
}
//console.log(Array.from(colors)) // object로부터 array를 만든다.
Array.from(colors).forEach((color) => {
    color.addEventListener('click', handleColorClick)
})

if(range) {
    range.addEventListener('input', handleRangeChange)
}
if(mode) {
    mode.addEventListener('click', handleModeClick)
}
if(save) {
    save.addEventListener('click', handleSaveClick)
}