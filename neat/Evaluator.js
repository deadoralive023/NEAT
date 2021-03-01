const DT = 3;
class Evaluator{
    constructor(population){
        this.population = population;
        this.species_list = [];
        this.mapped_species = {};
        this.highest_score = 0;
        this.fittest_netowrk = null;
    }
    evaluate(generation){
        this.species_list.forEach((species, i) => {
            species.reset();
        });
        this.mapped_species = {};
        var new_population_networks = [];
        //Generate species on bases of distance function
        this.population.networks.forEach((network, i) => {
            var found = false;
            this.species_list.forEach((species, i) => {
                 if(Evaluator.distance(network, species.comparator, RATIOS.C1, RATIOS.C2, RATIOS.C3) < DT){
                     species.add_network(network);
                     this.mapped_species[network] = species;
                     found = true;
                     return;
                 }
            });
            if(!found){
                var species = new Species(network);
                this.species_list.push(species);
                this.mapped_species[network] = species;
            }
        });

        //Remove unused species
        this.species_list.forEach((species, i) => {
            if(species.networks.length ==  0) this.species_list.splice(i, 1);
        });

        //Calculate adjusted_fitness of networks
        this.population.networks.forEach((network, i) => {
            var score = this.evaluateFitness(network);
            var adjusted_fitness = ( score / this.mapped_species[network].networks.length);
            network.add_adjusted_fitness_value(adjusted_fitness);
            this.mapped_species[network].add_adjusted_value(adjusted_fitness);
            if(score > this.highest_score){
                this.highest_score = score;
                this.fittest_netowrk = network;
            }
        });

        //put best networks from each species into next generation
        this.species_list.forEach((species, i) => {
             new_population_networks.push(Evaluator.max_adjusted_network(species));
        });

        var total_adjusted_value_population = this.adjusted_value_population();
        var total_adjusted_value_species =  this.adjusted_value_species();
        //breeding
        while(new_population_networks.length < this.population.networks.length){
            var species = this.get_random_species_biased_adjusted_fitness(total_adjusted_value_population);
            var network1 = Evaluator.get_random_network_biased_adjusted_fitness(species, total_adjusted_value_species[species]);
            var network2 = Evaluator.get_random_network_biased_adjusted_fitness(species, total_adjusted_value_species[species]);
            var child = NeuralNetwork.crossover(network1, network2);
            child.mutate();
            new_population_networks.push(child);
        }
        this.population.networks = new_population_networks;
    }

    evaluateFitness(network){
          throw new Error('You have to implement the method doSomething!');
    }

    static distance(network1, network2, c1, c2, c3){
        var disjoint = 0, excess = 0, similar = 0, weight_diff = 0;
        var network1_max_inov = network1.max_innovation_no();
        var network2_max_inov = network2.max_innovation_no();
        var network1_connection_genes_size = NeuralNetwork.obj_size(network1.connection_genes);
        var network2_connection_genes_size = NeuralNetwork.obj_size(network2.connection_genes);
        if(network1_max_inov < network2_max_inov){
            var temp_network = network1;
            network1 = network2;
            network2 = temp_network;
        }
        var index1 = 0, index2 = 0;
        while(index1 < network1_max_inov + 1){
            if(index1 in network1.connection_genes && index2 in network2.connection_genes){
                similar++;
                weight_diff += Math.abs(network1.connection_genes[index1].weight - network2.connection_genes[index2].weight);
            }
            else if(index1 in network1.connection_genes && index2 < network2_max_inov){
                disjoint++;
            }
            else if(index1 in network1.connection_genes && index2 > network2_max_inov){
                excess++;
            }
            else if(index2 in network2.connection_genes){
                disjoint++;
            }
            index1++;
            index2++;
        }
        var N = Math.max(network1_connection_genes_size, network2_connection_genes_size);
        if(N < 20) N = 1;
        var val = c1 * disjoint / N + c2 * excess / N + c3 * weight_diff;
        return val;
    }

    get_random_species_biased_adjusted_fitness(adjusted_value_population){
        var r = Math.random() * adjusted_value_population;
        var weight = 0.0;
        var result;
        this.species_list.forEach((species, i) => {
            weight += species.adjusted_value;
            if(weight >= r){
                result = species;
                return;
            }
        });
        return result;
    }

    get_random_network(){
        return this.population.networks[Math.floor(Math.random() * this.population.networks.length)];
    }

    static get_random_network_biased_adjusted_fitness(species, adjusted_value_speices){
        var r = Math.random() * adjusted_value_speices;
        var weight = 0.0;
        var result;
        species.networks.forEach((network, i) => {
            weight += network.adjusted_fitness_value;
            if(weight >= r){
                result = network;
                return;
            }
        });
        return result;
    }



    adjusted_value_population(){
        var total_adjusted_value = 0;
        this.species_list.forEach((species, i) => {
            total_adjusted_value += species.adjusted_value;
        });
        return total_adjusted_value;
    }

    adjusted_value_species(){
        var networks_adjusted_values = {};
        this.species_list.forEach((species, i) => {
            var total_adjusted_value = 0;
            species.networks.forEach((network, i) => {
                total_adjusted_value += network.adjusted_fitness_value;
            });
            networks_adjusted_values[species] = total_adjusted_value;
        });
        return networks_adjusted_values;
    }

    static max_adjusted_network(species){
        var max_adjusted_fitness_value = species.networks[0].adjusted_fitness_value;
        var network = species.networks[0];
        for(var i = 1; i < species.networks.length; i++){
            if(species.networks[i].adjusted_fitness_value > max_adjusted_fitness_value){
                max_adjusted_fitness_value = species.networks[i].adjusted_fitness_value;
                network = species.networks[i];
            }
        }
        return network;
    }
}
