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
        this.pipes.forEach((pipe, i) => {
            pipe.show();
            if(pipe.hits(this.bird)){
                this.is_game_over = true;
            }
            if(pipe.has_scored(this.bird)) this.score++;

        });
        this.bird.show();

        textSize(32);
        text(this.score, 10, 30);

    }
}
