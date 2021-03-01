const NODE_TYPES = {INPUT:1, HIDDEN:2, OUTPUT:3};
const AF = {SIGMOID: 1}
class NodeGene{
    constructor(type, id){
        this.type = type;
        this.id = id;
        this.activation_function = AF.SIGMOID;
        this.output = 0;
    }

    copy(){
        return new NodeGene(this.type, this.id);
    }

    avtivate(val){
        switch (this.activation_function) {
            case AF.SIGMOID:
                NodeGene.sigmoid(val);
                break;
            default:
                break;

        }
    }
    static sigmoid(x){
        return 1 / (1 + Math.exp(-x));
    }
}
