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
        if (
            typeof(pokemon) === 'object' &&
            "name" in pokemon &&
            "height" in pokemon &&
            "type" in pokemon
            ) {
            pokemonList.push(pokemon);
        } else {
            console.log('Please enter valid Pokemon details as an object with name, height, and type.');
        }
    }
    function getAll() {
        return pokemonList;
    }
    function addListItem(pokemon) {
        let pokemonButtonList = document.querySelector('.pokemon-list');
        let pokemonListItem = document.createElement('li');
        let pokemonButton = document.createElement('button');
        pokemonButton.innerText = pokemon.name;
        pokemonButton.classList.add('pokemon-button');
        pokemonListItem.appendChild(pokemonButton);
        pokemonButtonList.appendChild(pokemonListItem);
    }
    return {
        add: add,
        getAll: getAll,
        addListItem : addListItem
    };
})();

pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});