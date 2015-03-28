var initialPawnPlacement = true;
// var ucanvas = document.getElementById("playboard");
// console.log(ucanvas);
// var uctx = ucanvas.getContext('2d');


var tileWidth = 0;
var allPlayersArr = []
var yellowposes = [2.2, 2.2, 3.3, 2.2, 2.2, 3.2, 3.3, 3.2, 0.5, 6.5];
var redposes = [11.57, 2.2, 12.65, 2.2, 11.57, 3.2, 12.67, 3.2, 8.5, 0.5];
var greenposes = [11.6, 11.6, 12.7, 11.6, 11.6, 12.7, 12.7, 12.7, 14.5, 8.5];
var blueposes = [2.2, 11.65, 3.3, 11.65, 2.2, 12.70, 3.3, 12.7, 6.5, 14.5];

function initPawns(color,yellowposes){
	var pawns = [];
	for(var i = 0; i<8; i++){		
		var pawn = new Player(yellowposes[i]*tileWidth, yellowposes[++i]*tileWidth, color+'player', tileWidth, tileWidth);		
		pawns.push(pawn);
	}	
	return pawns;	
}

function placePawns(){
	canvasWidth = window.innerHeight - 10;
	tileWidth = Math.ceil(canvasWidth / 16);
	if(initialPawnPlacement){
		initialPawnPlacement=!initialPawnPlacement;
		//yellow index ->0, red index ->1, green index ->2, blue index ->3
		var yellowPlayers = initPawns('yellow',yellowposes);
		allPlayersArr.push(yellowPlayers);
		var redPlayers = initPawns('red',redposes);
		allPlayersArr.push(redPlayers);
		var greenposes = initPawns('green',greenposes);
		allPlayersArr.push(greenposes);
		var bluePlayers = initPawns('blue',blueposes);
		allPlayersArr.push(bluePlayers);
		var mapxy = createValueMap();
	} else {
	console.log(mPosX);
	console.log(mPoxY);
	}
	
	// allPlayersArr.forEach(function(colorArray){
		// colorArray.forEach(function (play){
			// upctx.drawImage(document.getElementById(play.img),play.position.x, play.position.y, play.width, play.height);
		// });		
	// });
	
	function update(){
		this.t = tick();
		//this.render(upctx);
		//requestAnimationFrame(update);
	} 
	
	function tick(){
        upctx.clearRect(0, 0, canvas.width, canvas.height);
		allPlayersArr.forEach(function(colorArray){
			colorArray.forEach(function (play){
				play.update();
				upctx.drawImage(document.getElementById(play.img),play.position.x, play.position.y, play.width, play.height);

			});			
		});
	}
	
	function render(upctx){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	
	update();
}


function createValueMap() {
    var mapxy = new Array();
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

var roles = ["red", "yellow", "blue", "green"];
var routs = [];  
initiatepawnRouts();


function initiatepawnRouts() {   
	var redRout = (function () {
		var rout = [];
		for(var tileIndex = 03; tileIndex<=56; tileIndex++){
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
	routs.push(redRout);
    routs.push(yellowRout);
    routs.push(blueRout);
    routs.push(greenRout);
}

// var playStatus = (function () {
    // var s = [];
    // for (var k = 0; k < roles.length; k++) {
        // var role = {
            // self: false,
            // name: null,
            // color: roles[k],
            // index: k,
            // allowTakeOff: false,
            // continuePlaying: false,
            // fly: false,
            // overLimit: 0,
            // touchBaseCount: 0,
            // win: false,
            // pawns: []
        // };
        // for (var j = 0; j < 4; j++) {
            // var pawn = {
                // previousValue: -1,
                // value: -1,
                // pos: {
                    // left: -1,
                    // top: -1,
                    // right: -1,
                    // bottom: -1
                // }
            // };
            // role.pawns.push(pawn);
        // }
        // s.push(role);
// }
    // return s;
// })();

// function aPawnClicked(clickedIndex, selfClick) {
    // var tempvar = clickedIndex;
    // if (selfClick) {
        // var msg = JSON.stringify({ "planeclicked": tempvar });
        // sendJSONMessage(msg);
    // }
    // else {
        // notMe = true;
    // }
    // //////
    // if (playhand.role.pawns[tempvar].value == 56)//clicking on one that has touched base. do nothing
        // return;
    // //if (diceValue == 0) {
        // //document.getElementById("info").innerText = "Please roll dice";
        // //return;
    // //}
    // if (diceValue != 6 && playhand.role.pawns[tempvar].value == -1) {//There is a plane flying, but he choose to click on one in the airport
        // return;
    // }
    // playhand.role.pawns[tempvar].previousValue = playhand.role.pawns[tempvar].value;
    // switch (playhand.role.pawns[tempvar].value) {
        // case -1: if (playhand.role.allowTakeOff) { playhand.role.allowTakeOff = false; playhand.role.pawns[tempvar].value = -5 + playhand.value; } diceValue = 0; break;
        // default:
            // playhand.role.pawns[tempvar].value += diceValue;
            // if (playhand.role.pawns[tempvar].value > 55) {
                // playhand.role.overLimit = diceValue;
            // }
            // if (playhand.role.pawns[tempvar].value < 57 && playhand.role.pawns[tempvar].value > 0) {
                // var tempRoutValue = routs[playhand.role.index][playhand.role.pawns[tempvar].value - 1];
                // //for (var j = 0; j < specialPos[playhand.role.index].length; j++) {
                    // //if (specialPos[playhand.role.index][j] == tempRoutValue) {
                        // //switch (j) {
                            // //case 3: playhand.role.pawns[tempvar].value += 16; playhand.role.fly = true; break;
                            // //case 4: playhand.role.pawns[tempvar].value += 12; playhand.role.fly = true; break;
                           // // default: playhand.role.pawns[tempvar].value += 4; playhand.role.fly = true; break;
                        // //}
                    // //}
                // //}
            // }
            // diceValue = 0; break;
    // }
    // updatePlayBoard();
    // //if (onmobile) {
       // // dicectx.clearRect(0, 0, tileWidth * 2, tileWidth * 2);
    // //}
    // //else
        // dicectx.clearRect(0, 0, tileWidth * 4, tileWidth * 4);
// }

// function updatePlayBoard() {
    // var ifChangeHands = -1;
    // if (playhand.role) {
        // for (var i = 0; i < playhand.role.pawns.length; i++) {
            // if (ifChangeHands < playhand.role.pawns[i].value)
                // ifChangeHands = playhand.role.pawns[i].value;
            // if (playhand.role.pawns[i].value != playhand.role.pawns[i].previousValue) {//a plane needs to be moved
                // var coordinates = moveAPlane(playhand.role.pawns[i], playhand.role.pawns[i].previousValue, playhand.role.pawns[i].value);
                // playhand.role.pawns[i].pos.left = Math.floor(coordinates.co_x) - 1;
                // playhand.role.pawns[i].pos.top = Math.floor(coordinates.co_y) - 1;
                // playhand.role.pawns[i].pos.right = Math.floor(coordinates.co_x + tileWidth) + 1;
                // playhand.role.pawns[i].pos.bottom = Math.floor(coordinates.co_y + tileWidth) + 1;
                // if (playhand.role.pawns[i].previousValue == playhand.role.pawns[i].value) {
                    // handcount++;
                    // changeHands();
                // }
                // break;
            // }
        // }
    // }
    // if (ifChangeHands == -1 && clickOverflow != true) {
        // handcount++;
        // changeHands();
    // }
// }

// function hitAPlane(ind, val) {
    // for (var j = 0; j < 4; j++) {//role index
        // for (var k = 0; k < 4; k++) {//plane index in each role
            // if (j != ind && //Not the same color
                // playStatus[j].pawns[k].value != 0 &&
                // routs[j][playStatus[j].pawns[k].value - 1] == val) { //overlapped
                // playStatus[j].pawns[k].value = -1; //This plane is sent back home, there might be more than 1 plane that get hit at a time
                // playStatus[j].pawns[k].previousValue = -1;
            // }
        // }
    // }
// }
