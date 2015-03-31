var Player = (function(){
	function Player(x, y, width, img, height,homeIndex) {		
		this.x=x;
		this.y=y;
		this.velocity = 2;
		this.width = Number(width);
		this.height = Number(height);
		this.img = img;
		//this.movement = {left:false, right:false, up:false, down:false};		//this animation = amination;
		this.status	= {home:true, score:0, saved:false};			
		this.tile =-1;	
		this.homeIndex = homeIndex;				
	}	
	return Player;
}());