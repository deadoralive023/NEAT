$("#mutate-connection-btn").click(function(){
    population.genomes[0].mutate_connection();
});

$("#mutate-node-btn").click(function(){
    population.genomes[0].mutate_node();
});
