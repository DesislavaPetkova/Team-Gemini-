
window.onload = init;
window.onresize = resizeboard;

var maindiv;
var canvas = null, ctx = null, dicecanvas = null, dicectx = null, upcanvas = null, upctx = null;
var mousePosX = 0, mousePosY = 0;
var initialPawnPlacement = true;
var playersTurn=false;
var tileWidth = 0;
var allPlayersArr = []
var yellowposes = [2.2, 2.2, 3.3, 2.2, 2.2, 3.2, 3.3, 3.2, 0.5, 6.5]; 
var redposes = [11.57, 2.2, 12.65, 2.2, 11.57, 3.2, 12.67, 3.2, 8.5, 0.5]; 
var greenposes = [11.6, 11.6, 12.7, 11.6, 11.6, 12.7, 12.7, 12.7, 14.5, 8.5]; 
var blueposes = [2.2, 11.65, 3.3, 11.65, 2.2, 12.70, 3.3, 12.7, 6.5, 14.5];
var arrPoses=[];
arrPoses.push(yellowposes);
arrPoses.push(redposes);
arrPoses.push(greenposes);
arrPoses.push(blueposes);
var oldTileWidth = 0;
var homeTiles = [45,03,17,31];
var playersNames=['GOD', 'Chaos', 'Program Bug', 'Programmer' ];
var roles = ["yellow", "red", "green", "blue"];
var playerHasMoved = false;
var gameOn = true;
var fontsArr = ['Impact', 'Shoguns-Clan', 'Underodd', 'consolas'];

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
}
function init() {
    initPlayGround();
	
}

function initPlayGround() {
    document.getElementById("playGround").style.display = "";
    maindiv = document.getElementById("main");
    canvas = document.getElementById("gameboard");
    ctx = canvas.getContext("2d");

    ctx.font = "20px helvetica";
    ctx.globalAlpha = 1.0;
    canvas.setStyle = function (styleMap) {
        var styleString = new String();
        for (i in styleMap) {
            styleString += i + ':' + styleMap[i] + '; ';
        }
        canvas.setAttribute('style', styleString);
    }
    var canvasStyle;
  //    = {
  //       'background': '#808080',
  //       'border': '1px solid grey',
		// 'z-index':'0'
  //   };
    canvas.setStyle(canvasStyle);

    upcanvas = document.getElementById("playboard");

    upctx = upcanvas.getContext("2d");
    upcanvas.setStyle = function (styleMap) {
        var styleString = new String();
        for (i in styleMap) {
            styleString += i + ':' + styleMap[i] + '; ';
        }
        upcanvas.setAttribute('style', styleString);
    }
    var canvasStyle;
  //    = {
  //       'border': '1px solid grey',		
		// 'z-index':'999'	
  //   };

    upcanvas.setStyle(canvasStyle);
	upcanvas.addEventListener('click', function(e) {
		e = e || window.event;      		
		mousePosX=e.clientX;
		mousePosY = e.clientY;
		placePawns(mousePosX, mousePosY);
    }); 
    dicecanvas = document.getElementById("dice");
    dicectx = dicecanvas.getContext("2d");	
	var mapXY = createValueMap();
    drawTheBoard();  	
}

