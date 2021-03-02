
class Bird{
    constructor(pipes){
        this.pipes = pipes;
        this.y = height/2;
        this.x = 100;
        this.gravity = 0.6;
        this.lift = -15;
        this.velocity = 0;
        this.score = 0;
        this.sensors = [];
        this.over = false
    }

    read_sensors(){
        var sensors = [];
        for(var i = 0; i < this.pipes.length;  i++){
            if(this.pipes[i].x - this.x > 0){
                stroke(5);
                stroke(0,255,0);
                //line(this.x, this.y, pipe.x + pipe.w, this.y);
                line(this.x, this.y,  this.pipes[i].x + (this.pipes[i].w/2), this.pipes[i].top);
                line(this.x, this.y,  this.pipes[i].x + (this.pipes[i].w/2), windowHeight - this.pipes[i].bottom);
                sensors[0] = this.pipes[i].x +  this.pipes.w - this.x;
                sensors[1] = this.pipes[i].top
                sensors[2] = windowHeight - this.pipes[i].bottom;
                break;
            }
        }
        return sensors;
    }

    show(){
        fill(255);
        ellipse(this.x, this.y, 32, 32);
        this.update();
        this.read_sensors();
        this.pipes.forEach((pipe, i) => {
            if(pipe.hits(this)){
                this.over = true;
            }
            if(pipe.has_scored(this)) this.score++;
        });
    }

    up(){
        this.velocity += this.lift;
        this.velocity *= 0.5;
    }

    update(){
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
