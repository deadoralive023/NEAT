class FlappyBird extends Neat{
    constructor(){
        super(new Population(3, 1, 10));
        this.score = 0;
        this.pipes = [];
        this.birds = new Array(10).fill(new Bird(this.pipes));
        this.count = 0;
        this.is_game_over = false;
        this.generate_new_population();
    }

    show(){
        if((this.count = this.count + 1) % 100 == 0) {
            this.pipes.push(new Pipe());
            this.count = 0;
            if(this.pipes[0].off_screen()) this.pipes.shift();
        }
        this.pipes.forEach((pipe, i) => {
            pipe.show();
        });
        // stroke(255)
        // textSize(32);
        // text(this.bird.score, 10, 30);
    }

    evaluatePopulationFitness(networks){
        var scores = []
        this.birds.forEach((bird, i) => {
            bird.show();
            bird.read_sensors();
            networks[i].feed_forward(bird.read_sensors());
            if(networks[i].node_genes[3].output > 0.5){
                bird.up();
            }
        });
        return
    }
}
