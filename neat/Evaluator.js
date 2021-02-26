const DT = 5;
class Evaluator{
    constructor(population){
        this.population = population;
        this.species_list = [];
        this.mapped_species = {};
        this.fitness_genomes = [];
        this.new_population_genomes = [];

    }
    evaluate(){

        //Generate species on bases of distance function
        this.population.genomes.forEach((genome, i) => {
            var found = false;
            this.species_list.forEach((species, i) => {
                 if(distance(species.comparator.genome, genome) < DT){
                     var fitness_genome = new Speceis.FitnessGenome(genome);
                     species.add_fitness_genome(fitness_genome);
                     fitness_genomes.push(fitness_genome);
                     this.mapped_species[fitness_genome] = species;
                     found = true;
                     break;
                 }
            });
            if(!found){
                var fitness_genome = new Speceis.FitnessGenome(genome);
                var species = new Species(fitness_genome);
                this.species_list.push(species);
                fitness_genomes.push(fitness_genome);
                this.mapped_species[fitness_genome] = species;
            }
        });

        //Calculate adjusted_fitness of genomes
        this.fitness_genomes.forEach((fitness_genome, i) => {
             var adjusted_fitness = evaluateFitness(fitness_genome.genome) / this.mapped_species[fitness_genome.genome].genomes.length;
             fitness_genomes.add_adjusted_fitness_value(adjusted_fitness);
             mapped_species[fitness_genome.genome].add_adjusted_value(adjusted_fitness);
        });

        //put best genomes from each species into next generation
        this.species_list.forEach((species, i) => {
             new_population_genomes.push(max_adjusted_fitness_genome(species));
        });

        var total_adjusted_value_population = this.adjusted_value_population();
        var total_adjusted_value_species =  this.adjusted_value_species();

        //breeding
        while(this.new_population_genomes.length < this.population.genomes.length){
            var species = get_random_species_biased_adjusted_fitness(total_adjusted_value_population);
            var fitness_genome1 = get_random_genome_biased_adjusted_fitness(species, total_adjusted_value_species[species]);
            var fitness_genome2 = get_random_genome_biased_adjusted_fitness(species, total_adjusted_value_species[species]);
            var child = (fitness_genome1.adjusted_fitness_value > fitness_genome2.adjusted_fitness_value) ?
                        Genome.crossover(fitness_genome1.genome, fitness_genome2.genome) : Genome.crossover(fitness_genome2.genome, fitness_genome1.genome);
            child.mutate();
            this.new_population_genomes.push(child);
        }
    }

    evaluateFitness(genome){
          throw new Error('You have to implement the method doSomething!');
    }

    static distance(genome1, genome2, c1, c2, c3){
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

    static get_random_species_biased_adjusted_fitness(adjusted_value_population){
        var r = Math.random() * adjusted_value_population;
        var weight = 0.0;
        this.species_list.forEach((species, i) => {
            weight += species.adjusted_value;
            if(weight >= r) return species;
        });
    }

    static get_random_genome_biased_adjusted_fitness(species, adjusted_value_speices){
        var r = Math.random() * adjusted_value_speices;
        var weight = 0.0;
        species.fitness_genomes.forEach((fitness_genome, i) => {
            weight += fitness_genome.adjusted_fitness_value;
            if(weight >= r) return fitness_genome;
        });
    }

    adjusted_value_population(){
        var total_adjusted_value = 0;
        this.species_list.forEach((species, i) => {
            total_adjusted_value += species.adjusted_value;
        });
        return total_adjusted_value;
    }

    adjusted_value_species(){
        var genomes_adjusted_values = {};
        this.species_list.forEach((species, i) => {
            var total_adjusted_value = 0;
            species.fitness_genomes.forEach((fitness_genome, i) => {
                total_adjusted_value += fitness_genome.adjusted_value;
            });
            genomes_adjusted_values[species] = total_adjusted_value;
        });
        return genomes_adjusted_values;
    }

    static max_adjusted_fitness_genome(species){
        var max_adjusted_fitness_value = species.fitness_genomes[0].adjusted_fitness_value;
        var genome = species.fitness_genomes[0].genome;
        for(var i = 1; i < species.fitness_genomes.length; i++){
            if(species.fitness_genomes[i].adjusted_fitness_value > max_adjusted_fitness_value){
                max_adjusted_fitness_value = species.fitness_genomes[i].adjusted_fitness_value;
                genome = species.fitness_genomes[i].genome;
            }
        }
        return genome;
    }
}
