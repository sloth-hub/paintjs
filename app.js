const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const clear = document.getElementById("jsClear");

let nowColor = "";

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

// 기본적으로 canvas의 background 색상을 white로 지정
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(evt) {
    const x = evt.offsetX;
    const y = evt.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke(); // 선을 그음
    }
}

function handleColorClick(evt) {
    const color = evt.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    nowColor = color;
}

function handleRangeChange(evt) {
    const size = evt.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling === true) {
        // painting mode
        filling = false;
        mode.innerText = "Fill";
    } else {
        // filling mode
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillStyle = nowColor;
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(evt) {
    evt.preventDefault(); // 우클릭 방지
}

function handleSaveClick() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJs";
    link.click();
}

function handleClearClick() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}


if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
);

if (range) {
    range.addEventListener("input", handleRangeChange)
}

if (mode) {
    mode.addEventListener("click", handleModeClick)
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick)
}

if (clear) {
    clear.addEventListener("click", handleClearClick)
}