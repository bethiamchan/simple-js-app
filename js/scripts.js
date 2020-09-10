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
        if (typeof(pokemon) === 'object') {
            pokemonList.push(pokemon);
          }else {
            document.write("Please enter valid Pokemon details as an object.");
          }
    };

    function getAll() {
        return pokemonList
    };

    return {
        add: add,
        getAll: getAll
    };
})();

// This correctly adds a pokemon to the pokemonList array, but it must come before the forEach function to write to doc correctly:
// pokemonRepository.add({name: 'Pikachu'});

// This is not added to the pokemonList array and prints error message to doc since argument is not an object:
// pokemonRepository.add('pikachu');

pokemonRepository.getAll().forEach(function(pokemon) {
    if (pokemon.height > 0.5){
        document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') - Wow, that\'s big!</p>');
    } else {
        document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') </p>');
    }
})