class Species{
    constructor(network){
        this.comparator = network;
        this.networks = [];
        this.networks.push(network);
        this.adjusted_value = 0;
    }

    add_network(network){
        this.networks.push(network);
    }

    add_adjusted_value(adjusted_value){
        this.adjusted_value += adjusted_value;
    }

    reset(){
        this.comparator = this.networks[Math.floor(Math.random() * this.networks.length)];
        this.networks = [];
        this.networks.push(this.comparator);
        this.adjusted_value = 0;
    }
}
