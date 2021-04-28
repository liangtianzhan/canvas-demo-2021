var yyy = document.getElementById("xxx");
var context = yyy.getContext("2d");

autoSetCanvasSize(yyy);

listenToUser(yyy);

var eraserEnabled = false;
eraser.onclick = function () {
  eraserEnabled = true;
  actions.className = "actions x";
};
pen.onclick = function () {
  eraserEnabled = false;
  actions.className = "actions";
};

/**********/

function autoSetCanvasSize(canvas) {
  setCanvasSize();

  window.onresize = function () {
    resize();
  };

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;

    canvas.width = pageWidth;
    canvas.height = pageHeight;
  }
}

function drawCircle(x, y, radius) {
  context.beginPath();
  context.fillStyle = "blue";
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1); //起点
  context.lineWidth = 10;
  context.strokeStyle = "blue";
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}

function listenToUser(canvas) {
  var using = false;
  var lastPoint = {
    x: undefined,
    y: undefined,
  };
  //鼠标按下
  if (document.body.ontouchstart !== undefined) {
    //触屏设备
    canvas.ontouchstart = function (aaa) {
      var x = aaa.touches[0].clientX;
      var y = aaa.touches[0].clientY;
      using = true;
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10);
      } else {
        lastPoint = {
          x: x,
          y: y,
        };
      }
    };
    canvas.ontouchmove = function (aaa) {
      var x = aaa.touches[0].clientX;
      var y = aaa.touches[0].clientY;
      if (!using) {
        return;
      }
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10);
      } else {
        var newPoint = {
          x: x,
          y: y,
        };
        drawCircle(x, y, 5);
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint;
      }
    };
    canvas.ontouchend = function () {
      using = false;
    };
  } else {
    //非触屏设备
    canvas.onmousedown = function (aaa) {
      var x = aaa.clientX;
      var y = aaa.clientY;
      using = true;
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10);
      } else {
        lastPoint = {
          x: x,
          y: y,
        };
      }
    };
    //鼠标移动
    canvas.onmousemove = function (aaa) {
      var x = aaa.clientX;
      var y = aaa.clientY;
      if (!using) {
        return;
      }
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10);
      } else {
        var newPoint = {
          x: x,
          y: y,
        };
        drawCircle(x, y, 5);
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint;
      }
    };
    //松开鼠标
    canvas.onmouseup = function () {
      using = false;
    };
  }
}

/*******/
