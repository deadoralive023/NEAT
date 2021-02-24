class ConnectionGene{
    constructor(node_from, node_to, weight, expressed, innovation_no){
        this.node_from = node_from;
        this.node_to = node_to;
        this.weight - weight;
        this.expressed = expressed;
        this.innovation_no = innovation_no;
    }

    contains(node_from, node_to){
        return ((this.node_from.id == node_from.id) && (this.node_to.id == node_to.id) || (this.node_from.id == node_to.id) && (this.node_to.id == node_from.id));
    }

    copy(){
        return new ConnectionGene(this.node_from.copy(), this.node_to.copy(), this.weight, this.expressed, this.innovation_no);
    }


}
