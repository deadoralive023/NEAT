
function Bird(){
    this.y = height/2;
    this.x = 100;
    this.gravity = 0.6;
    this.lift = -15;
    this.velocity = 0;

    this.show = function(){
        fill(255);
        ellipse(this.x, this.y, 32, 32);
        this.update();
    }

    this.up = function(){
        this.velocity += this.lift;
        this.velocity *= 0.5;
    }

    this.update = function(){
        this.velocity += this.gravity;
        this.y += this.velocity;
        if(this.y > height){
            this.y = height;
            this.velocity = height;
        }
        if(this.y < 0){
            this.y = 0;
            this.velocity = height;
        }
    }
}
