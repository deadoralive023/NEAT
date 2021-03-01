const NODE_TYPES = {INPUT:1, HIDDEN:2, OUTPUT:3};
class NodeGene{
    constructor(type, id){
        this.type = type;
        this.id = id;
    }

    copy(){
        return new NodeGene(this.type, this.id);
    }
}
