class FlappyBird{
    constructor(){
        this.score = 0;
        this.pipes = [];
        this.bird = new Bird();
        this.count = 0;
        this.is_game_over = false;
    }

    show(){
        if((this.count = this.count + 1) % 100 == 0) {
            this.pipes.push(new Pipe());
            this.count = 0;
            if(this.pipes[0].off_screen()) this.pipes.shift();
        }
        var found = false;
        this.pipes.forEach((pipe, i) => {
            pipe.show();
            if(pipe.hits(this.bird)){
                this.is_game_over = true;
            }
            if(pipe.has_scored(this.bird)) this.score++;
        });
        this.bird.show();
        stroke(255)
        textSize(32);
        text(this.score, 10, 30);
        this.read_sensors();
    }

    read_sensors(){
        var sensors = [];
        for(var i = 0; i < this.pipes.length;  i++){
            if(this.pipes[i].x - this.bird.x > 0){
                stroke(5);
                stroke(0,255,0);
                //line(this.bird.x, this.bird.y, pipe.x + pipe.w, this.bird.y);
                line(this.bird.x, this.bird.y,  this.pipes[i].x + (this.pipes[i].w/2), this.pipes[i].top);
                line(this.bird.x, this.bird.y,  this.pipes[i].x + (this.pipes[i].w/2), windowHeight - this.pipes[i].bottom);
                sensors[0] = this.pipes[i].x +  this.pipes.w - this.bird.x;
                sensors[1] = this.pipes[i].top
                sensors[2] = windowHeight - this.pipes[i].bottom;
                break;
            }
        }
        return sensors;
    }
}