function drawTheBoard() {	
	refreshBoard();
	placePawns();	
   	//star top left
	drawAirPort(tileWidth * 3.3, tileWidth * 3.3, 6, tileWidth * 2.3, tileWidth *1.3,'#FFCC00','#FDEE00');
	
	drawAirPort(tileWidth * 2.7, tileWidth * 2.8, 10, tileWidth * 0.3, tileWidth *0.3,'white','#FDEE00');
	drawAirPort(tileWidth * 3.8, tileWidth * 2.8, 10, tileWidth * 0.3, tileWidth *0.3,'white','#FDEE00');
	drawAirPort(tileWidth * 2.7, tileWidth * 3.8, 10, tileWidth * 0.3, tileWidth *0.3,'white','#FDEE00');
	drawAirPort(tileWidth * 3.8, tileWidth * 3.8, 10, tileWidth * 0.3, tileWidth *0.3,'white','#FDEE00');
	//star  top right
	drawAirPort(tileWidth * 12.7, tileWidth * 3.3, 6, tileWidth * 2.3, tileWidth *1.3,'#FF0000','#AF002A');
	
	drawAirPort(tileWidth * 12.1, tileWidth * 2.8, 10, tileWidth * 0.3, tileWidth *0.3,'white','#AF002A');
	drawAirPort(tileWidth * 13.2, tileWidth * 2.8, 10, tileWidth * 0.3, tileWidth *0.3,'white','#AF002A');
	drawAirPort(tileWidth * 12.1, tileWidth * 3.8, 10, tileWidth * 0.3, tileWidth *0.3,'white','#AF002A');
	drawAirPort(tileWidth * 13.2, tileWidth * 3.8, 10, tileWidth * 0.3, tileWidth *0.3,'white','#AF002A');
	//star down left
	drawAirPort(tileWidth * 3.3, tileWidth * 12.7, 6, tileWidth * 2.3, tileWidth *1.3,'#9696FF','#21ABCD');
	
	drawAirPort(tileWidth * 2.7, tileWidth * 12.2, 10, tileWidth * 0.3, tileWidth *0.3,'white','#21ABCD');
	drawAirPort(tileWidth * 2.7, tileWidth * 13.2, 10, tileWidth * 0.3, tileWidth *0.3,'white','#21ABCD');
	drawAirPort(tileWidth * 3.8, tileWidth * 12.2, 10, tileWidth * 0.3, tileWidth *0.3,'white','#21ABCD');
	drawAirPort(tileWidth * 3.8, tileWidth * 13.2, 10, tileWidth * 0.3, tileWidth *0.3,'white','#21ABCD');
	//star dowm right
	drawAirPort(tileWidth * 12.7, tileWidth * 12.7, 6, tileWidth * 2.3, tileWidth *1.3,'#33B433','#008000');
	
	drawAirPort(tileWidth * 12.1, tileWidth * 12.1, 10, tileWidth * 0.3, tileWidth *0.3,'white','#008000');
	drawAirPort(tileWidth * 13.2, tileWidth * 13.2, 10, tileWidth * 0.3, tileWidth *0.3,'white','#008000');
	drawAirPort(tileWidth * 12.1, tileWidth * 13.2, 10, tileWidth * 0.3, tileWidth *0.3,'white','#008000');
	drawAirPort(tileWidth * 13.2, tileWidth * 12.1, 10, tileWidth * 0.3, tileWidth *0.3,'white','#008000');
	
    var boardmap = createMap();
    for (var x = 0; x < 15; x++) {
        for (var y = 0; y < 15; y++) {
            switch (boardmap[y][x]) {
                case 0: break;
                case 1: ctx.putImageData(drawARegularTile("blue", tileWidth), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 2: ctx.putImageData(drawARegularTile("green", tileWidth), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 3: ctx.putImageData(drawARegularTile("red", tileWidth), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 4: ctx.putImageData(drawARegularTile("yellow", tileWidth), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 10: ctx.putImageData(drawArrow("up", tileWidth), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 20: ctx.putImageData(drawArrow("right", tileWidth), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 30: ctx.putImageData(drawArrow("down", tileWidth), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 40: ctx.putImageData(drawArrow("left", tileWidth), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 5: ctx.putImageData(drawTwoColorTile("ry", tileWidth, true), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 6: ctx.putImageData(drawTwoColorTile("yb", tileWidth, true), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 7: ctx.putImageData(drawTwoColorTile("rg", tileWidth, true), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 8: ctx.putImageData(drawTwoColorTile("gb", tileWidth, true), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 9: ctx.putImageData(drawCenterTile(tileWidth), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 50: ctx.putImageData(drawTwoColorTile("ry", tileWidth, false), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 60: ctx.putImageData(drawTwoColorTile("yb", tileWidth, false), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 70: ctx.putImageData(drawTwoColorTile("rg", tileWidth, false), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 80: ctx.putImageData(drawTwoColorTile("gb", tileWidth, false), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 90: ctx.putImageData(drawTwoColorTilewithCircle("ry", tileWidth, true), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 91: ctx.putImageData(drawTwoColorTilewithCircle("yb", tileWidth, true), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 92: ctx.putImageData(drawTwoColorTilewithCircle("rg", tileWidth, true), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 93: ctx.putImageData(drawTwoColorTilewithCircle("gb", tileWidth, true), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                default: break;
            }
        }
    }

}
function createMap() {
    var mapxy = new Array();
    //notile:0, blue:1,green:2,red:3,yello:4;
    mapxy.push([0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0]);
    mapxy.push([0, 0, 0, 0, 0, 0, 3, 30, 3, 0, 0, 0, 0, 0, 0]);
    mapxy.push([0, 0, 0, 0, 0, 0, 3, 30, 3, 0, 0, 0, 0, 0, 0]);
    mapxy.push([0, 0, 0, 0, 0, 0, 3, 30, 3, 0, 0, 0, 0, 0, 0]);
    mapxy.push([0, 0, 0, 0, 0, 0, 3, 30, 3, 0, 0, 0, 0, 0, 0]);
    mapxy.push([0, 0, 0, 0, 0, 90, 3, 30, 3, 92, 0, 0, 0, 0, 0]);
    mapxy.push([4, 4, 4, 4, 4, 4, 5, 30, 7, 2, 2, 2, 2, 2, 2]);
    mapxy.push([4, 20, 20, 20, 20, 20, 20, 0, 40, 40, 40, 40, 40, 40, 2]);
    mapxy.push([4, 4, 4, 4, 4, 4, 6, 10, 8, 2, 2, 2, 2, 2, 2]);
    mapxy.push([0, 0, 0, 0, 0, 91, 1, 10, 1, 93, 0, 0, 0, 0, 0]);
    mapxy.push([0, 0, 0, 0, 0, 0, 1, 10, 1, 0, 0, 0, 0, 0, 0]);
    mapxy.push([0, 0, 0, 0, 0, 0, 1, 10, 1, 0, 0, 0, 0, 0, 0]);
    mapxy.push([0, 0, 0, 0, 0, 0, 1, 10, 1, 0, 0, 0, 0, 0, 0]);
    mapxy.push([0, 0, 0, 0, 0, 0, 1, 10, 1, 0, 0, 0, 0, 0, 0]);
    mapxy.push([0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0]);

    return mapxy;
}

function refreshBoard() {
    canvasWidth = window.innerHeight - 10;
    canvasHeight = window.innerHeight;
    maindiv.style.width = canvasWidth + "px";
    maindiv.style.height = canvasWidth + "px";
    ctx.canvas.width = canvasWidth;
    ctx.canvas.height = canvasWidth;
    upctx.canvas.width = canvasWidth;
    upctx.canvas.height = canvasWidth;
    tileWidth = Math.ceil(canvasWidth / 16);
    dicectx.canvas.width = tileWidth * 4;
    // original row before I change it. //mitko
    // dicectx.canvas.height = tileWidth * 6;  
    dicectx.canvas.height = tileWidth * 4;
    document.getElementById("buttondiv").style.left = tileWidth * 2 + "px";
    document.getElementById("buttondiv").style.top = tileWidth * 7.5 + "px";
}
function resizeboard() {
    refreshBoard();
    drawTheBoard();
}

function drawARegularTile(color, width) {
    var imgData = ctx.createImageData(width, width);
    var pos = 0;
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < width; y++) {
            var x2 = x - Math.ceil(width / 2);
            var y2 = y - Math.ceil(width / 2);
            var distance = Math.ceil(Math.sqrt(x2 * x2 + y2 * y2));
            var circlewall = Math.ceil(width / 2 * 0.8);
            var circleWidth = Math.ceil(width / 20);
            ys = new Array();
            for (var j = 0; j < circleWidth; j++) {
                ys.push(y - Math.ceil(circleWidth / 2 * 0.9) - +circleWidth + j);
            }
            if ((circlewall - circleWidth) < distance && distance < circlewall) {
                setColor("white");
            }
            else {
                setColor(color);
            }
            imgData.data[pos++] = colorR;
            imgData.data[pos++] = colorG;
            imgData.data[pos++] = colorB;
            imgData.data[pos++] = colorA;
        }
    }
    return imgData;
}
function drawTwoColorTile(color, width, keepColorSequence) {
    var imgData = ctx.createImageData(width, width);
    var pos = 0;
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < width; y++) {
            var x2 = x - Math.ceil(width / 2);
            var y2 = y - Math.ceil(width / 2);
            var distance = Math.ceil(Math.sqrt(x2 * x2 + y2 * y2));
            var circlewall = Math.ceil(width / 2 * 0.8);
            var circleWidth = Math.ceil(width / 20);
            ys = new Array();
            for (var j = 0; j < circleWidth; j++) {
                ys.push(y - Math.ceil(circleWidth / 2 * 0.9) - +circleWidth + j);
            }
            if ((circlewall - circleWidth) < distance && distance < circlewall) {
                setColor("white");
            }
            else {
                setColor(color);
            }
            if (x < width - y) {
                switch (color) {
                    case "yb": keepColorSequence ? setColor("yellow") : setColor("blue"); break;
                    case "rg": keepColorSequence ? setColor("red") : setColor("green"); break;
                    default: break;
                }
            }
            else {
                switch (color) {
                    case "yb": keepColorSequence ? setColor("blue") : setColor("yellow"); break;
                    case "rg": keepColorSequence ? setColor("green") : setColor("red"); break;
                    default: break;
                }
            }
            if (x < y) {
                switch (color) {
                    case "ry": keepColorSequence ? setColor("red") : setColor("yellow"); break;
                    case "gb": keepColorSequence ? setColor("green") : setColor("blue"); break;
                    default: break;
                }
            }
            else {
                switch (color) {
                    case "ry": keepColorSequence ? setColor("yellow") : setColor("red"); break;
                    case "gb": keepColorSequence ? setColor("blue") : setColor("green"); break;
                    default: break;
                }
 
            }
            imgData.data[pos++] = colorR;
            imgData.data[pos++] = colorG;
            imgData.data[pos++] = colorB;
            imgData.data[pos++] = colorA;
        }
    }
    return imgData;
}
function drawTwoColorTilewithCircle(color, width, keepColorSequence) {
 
        var imgData = ctx.createImageData(width, width);
        var pos = 0;
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < width; y++) {
                var x2 = x - Math.ceil(width / 2);
                var y2 = y - Math.ceil(width / 2);
                var distance = Math.ceil(Math.sqrt(x2 * x2 + y2 * y2));
                var circlewall = Math.ceil(width / 2 * 0.8);
                var circleWidth = Math.ceil(width / 20);
                ys = new Array();
                for (var j = 0; j < circleWidth; j++) {
                    ys.push(y - Math.ceil(circleWidth / 2 * 0.9) - +circleWidth + j);
                }
                if ((circlewall - circleWidth) < distance && distance < circlewall) {
                    setColor("white");
                }
                else {
                    if (x < width - y) {
                        switch (color) {
                            case "yb": keepColorSequence ? setColor("yellow") : setColor("blue"); break;
                            case "rg": keepColorSequence ? setColor("red") : setColor("green"); break;
                            default: break;
                        }
                    }
                    else {
                        switch (color) {
                            case "yb": keepColorSequence ? setColor("blue") : setColor("yellow"); break;
                            case "rg": keepColorSequence ? setColor("green") : setColor("red"); break;
                            default: break;
                        }
                    }
                    if (x < y) {
                        switch (color) {
                            case "ry": keepColorSequence ? setColor("red") : setColor("yellow"); break;
                            case "gb": keepColorSequence ? setColor("green") : setColor("blue"); break;
                            default: break;
                        }
                    }
                    else {
                        switch (color) {
                            case "ry": keepColorSequence ? setColor("yellow") : setColor("red"); break;
                            case "gb": keepColorSequence ? setColor("blue") : setColor("green"); break;
                            default: break;
                        }
                    }
                }
 
                imgData.data[pos++] = colorR;
                imgData.data[pos++] = colorG;
                imgData.data[pos++] = colorB;
                imgData.data[pos++] = colorA;
            }
        }
        return imgData;
}
function drawCenterTile(width) {
    var imgData = ctx.createImageData(width, width);
    var pos = 0;
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < width; y++) {
            if (x > y - 1 && x < width - y) {
                setColor("yellow");
            }
            else if (x < y && x > width - y - 1) {
                setColor("green");
            }
            else if (x > y - 1 && x < width) {
                setColor("blue");
            }
            else {
                setColor("red");
            }
            imgData.data[pos++] = colorR;
            imgData.data[pos++] = colorG;
            imgData.data[pos++] = colorB;
            imgData.data[pos++] = colorA;
        }
    }
    return imgData;
}
function setColor(color) {
    switch (color) {
        case "blue": colorR = 150, colorG = 150, colorB = 255, colorA = 255; break;
        case "red": colorR = 255, colorG = 0, colorB = 0, colorA = 255; break;
        case "green": colorR = 51, colorG = 180, colorB = 51, colorA = 255; break;
        case "yellow": colorR = 255, colorG = 204, colorB = 0, colorA = 255; break;
        case "white": colorR = 255, colorG = 255, colorB = 255, colorA = 255; break;
        default: colorR = 0, colorG = 0, colorB = 0, colorA = 0; break;
    }
}
function drawArrow(direction, width) {
    switch (direction) {
        case "up": color = "blue"; break;
        case "down": color = "red"; break;
        case "right": color = "yellow"; break;
        case "left": color = "green"; break;
        default: color = "white"; break;
    }
    var imgData = ctx.createImageData(width, width);
    var pos = 0;
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < width; y++) {
            switch (direction) {
                case "right":
                    if (x > y - 1 / 3 * width && x < 4 / 3 * width - y) {
                        setColor(color);
                        if (x > y && x < width - y) {
                            setColor("transparent");
                        }
                    }
                    else {
                        setColor("transparent");
                    }
                    break;
                case "down":
                    if (x < y + 1 / 3 * width && x < 4 / 3 * width - y) {
                        setColor(color);
                        if (x < y && x < width - y) {
                            setColor("transparent");
                        }
                    }
                    else {
                        setColor("transparent");
                    }
                    break;
                case "left":
                    if (x < y + 1 / 3 * width && x > 2 / 3 * width - y) {
                        setColor(color);
                        if (x < y && x > width - y) {
                            setColor("transparent");
                        }
                    }
                    else {
                        setColor("transparent");
                    }
                    break;
                case "up":
                    if (x > y - 1 / 3 * width && x > 2 / 3 * width - y) {
                        setColor(color);
                        if (x > y && x > width - y) {
                            setColor("transparent");
                        }
                    }
                    else {
                        setColor("transparent");
                    }
                    break;
            }
            imgData.data[pos++] = colorR;
            imgData.data[pos++] = colorG;
            imgData.data[pos++] = colorB;
            imgData.data[pos++] = colorA;
        }
    }
    return imgData;
}

function drawAirPort(cx, cy, spikes, outerRadius, innerRadius,innercolor,bordercolor) {
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    ctx.strokeSyle = "#000";
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius)
    for (i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y)
        rot += step

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y)
        rot += step
    }
    ctx.lineTo(cx, cy - outerRadius)
    ctx.closePath();
    ctx.lineWidth=10;
    ctx.strokeStyle=bordercolor;
    ctx.stroke();
    ctx.fillStyle=innercolor;
    ctx.fill();
    
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var homeSpot = 0;
var homeSpotHolder = {
	0:[2.2,2.2],1:[3.3,2.2],2:[2.2,3.2],3:[3.3,3.2],
	4:[11.57, 2.2],5:[12.65, 2.2],6:[11.57, 3.2],7:[12.67, 3.2],
	8:[11.6, 11.6],9:[12.7, 11.6],10:[11.6, 12.7],11:[12.7, 12.7],
	12:[2.2, 11.65],13:[3.3, 11.65],14:[2.2, 12.70],15:[3.3, 12.7]
}

function initPawns(color,poses){
	var pawns = [];		
	for(var i = 0; i<8; i++){		
		var pawn = new Player(poses[i], poses[++i], tileWidth, color+'player', tileWidth, homeSpot);		
		pawns.push(pawn);
		homeSpot++;		
	}	
	return pawns;	
}

function placePawns(posX,posY){	
	tileWidth = Math.ceil((window.innerHeight - 10) / 16);
	//yellow index ->0, red index ->1, green index ->2, blue index ->3
	if(initialPawnPlacement){	
		initialPawnPlacement = false;
		allPlayersArr = [];
		var yellowPlayers = initPawns('yellow',yellowposes);
		allPlayersArr.push(yellowPlayers);
		var redPlayers = initPawns('red',redposes);
		allPlayersArr.push(redPlayers);
		var greenPlayers = initPawns('green',greenposes);
		allPlayersArr.push(greenPlayers);
		var bluePlayers = initPawns('blue',blueposes);
		allPlayersArr.push(bluePlayers);		
	}	
	
	if (posX && posY && playersTurn){
		
		var rect = upcanvas.getBoundingClientRect();		
		posX = posX-rect.left;	
		posY = posY-rect.top;	
		var currPlayer = diceInfoHolder[1];
		var diceValue = diceInfoHolder[0];		
		var playerInQuestion = pawnIsClicked(currPlayer,posX,posY,tileWidth);		
		if(playerInQuestion){	
			playerHasMoved=false;
			if((diceValue === 6) && (playerInQuestion.status.home)){				
					playerInQuestion.x = arrPoses[currPlayer][8];					
					playerInQuestion.y = arrPoses[currPlayer][9];
					playerInQuestion.width = tileWidth;					
					playerInQuestion.tile =	homeTiles[currPlayer];
					playerInQuestion.status.score = 1;
					playerInQuestion.status.home = false;									
					playersTurn = false;					
			} else {		
					if(!playerInQuestion.status.saved && (!playerInQuestion.status.home)){
						var ini = routs[currPlayer].indexOf(playerInQuestion.tile);						
						if((ini+diceValue)<=routs[currPlayer].length){							
							playerInQuestion.status.score += diceValue;
							var nextTile = routs[currPlayer][ini+diceValue];
							checkIfThereIsPlayerOnTile(nextTile,currPlayer);
							var currColmn, currRow, nextColmn, nextRow; 
							var coordOfCT = findCoordinates(playerInQuestion.tile, mapXY);				
							var coordOfNT = findCoordinates(nextTile, mapXY);															
							playerInQuestion.x += (coordOfNT[1]-coordOfCT[1]);
							playerInQuestion.y += (coordOfNT[0]-coordOfCT[0]);
							playerInQuestion.width = tileWidth;							
							playerInQuestion.tile =	nextTile;	
							if(((ini+diceValue)===65) || ((ini+diceValue)===75) || ((ini+diceValue)===85) ||((ini+diceValue)===95)) {
								playerInQuestion.status.saved = true;
							}
							playersTurn = false;
						} else {
							clicked = false;
						}				
					} else {						
						clicked = false;
						document.getElementById('badtext').innerText = '<Impossible Move>';
					}
			}		
		} else 	document.getElementById('badtext').innerText = '<Impossible Move>';	
		clicked = false;	
	 } else	{
		 if (posX && posY) {		 
		 document.getElementById('badtext').innerText = 'Roll the Dice';
		} 		
	 }
	function update(){	
		this.t = tick();
	} 
	
	function tick(){
		upctx.clearRect(0, 0, canvas.width, canvas.height);	
		for(var cArr=0; cArr<4; cArr++){	
			var score = 0;
			allPlayersArr[cArr].forEach(function (play){		
				upctx.drawImage(document.getElementById(play.img),play.x*tileWidth, play.y*tileWidth, tileWidth, tileWidth);
				score += play.status.score;
			});
			document.getElementById(divScore[cArr]).innerText = score+' \/ 248';
		};
	}
	
	function render(upctx){
		upctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	
	update();
}
var divScore = ['gscore', 'b1score', 'b2score', 'pscore'];
function checkIfThereIsPlayerOnTile(nextTile,currPlayer){
		for(var i in allPlayersArr){
			if(i != currPlayer){
				for(var j in allPlayersArr[i]){
					var cPlayer = allPlayersArr[i][j];
					if (cPlayer.tile == nextTile){
						var c = cPlayer.homeIndex.toString();
						cPlayer.x = homeSpotHolder[c][0];
						cPlayer.y = homeSpotHolder[c][1];
					}
				}
			}
		}	
}

var mapXY = createValueMap();
function findCoordinates(tile,mapxy){
	var coordinates = [];
	for(var colmn=0; colmn<=14; colmn++){
		var row = mapxy[colmn].indexOf(tile); 
		if (row !== -1){
			coordinates = [colmn,row];
		}
	}
	return coordinates;
}

function pawnIsClicked(currPlayer, pX, pY,tileWidth){	
	var p;
	allPlayersArr[currPlayer].forEach(function (player) {
		if (pX >= player.x*tileWidth && pX <= player.x*tileWidth + player.width &&
        pY >= player.y*tileWidth && pY <= player.y*tileWidth + player.height){
			p = player;							
		}
	});
	return p;
}

function createValueMap() {
    var mapxy = [];
    mapxy.push([00, 00, 00, 00, 00, 00, 01, 02, 03, 00, 00, 00, 00, 00, 00]);
    mapxy.push([00, 00, 00, 00, 00, 00, 56, 60, 04, 00, 00, 00, 00, 00, 00]);
    mapxy.push([00, 00, 00, 00, 00, 00, 55, 61, 05, 00, 00, 00, 00, 00, 00]);
    mapxy.push([00, 00, 00, 00, 00, 00, 54, 62, 06, 00, 00, 00, 00, 00, 00]);
    mapxy.push([00, 00, 00, 00, 00, 00, 53, 63, 07, 00, 00, 00, 00, 00, 00]);
    mapxy.push([00, 00, 00, 00, 00, 51, 52, 64, 08, 09, 00, 00, 00, 00, 00]);
    mapxy.push([45, 46, 47, 48, 49, 50, 00, 65, 00, 10, 11, 12, 13, 14, 15]);
    mapxy.push([44, 90, 91, 92, 93, 94, 95, 99, 75, 74, 73, 72, 71, 70, 16]);
    mapxy.push([43, 42, 41, 40, 39, 38, 00, 85, 00, 22, 21, 20, 19, 18, 17]);
    mapxy.push([00, 00, 00, 00, 00, 37, 36, 84, 24, 23, 00, 00, 00, 00, 00]);
    mapxy.push([00, 00, 00, 00, 00, 00, 35, 83, 25, 00, 00, 00, 00, 00, 00]);
    mapxy.push([00, 00, 00, 00, 00, 00, 34, 82, 26, 00, 00, 00, 00, 00, 00]);
    mapxy.push([00, 00, 00, 00, 00, 00, 33, 81, 27, 00, 00, 00, 00, 00, 00]);
    mapxy.push([00, 00, 00, 00, 00, 00, 32, 80, 28, 00, 00, 00, 00, 00, 00]);
    mapxy.push([00, 00, 00, 00, 00, 00, 31, 30, 29, 00, 00, 00, 00, 00, 00]);
    return mapxy;
}

var routs = [];  
initiatepawnRouts();

function initiatepawnRouts() {   
	var redRout = (function () {
		var rout = [];
		for(var tileIndex = 03; tileIndex <= 56; tileIndex++) {
			rout.push(tileIndex);
		}
		rout.push(01);
		rout.push(02);
		for(tileIndex = 60; tileIndex<=65; tileIndex++){
			rout.push(tileIndex);
		}
		return rout;
	})();

	var yellowRout = (function () {
		var rout = [];
		for(var tileIndex = 45; tileIndex<=56; tileIndex++){
			rout.push(tileIndex);
		}
		for(tileIndex = 01; tileIndex<=44; tileIndex++){
			rout.push(tileIndex);
		}
		for(tileIndex = 90; tileIndex<=95; tileIndex++){
			rout.push(tileIndex);
		}
		return rout;
	})();

	var blueRout = (function () {
		var rout = [];
		for(var tileIndex = 31; tileIndex<=56; tileIndex++){
			rout.push(tileIndex);
		}
		for(tileIndex = 01; tileIndex<=30; tileIndex++){
			rout.push(tileIndex);
		}
		for(tileIndex = 80; tileIndex<=85; tileIndex++){
			rout.push(tileIndex);
		}
		
		return rout;		
	})();
	console.log(blueRout + 'blue rout');

	var greenRout = (function () {
		var rout = [];
		for(var tileIndex = 17; tileIndex<=56; tileIndex++){
			rout.push(tileIndex);
		}
		for(tileIndex = 01; tileIndex<=16; tileIndex++){
			rout.push(tileIndex);
		}
		for(tileIndex = 70; tileIndex<=75; tileIndex++){
			rout.push(tileIndex);
		}
		return rout;
	})();
	
    routs.push(yellowRout);	
	routs.push(redRout);	
	routs.push(greenRout);
    routs.push(blueRout);  
	
}

////////////////////////////////////////////////////////////////////
var diceInfoHolder =[0,0];
var playerIndex = 0;
var clicked = false;
var canvasClicked = 0;

function randomNum() {	
	for(var sc=0; sc<4; sc++){
		var currScore = document.getElementById(divScore[sc]).innerText;
		if(Number(currScore) >=248) {
			gameOn = false;
			document.getElementById('badtext').innerText = 'Game Over./nThe round won' + playersNames[sc];
		}
	}
	
    if (!clicked && !playerHasMoved && gameOn) {		
        var num = Math.floor((Math.random() * 6) + 1);		
        var dice = document.getElementById('dice');
        dice.style.backgroundImage = "url(images/" + num + ".jpg)";
		diceInfoHolder = [num, playerIndex];
		document.getElementById('badtext').innerText = '';		
		if(num!==6){			
			document.getElementById('player').innerText = playersNames[playerIndex];
			document.getElementById('player').style.color = roles[playerIndex];
			document.getElementById('player').style.fontFamily = fontsArr[playerIndex];
			if (playerIndex==2) document.getElementById('player').style.fontSize = '1em';
			if (playerIndex==3) document.getElementById('player').style.fontSize = '1.3em';
			playerHasMoved = false;
			allPlayersArr[playerIndex].forEach(function (play){
			if(!play.status.home){
				playerHasMoved = true;	
			}					
			});
			if (playerIndex === 3) playerIndex=0;			
			else playerIndex+=1;			
			clicked = false;			
			playersTurn = true;			
			return;
		}		
		document.getElementById('player').innerText = playersNames[playerIndex];
		document.getElementById('player').style.color = roles[playerIndex];	
		document.getElementById('player').style.fontFamily = fontsArr[playerIndex];
		if (playerIndex==2) document.getElementById('player').style.fontSize = '1em';
		if (playerIndex==3) document.getElementById('player').style.fontSize = '1.3em';
		playerHasMoved = true;
		playersTurn = true;		
        clicked = true;		
    }   


		
}


