class Pipe{
    constructor(pipe_img, y, height){
        this.top = random(400, 500);
        this.bottom = random(400, 500);
        this.x = width;
        this.w = 50;
        this.speed = 2;
    }

    off_screen(){
        return (this.x < -this.w);
    }

    has_scored(bird){
        return (bird.x == this.x + this.w);
    }

    hits(bird){
        if((bird.y < this.top || bird.y > windowHeight - this.bottom) && (bird.x > this.x && bird.x < this.x + this.w)){
            this.highlight = true;
            return true;
        }
        this.highlight = false;
        return false;
    }

    distance(bird){
        return this.x - bird.x;
    }

    show(){
        fill(255);
        if(this.highlight) fill(255, 0, 0);
        rect(this.x, 0, this.w, this.top);
        rect(this.x, windowHeight - this.bottom, this.w, this.bottom);
        this.update();
    }

    update(){
        this.x -= this.speed;
    }
}
