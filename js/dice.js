var diceInfoHolder =[];
var playerIndex = 0;
var clicked = false;

function randomNum() {
    if (!clicked) {
        var num = Math.floor((Math.random() * 6) + 1);
        num = 6;
        var dice = document.getElementById('dice');
        dice.style.backgroundImage = "url(images/" + num + ".jpg)";
        diceInfoHolder = [num, playerIndex];
        if(num!==6){
            if (playerIndex === 3) playerIndex=0;
            else playerIndex+=1;
        }
        clicked = true;
    }
}





