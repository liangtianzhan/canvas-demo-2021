var yyy = document.getElementById("xxx");
var context = yyy.getContext("2d");
var brushWidth = 12;

autoSetCanvasSize(yyy);

listenToUser(yyy);

var eraserEnabled = false;
brush.onclick = function () {
  eraserEnabled=false;
  brush.classList.add('active')
  eraser.classList.remove('active')

}
eraser.onclick = function(){
  eraserEnabled=true;
  eraser.classList.add('active')
  brush.classList.remove('active')

}
red.onclick = function(){
  context.strokeStyle = '#b8465f';
  context.fillStyle = '#b8465f';
  red.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  grey.classList.remove('active')
}
green.onclick = function(){
  context.strokeStyle = '#338161';
  context.fillStyle = '#338161';
  red.classList.remove('active')
  green.classList.add('active')
  blue.classList.remove('active')
  grey.classList.remove('active')
}
blue.onclick = function(){
  context.strokeStyle = '#2e4286';
  context.fillStyle = '#2e4286';
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.add('active')
  grey.classList.remove('active')
}
grey.onclick = function(){
  context.strokeStyle = '#2b2b2c';
  context.fillStyle = '#2b2b2c';
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  grey.classList.add('active')
}

sLine.onclick = function(){
  brushWidth = 4
  sLine.classList.add('active')
  mLine.classList.remove('active')
  lLine.classList.remove('active')
}
mLine.onclick = function(){
  brushWidth = 8
  sLine.classList.remove('active')
  mLine.classList.add('active')
  lLine.classList.remove('active')
}
lLine.onclick = function(){
  brushWidth = 12
  sLine.classList.remove('active')
  mLine.classList.remove('active')
  lLine.classList.add('active')
}
clear.onclick = function(){
  context.clearRect(0,0,yyy.width,yyy.height)
}

save.onclick = function(){
 var url = yyy.toDataURL("image/png")
 var a = document.createElement('a')
 document.body.appendChild(a)
 a.href = url
 a.download = '我的画'
 a.target = '_blank'
 a.click()
}
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
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1); //起点
  context.lineWidth = brushWidth;
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
  //特性检测
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
        drawCircle(x, y, brushWidth/2);
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
        drawCircle(x, y, brushWidth/2);
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
