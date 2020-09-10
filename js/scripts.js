let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: "Squirtle",
            height: 0.5,
            type: "water"
        },
        {
            name: "Charmander",
            height: 0.6,
            type: "fire"
        },
        {
            name: "Igglybuff",
            height: 0.3,
            type: ["fairy", "normal"]
        }
    ];

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList
    };

    return {
        add: add,
        getAll: getAll
    };
})();

pokemonRepository.getAll().forEach(function(pokemon) {
    if (pokemon.height > 0.5){
        document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') - Wow, that\'s big!</p>');
    } else {
        document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') </p>');
    }
})