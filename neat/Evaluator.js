const DT = 5;
class Evaluator{
    constructor(population){
        this.generations = 0;
        this.population = population;
        this.species_list = [];
        this.mapped_species = {};
        this.fitness_genomes = [];
        this.new_population_genomes = [];

    }
    evaluate(){
        if(this.generations != 0){
            //Generate species on bases of distance function
            this.population.genomes.forEach((genome, i) => {
                var found = false;
                this.species_list.forEach((species, i) => {
                     if(Evaluator.distance(species.comparator.genome, genome) < DT){
                         var fitness_genome = new FitnessGenome(genome);
                         species.add_fitness_genome(fitness_genome);
                         this.fitness_genomes.push(fitness_genome);
                         this.mapped_species[fitness_genome] = species;
                         found = true;
                         return;
                     }
                });
                if(!found){
                    var fitness_genome = new FitnessGenome(genome);
                    var species = new Species(fitness_genome);
                    this.species_list.push(species);
                    this.fitness_genomes.push(fitness_genome);
                    this.mapped_species[fitness_genome] = species;
                }
            });

            //Calculate adjusted_fitness of genomes
            this.fitness_genomes.forEach((fitness_genome, i) => {
                 var adjusted_fitness = this.evaluateFitness(fitness_genome.genome) / this.mapped_species[fitness_genome.genome].fitness_genomes.length;
                 fitness_genome.add_adjusted_fitness_value(adjusted_fitness);
                 this.mapped_species[fitness_genome.genome].add_adjusted_value(adjusted_fitness);
            });

            //put best genomes from each species into next generation
            this.species_list.forEach((species, i) => {
                 this.new_population_genomes.push(Evaluator.max_adjusted_fitness_genome(species));
            });

            var total_adjusted_value_population = this.adjusted_value_population();
            var total_adjusted_value_species =  this.adjusted_value_species();
        }

        //breeding
        debugger
        while(this.new_population_genomes.length < this.population.genomes.length){
            if(this.generations > 0){
                var species = Evaluator.get_random_species_biased_adjusted_fitness(total_adjusted_value_population);
                var fitness_genome1 = Evaluator.get_random_genome_biased_adjusted_fitness(species, total_adjusted_value_species[species]);
                var fitness_genome2 = Evaluator.get_random_genome_biased_adjusted_fitness(species, total_adjusted_value_species[species]);
            }
            else{
                var genome1 = this.get_random_genome();
                var genome2 = this.get_random_genome();
                var child = Genome.crossover(genome1, genome2)
            }
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
        debugger
        if(Math.max.apply(genome1.max_innovation_no(), genome2.max_innovation_no())){
            var temp_genome = genome1;
            genome1 = genome2;
            genome2 = temp_genome;
        }

        for (var [key, value] of Object.entries(genome1.connection_genes)){
            if(key in genome2.connection_genes)
                weight_diff += Math.abs(value.weight - genome2.connection_genes[key].weight);
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

    get_random_genome(){
        return this.population.genomes[Math.floor(Math.random() * this.population.genomes.length)];
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
