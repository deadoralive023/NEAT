const STRENGTHS = {WEIGHT_SHIFT: 0.3, WEIGHT_RANDOM: 1}
const PROBS = {MUTATE_CONNECTION: 0.4, MUTATE_NODE:  0.4, MUTATE_WEIGHT_SHIFT: 0.4, MUTATE_RANDOM_SHIFT: 0.4, MUTATE_TOGGLE_LINK: 0.4};
class Neat{
    distance(genome1, genome2, c1, c2, c3){
        var disjoint = 0, excess = 0, similar = 0, weight_diff = 0;
        var index1 = 0, index2 = 0;
        if(Math.max.apply(null,Object.keys(genome2.connection_gene)) < Math.max.apply(null,Object.keys(genome1.connection_gene))){
            var temp_genome = genome1;
            genome1 = genome2;
            genome2 = temp_genome;
        }

        for (var [key, value] of Object.entries(genome1.connection_genes)){
            if(key in genome2.connection_genes)
                weight_diff += Math.abs(value.weight - genome2.connection_genes[key].weight));
            else
                disjoint++;
        }

        var genome1_size = Genome.obj_size(genome1);
        var genome2_size = Genome.obj_size(genome2);
        excess = genome2_size - disjoint - similar;
        var N = Math.max.apply(genome1_size, genome2_size);
        if(N < 20) N = 1;
        return c1 * disjoint / N + c2 * excess / N + c3 * weight_diff;
    }
}
