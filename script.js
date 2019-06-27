var canvasLog = {"history":[]};
var historyCount,
    position,
    i;
var count = 0;

var canvas = document.getElementById('can'),
    ctx = canvas.getContext('2d'),
    posStartX = 0,
    posStartY = 0,
    posEndX = 0,
    posEndY = 0,
    lineJoint = "round",
    lineCap = "round";

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", setPosition);
canvas.addEventListener("mouseup",() => {
  setEndPosition;
  saveCanvasJson();
});

canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchstart", setPosition, false);
canvas.addEventListener("touchend",() => {
  setEndPosition;
  saveCanvasJson();
}, false);

// Store Blank
saveCanvasJson();

function draw(e) {
  if ("ontouchstart" in document.documentElement) {}
  else {if (e.buttons !== 1) return;}

  ctx.beginPath(); // begin

  // Switch between drawing or erasing
  // if(document.getElementById('toolSelect').value == "pen") {
  //   ctx.globalCompositeOperation="source-over";
  //   ctx.lineWidth = document.getElementById('penWidth').value;
  //   ctx.lineCap = lineCap;
  //   ctx.strokeStyle = document.getElementById('penColor').value;
  //   ctx.lineJoint = lineJoint;
  // } else {
  //   ctx.globalCompositeOperation="destination-out";
  //   ctx.lineWidth = document.getElementById('penWidth').value;
  // }

  ctx.globalCompositeOperation="source-over";
  ctx.lineWidth = document.getElementById('penWidth').value;
  ctx.lineCap = lineCap;
  ctx.strokeStyle = document.getElementById('penColor').value;
  ctx.lineJoint = lineJoint;

  ctx.moveTo(posStartX, posStartY); // from
  setPosition(e);
  setEndPosition(e);
  ctx.lineTo(posEndX, posEndY); // to

  ctx.stroke(); // draw
}

function setPosition(e) {
  var elementOffsetLeft = canvas.offsetLeft;
  var elementOffsetTop = canvas.offsetTop;

  if ("ontouchstart" in document.documentElement) {
    posStartX = e.touches[0].clientX - elementOffsetLeft;
    posStartY = e.touches[0].clientY - elementOffsetTop;
  }
  else {
    posStartX = e.clientX - elementOffsetLeft;
    posStartY = e.clientY - elementOffsetTop;
  }
  // console.log("Start: X coords: " + posStartX + ", Y coords: " + posStartY);
}

function setEndPosition(e) {
  var elementOffsetLeft = canvas.offsetLeft;
  var elementOffsetTop = canvas.offsetTop;

  if ("ontouchstart" in document.documentElement) {
    posEndX = e.changedTouches[0].clientX - elementOffsetLeft;
    posEndY = e.changedTouches[0].clientY - elementOffsetTop;
  } else {
    posEndX = e.clientX - elementOffsetLeft;
    posEndY = e.clientY - elementOffsetTop;
  }
  // console.log("End: X coords: " + posEndX + ", Y coords: " + posEndY);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  saveCanvasJson();
}

function saveCanvasJson() {
  if (count > 0) {
    removePartialHistory();
  }
  // retrieve the canvas data
  var canvasContents = canvas.toDataURL();
  var data = { image: canvasContents, date: Date.now() };
  var string = JSON.stringify(data);
  // Push data to array
  canvasLog.history.push(string);
  getHistoryCount();
  toggleUndoRedoButtons();
  position = historyCount;
  // console.log("History Count: " + historyCount);
  // console.log("Position: " + position);
  // console.log("Back:" + count);
}

function loadCanvasJson(location) {
  var obj = JSON.parse(location);
  var image = new Image();
  image.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0); // draw the new image to the screen
  }
  image.src = obj.image;
}

function getHistoryCount() {
  historyCount = canvasLog.history.length - 1;
}

function undoCanvas() {
  count++;
  i = historyCount - count;
  loadCanvasJson(canvasLog.history[i]);
  toggleUndoRedoButtons();
  position = historyCount - count;
  // console.log("History Count: " + historyCount);
  // console.log("Position: " + position);
  // console.log("Back:" + count);
}

function redoCanvas() {
  count--;
  i = historyCount - count;
  loadCanvasJson(canvasLog.history[i]);
  toggleUndoRedoButtons();
  position = historyCount - count;
  // console.log("History Count: " + historyCount);
  // console.log("Position: " + position);
  // console.log("Back:" + count);
}

function toggleUndoRedoButtons() {
  if (historyCount === count) {
    document.getElementById('undoButton').setAttribute("style", "opacity: .25;");
  } else {
    document.getElementById('undoButton').setAttribute("style", "opacity: 1;");
  }

  if (count === 0) {
    document.getElementById('redoButton').setAttribute("style", "opacity: .25;");
  } else {
    document.getElementById('redoButton').setAttribute("style", "opacity: 1;");
  }
}

function removePartialHistory() {
  canvasLog.history.splice(position + 1, count);
  getHistoryCount();
  count = 0;
  toggleUndoRedoButtons();
}

function saveCanvasPng() {
  var dataURL = canvas.toDataURL('image/png');
  document.getElementById('downloadImage').href = dataURL;
}

function toggleSizes() {
  document.getElementsByClassName('radius-sizes')[0].classList.toggle('toggle');
}

function updatePenWidthDisplay() {
  var penWidthDisplay = document.getElementById('penWidth').value;
  document.getElementById('penWidthDisplay').setAttribute("style", "width: " + penWidthDisplay + "px; height: " + penWidthDisplay + "px;");
}
