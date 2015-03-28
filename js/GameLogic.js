function createValueMap() {
    var mapxy = new Array();
    mapxy.push([00, 00, 00, 00, 00, 00, 01, 02, 03, 00, 00, 00, 00, 00, 00]);
    mapxy.push([00, 00, 00, 00, 00, 00, 56, 60, 04, 00, 00, 00, 00, 00, 00]);
    mapxy.push([00, 00, 00, 00, 00, 00, 55, 61, 05, 00, 00, 00, 00, 00, 00]);
    mapxy.push([00, 00, 00, 00, 00, 00, 54, 62, 06, 00, 00, 00, 00, 00, 00]);
    mapxy.push([00, 00, 00, 00, 00, 00, 53, 63, 07, 00, 00, 00, 00, 00, 00]);
    mapxy.push([00, 00, 00, 00, 00, 51, 52, 00, 08, 09, 00, 00, 00, 00, 00]);
    mapxy.push([45, 46, 47, 48, 49, 50, 00, 00, 00, 10, 11, 12, 13, 14, 15]);
    mapxy.push([44, 90, 91, 92, 93, 00, 00, 00, 00, 00, 73, 72, 71, 70, 16]);
    mapxy.push([43, 42, 41, 40, 39, 38, 00, 00, 00, 22, 21, 20, 19, 18, 17]);
    mapxy.push([00, 00, 00, 00, 00, 37, 36, 00, 24, 23, 00, 00, 00, 00, 00]);
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
        for(tileIndex = 60; tileIndex<=64; tileIndex++){
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
        for(tileIndex = 90; tileIndex<=94; tileIndex++){
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
        for(tileIndex = 80; tileIndex<=84; tileIndex++){
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
        for(tileIndex = 70; tileIndex<=74; tileIndex++){
            rout.push(tileIndex);
        }
        return rout;
    })();
    routs.push(redRout);
    routs.push(yellowRout);
    routs.push(blueRout);
    routs.push(greenRout);
}

var playStatus = (function () {
    var s = [];
    for (var k = 0; k < roles.length; k++) {
        var role = {
            self: false,
            name: null,
            color: roles[k],
            index: k,
            allowTakeOff: false,
            continuePlaying: false,
            fly: false,
            overLimit: 0,
            touchBaseCount: 0,
            win: false,
            pawns: []
        };
        for (var j = 0; j < 4; j++) {
            var pawn = {
                previousValue: -1,
                value: -1,
                pos: {
                    left: -1,
                    top: -1,
                    right: -1,
                    bottom: -1
                }
            };
            role.pawns.push(pawn);
        }
        s.push(role);
    }
    return s;
})();


