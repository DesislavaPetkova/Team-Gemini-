var Player = (function(){
	function Player(x, y, img, width, height) {		
		this.position = new Vector2(x,y);
		this.velocity = 2;
		this.width = Number(width);
		this.height = Number(height);
		this.img = img;
		this.movement = {left:false, right:false, up:false, down:false};		//this animation = amination;
		this.status	= {home:true, score:0};	
		this.boundingBox = new Rectangle(Number(x), Number(y), Number(this.width), Number(this.height));
		this.tile =-1;
	}
	
	Player.prototype.update = function () {
		if(this.movement.right){
			this.position.x +=this.velocity;
		} else if (this.movement.left) {
			this.position.x -= this.velocity;
		}
		if(this.movement.up){
			this.position.y -=this.velocity;
		} else if (this.movement.down) {
			this.position.y += this.velocity;
		}
		// this.animation.update();
	};	
	
	// Player.prototype.render = function(upctx){
		// this.animation.draw(upctx);
	// }
	return Player;
}());